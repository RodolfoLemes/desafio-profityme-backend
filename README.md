# Instruções

## Desenvolvimento

- Crie o arquivo `.env`, utilizando como referência o arquivo `.env.example`: `cp .env.example .env`;
- Informe no arquivo `.env` as variáveis de ambiente, como credenciais, acesso de banco de dados, secrets, etc;
- Inicie um banco de dados postgresql;
- Execute:

```bash
yarn                         ## install
yarn typeorm migration:run   ## run migration
yarn dev:http             ## start dev server
```

- Outra alternativa é utilizar o `Docker` e o `docker-compose`, usando o comando:

```bash
docker-compose up -d
```

## Documentação

A documentação está presente no diretório `docs/api.json`, podendo ser aberta em qualquer API client. Porém, no software **insomnia** é mais completo.
