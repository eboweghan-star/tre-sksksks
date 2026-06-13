# Loader App (no login)

Simple Windows `.exe` with **no username or password** — opens directly to the main window.

## Requirements

- Windows 10/11
- [.NET 8 SDK](https://dotnet.microsoft.com/download)

## Build the EXE

```bat
cd LoaderApp
build.bat
```

Or manually:

```bat
cd LoaderApp
dotnet publish LoaderApp.csproj -c Release -o ..\publish
```

Output: `publish\LoaderApp.exe`

## Customize

Edit `MainForm.cs` → `OnRunClicked()` and add your own startup logic there.

## Project structure

```
LoaderApp/
  Program.cs      # Entry point (no login screen)
  MainForm.cs     # Main UI
  LoaderApp.csproj
  build.bat       # One-click build script
```
