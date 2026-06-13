#!/usr/bin/env python3
"""
PE disassembler and static analysis helper for Windows executables.
Usage: python3 disassemble_pe.py <path-to.exe> [--max-insns N] [--section NAME]
"""

import argparse
import hashlib
import struct
import sys
from collections import Counter

import pefile
from capstone import Cs, CS_ARCH_X86, CS_MODE_32, CS_MODE_64


def file_hashes(path: str) -> dict:
    data = open(path, "rb").read()
    return {
        "md5": hashlib.md5(data).hexdigest(),
        "sha1": hashlib.sha1(data).hexdigest(),
        "sha256": hashlib.sha256(data).hexdigest(),
        "size": len(data),
    }


def detect_dotnet(pe: pefile.PE) -> bool:
    if hasattr(pe, "DIRECTORY_ENTRY_COM_DESCRIPTOR"):
        return True
    for entry in getattr(pe, "DIRECTORY_ENTRY_IMPORT", []) or []:
        if entry.dll and b"mscoree.dll" in entry.dll.lower():
            return True
    return False


def detect_upx(data: bytes) -> bool:
    return b"UPX!" in data or b"UPX0" in data or b"UPX1" in data


def print_pe_header(pe: pefile.PE, path: str) -> None:
    hashes = file_hashes(path)
    print("=" * 72)
    print("FILE METADATA")
    print("=" * 72)
    print(f"Path     : {path}")
    print(f"Size     : {hashes['size']:,} bytes")
    print(f"MD5      : {hashes['md5']}")
    print(f"SHA1     : {hashes['sha1']}")
    print(f"SHA256   : {hashes['sha256']}")
    print()

    machine = {0x14C: "i386 (32-bit)", 0x8664: "AMD64 (64-bit)"}.get(
        pe.FILE_HEADER.Machine, hex(pe.FILE_HEADER.Machine)
    )
    print("=" * 72)
    print("PE HEADER")
    print("=" * 72)
    print(f"Machine          : {machine}")
    print(f"Timestamp        : {pe.FILE_HEADER.TimeDateStamp}")
    print(f"Sections         : {pe.FILE_HEADER.NumberOfSections}")
    print(f"Entry Point (RVA): 0x{pe.OPTIONAL_HEADER.AddressOfEntryPoint:08X}")
    print(f"Image Base       : 0x{pe.OPTIONAL_HEADER.ImageBase:016X}")
    print(f"Subsystem        : {pe.OPTIONAL_HEADER.Subsystem}")
    print(f".NET assembly   : {detect_dotnet(pe)}")
    print()

    print("SECTIONS")
    print("-" * 72)
    for section in pe.sections:
        name = section.Name.rstrip(b"\x00").decode("ascii", errors="replace")
        chars = []
        if section.Characteristics & 0x20000000:
            chars.append("EXEC")
        if section.Characteristics & 0x40000000:
            chars.append("READ")
        if section.Characteristics & 0x80000000:
            chars.append("WRITE")
        print(
            f"  {name:8} VA=0x{section.VirtualAddress:08X} "
            f"VSz=0x{section.Misc_VirtualSize:08X} "
            f"Raw=0x{section.SizeOfRawData:08X} "
            f"[{','.join(chars)}]"
        )
    print()

    print("IMPORTS")
    print("-" * 72)
    if not hasattr(pe, "DIRECTORY_ENTRY_IMPORT"):
        print("  (none or stripped)")
    else:
        for entry in pe.DIRECTORY_ENTRY_IMPORT:
            dll = entry.dll.decode("utf-8", errors="replace")
            apis = [imp.name.decode() if imp.name else f"ord_{imp.ordinal}" for imp in entry.imports[:12]]
            more = "" if len(entry.imports) <= 12 else f" ... +{len(entry.imports) - 12} more"
            print(f"  {dll}: {', '.join(apis)}{more}")
    print()


