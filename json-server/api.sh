#!/bin/sh
SCRIPT_DIR=$(dirname $(realpath $0));
PATH_DB_ORIGINAL=${SCRIPT_DIR}/db-original.json
PATH_DB=${SCRIPT_DIR}/db.json

## Se existir, o arquivo original dos dados é preservado e uma cópia é usada
if [ -e $PATH_DB_ORIGINAL ]; then
    cat $PATH_DB_ORIGINAL > $PATH_DB
fi

## Inicia o json server para escutar as requisições
echo "Executando json-server..."
npx json-server $PATH_DB -p 3000
