
# Script to generate a single context file for AI ingestion
$ProjectPath = "D:\Code\vishwa-vani"
$OutputFile = "$ProjectPath\AI_CONTEXT.txt"
$ExcludedDirs = @(".next", "node_modules", ".git", "dist", "build")
$IncludedExtensions = @(".ts", ".tsx", ".js", ".jsx", ".css", ".sql", ".json", ".md")

Write-Host "Generating AI Context file at $OutputFile..."

if (Test-Path $OutputFile) { Remove-Item $OutputFile }

Get-ChildItem -Path $ProjectPath -Recurse | Where-Object {
    $file = $_
    $relativePath = $file.FullName.Replace($ProjectPath, "")
    $isExcluded = $false
    foreach ($dir in $ExcludedDirs) {
        if ($relativePath -like "*\$dir\*") { $isExcluded = $true; break }
    }
    if (-not $isExcluded -and $file.Extension -in $IncludedExtensions) {
        return $true
    }
    return $false
} | ForEach-Object {
    $Header = "`n`n--- FILE: $($_.FullName.Replace($ProjectPath, '')) ---`n"
    Add-Content -Path $OutputFile -Value $Header
    try {
        $Content = Get-Content -Path $_.FullName -Raw
        Add-Content -Path $OutputFile -Value $Content
    } catch {
        Write-Warning "Could not read $($_.FullName)"
    }
}

Write-Host "Done! Upload '$OutputFile' to Open WebUI Documents."
