$errors = 0
for ($i = 1; $i -le 10; $i++) {
    Write-Host "Running CI Pipeline Iteration $i..."
    npm run lint
    if ($LASTEXITCODE -ne 0) { Write-Host "Lint failed on iteration $i"; $errors++; break }
    npx tsc --noEmit
    if ($LASTEXITCODE -ne 0) { Write-Host "Typecheck failed on iteration $i"; $errors++; break }
    Write-Host "Iteration $i Success!"
}
if ($errors -eq 0) { Write-Host "10/10 Runs Successful. Pipeline Stable." }
