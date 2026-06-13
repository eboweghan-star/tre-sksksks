@echo off
setlocal

where dotnet >nul 2>nul
if errorlevel 1 (
    echo .NET SDK not found. Install from https://dotnet.microsoft.com/download
    exit /b 1
)

dotnet publish LoaderApp.csproj -c Release -o ..\publish

if errorlevel 1 (
    echo Build failed.
    exit /b 1
)

echo.
echo EXE created: publish\LoaderApp.exe
echo No username or password required.