def extract_strings(data: bytes, min_len: int = 6) -> list[str]:
    results = []
    current = []
    for b in data:
        if 32 <= b < 127:
            current.append(chr(b))
        else:
            if len(current) >= min_len:
                results.append("".join(current))
            current = []
    if len(current) >= min_len:
        results.append("".join(current))
    return results


def interesting_strings(strings: list[str]) -> list[str]:
    keywords = (
        "http", "https", "salat", "wallet", "chrome", "firefox", "telegram",
        "steam", "discord", "metamask", "exodus", "electrum", "upx", "mscoree",
        "virtual", "sandbox", "debug", "inject", "powershell", "cmd.exe",
        "appdata", "temp", "registry", "crypt", "password", "token",
    )
    hits = []
    for s in strings:
        low = s.lower()
        if any(k in low for k in keywords):
            hits.append(s)
    return hits[:80]


def disassemble_at(pe: pefile.PE, rva: int, max_insns: int) -> None:
    image_base = pe.OPTIONAL_HEADER.ImageBase
    is_64 = pe.FILE_HEADER.Machine == 0x8664
    mode = CS_MODE_64 if is_64 else CS_MODE_32
    md = Cs(CS_ARCH_X86, mode)
    md.detail = True

    offset = pe.get_offset_from_rva(rva)
    code = pe.get_memory_mapped_image()[rva : rva + 0x2000]

    print("=" * 72)
    print(f"DISASSEMBLY @ RVA 0x{rva:08X} (VA 0x{image_base + rva:016X})")
    print("=" * 72)
    count = 0
    for insn in md.disasm(code, image_base + rva):
        print(f"  0x{insn.address:016X}: {insn.mnemonic:8} {insn.op_str}")
        count += 1
        if count >= max_insns:
            print(f"  ... truncated after {max_insns} instructions")
            break
    print()


def main() -> int:
    parser = argparse.ArgumentParser(description="Static PE disassembly and analysis")
    parser.add_argument("exe", help="Path to PE executable")
    parser.add_argument("--max-insns", type=int, default=120, help="Max instructions to print")
    parser.add_argument("--section", default=None, help="Disassemble start of named section")
    args = parser.parse_args()

    raw = open(args.exe, "rb").read()
    pe = pefile.PE(data=raw)

    print_pe_header(pe, args.exe)

    print("PACKER / OBFUSCATION HINTS")
    print("-" * 72)
    print(f"  UPX signatures present : {detect_upx(raw)}")
    high_entropy = []
    for section in pe.sections:
        name = section.Name.rstrip(b"\x00").decode("ascii", errors="replace")
        if section.SizeOfRawData == 0:
            continue
        blob = section.get_data()
        if len(blob) < 256:
            continue
        freq = Counter(blob)
        import math

        entropy = -sum((c / len(blob)) * math.log2(c / len(blob)) for c in freq.values())
        if entropy > 7.2:
            high_entropy.append((name, entropy))
    if high_entropy:
        for name, ent in high_entropy:
            print(f"  High-entropy section   : {name} ({ent:.2f})")
    else:
        print("  High-entropy sections  : none flagged")
    print()

    strings = extract_strings(raw)
    hits = interesting_strings(strings)
    print("INTERESTING STRINGS (sample)")
    print("-" * 72)
    if hits:
        for s in hits:
            print(f"  {s[:120]}")
    else:
        for s in strings[:30]:
            print(f"  {s[:120]}")
    print()

    if args.section:
        target = None
        for section in pe.sections:
            name = section.Name.rstrip(b"\x00").decode("ascii", errors="replace")
            if name.lower() == args.section.lower():
                target = section.VirtualAddress
                break
        if target is None:
            print(f"Section '{args.section}' not found", file=sys.stderr)
            return 1
        disassemble_at(pe, target, args.max_insns)
    else:
        ep = pe.OPTIONAL_HEADER.AddressOfEntryPoint
        disassemble_at(pe, ep, args.max_insns)

    pe.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
