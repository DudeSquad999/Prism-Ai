$ErrorActionPreference = 'Stop'

$version = '3.1.0'
$downloadUri = 'https://github.com/DudeSquad999/Prism-Ai/releases/download/v3.1.0/Prism-3.1.0.exe'
$expectedSha256 = '36b261bff2efb42195aa137d50f38cd81c7901f8c9aa78bbb761b5fb4f5947c9'
$installerPath = Join-Path ([System.IO.Path]::GetTempPath()) "Prism-$version.exe"

Write-Host "Downloading Prism AI $version from the official GitHub release..."
Invoke-WebRequest -Uri $downloadUri -OutFile $installerPath -ErrorAction Stop

$actualSha256 = (Get-FileHash -Path $installerPath -Algorithm SHA256).Hash.ToLowerInvariant()
if ($actualSha256 -ne $expectedSha256) {
    Remove-Item -LiteralPath $installerPath -Force -ErrorAction SilentlyContinue
    throw 'Prism installer checksum verification failed. The file was not launched.'
}

Write-Host 'SHA-256 verified. Opening the Prism AI installer...'
Start-Process -FilePath $installerPath
