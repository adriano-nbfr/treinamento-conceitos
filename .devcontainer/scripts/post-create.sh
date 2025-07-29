#!/bin/bash

## Instala as dependências se o workspace tiver um arquivo package.json
if [ -e "package.json" ];
then
    echo "Instalando as dependências..."
    npm install
fi
