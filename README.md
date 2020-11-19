# Desafio DouraSoft
Criação de um sistema web utilizando Quasar com ssr e vuex no frontend e no backend utilizando CakePHP com banco de dados PostgreSQL.
## Requisitos
* Node.js
* npm
* PostgreSQL
## Instalação
Os comandos a seguir foram utilizados no Ubuntu 18.04.5 . 
### Configurando o Banco de Dados
Acesse o cli do PostgreSQL.
```
sudo -u postgres psql
```
#### 1 - Criar Usuário
Caso queira utilizar outro usuário para acessar o banco de dados, basta trocar o nome e senha utilizados nos scripts abaixo e no arquivo _**.env**_ na pasta _**server**_. 

Será criado um usuário com nome _**user123**_ e senha _**123**_
```
CREATE USER user123 WITH PASSWORD '123';
```
#### 2 - Criar Database
A base de dados criada será chamada de _**desafio_dourasoft_alessandro**_, caso queira utilizar outro nome, basta trocar o nome no script abaixo e no arquivo _**.env**_
```
CREATE DATABASE desafio_dourasoft_alessandro;
GRANT ALL PRIVILEGES ON DATABASE "desafio_dourasoft_alessandro" to user123;
```
### Configurando o Banco de Dados no Servidor
No arquivo _**.env**_ na pasta _**server/config**_ preencha o campo _**DATABASE_USER**_ com o nome de usuário no banco de dados e o campo _**DATABASE_PASSWORD**_ com a senha desse usuário. No campo _**DATABASE_NAME**_ insira o nome da base de dados criada na etapa anterior.
```
export DATABASE_HOST="localhost"
export DATABASE_USER="user123"
export DATABASE_PASSWORD="123"
export DATABASE_NAME="desafio_dourasoft_alessandro"
```
#### Configurações, instalações e inicializações específicas para o [client](client/README.md) e o [server](server/README.md) podem ser encontradas em seus respectivos README.md .
