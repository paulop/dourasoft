# Desafio Giacomo

O sql está escrito na forma do knex query builder no arquivo backend/src/database/migrations
## Passos:

1. Criar uma pasta no computador e iniciar nela um repositório git
2. Dentro da pasta executar git clone no repositório que contém o backend e frontend
3. Na pasta backend:
```javascript
    npm init -y
    npm i express knex pg cors
```
* Executar a query "CREATE DATABASE nome_banco" no pgadmin ou SQL Shell psql
* No arquivo knexfile.js colocar o nome do banco de dados
* No arquivo package.json alterar o main para "src/server.js" e adicionar o script "start": "node src/server.js"
```javascript
    npx knex migrate:latest
    npm start
```
server rodando em localhost:3333

4. Em qualquer pasta (pode ser na desafio-giacomo) executar: npx create-react-app nome_pasta
5. Na pasta criada, excluir as pastas src e public e substituir pela src e public que estão na pasta frontend
6. Na pasta criada pelo react, executar:
```javascript
    npm i react-router-dom
    npm start
```
7. Abrir a aplicaçao em localhost:3000

