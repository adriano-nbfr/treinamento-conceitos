# Define o diretório do script
$ScriptDir = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$PathDbOriginal = Join-Path -Path $ScriptDir -ChildPath "db-original.json"
$PathDb = Join-Path -Path $ScriptDir -ChildPath "db.json"

# Se existir, o arquivo original dos dados é preservado e uma cópia é usada
if (Test-Path $PathDbOriginal) {
    Copy-Item -Path $PathDbOriginal -Destination $PathDb -Force
}

# Inicia o json server para escutar as requisições
Write-Host "Executando json-server..."
npx json-server $PathDb -p 3000