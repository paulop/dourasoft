# Roteiro da Solução do Desafio DouraSoft - por Guilherme Marra

Desafio Desenvolvimento Web - DouraSoft

## Descrição
Desenvolvimento de um CRUD de cadastro de produtos em VueJS/QuasarCli e **PostgreSQL**

Framework/stack utilizado para Backend(SERVER): 
[node.js + express + pg lib (Postgres)]()

Framework/stack utilizado para FrontendCLIENT: 
[node.js + Vuejs/QuasarCli]()

Banco de Dados: ElephantSQL (Posgres) em nuvem:

## Scripts SQL do PostgreSQL:

	Arquivos na pasta "Server": 	
		
		dbase-v0.5.sql 
		dbase-v0.6.sql
		dbase-v0.7.sql 


## Manual de instalação e inicialização para Ubuntu 22.04 lts:

1 - Realizar update do Ubuntu 22.04

    sudo apt update

2 - Instalar node.js v18.11.0:

    user@host:~$ sudo apt install nodejs

3 - Instalar o gestor de pacotes do node - npm v8.12.1:

    user@host:~$ sudo apt install npm

4 - Clonar o repositório do github em uma pasta (exemplo: "user@host:~$"):

	user@host:~$ git clone "endereco_http"

5 - Entrar na pasta e **realizar o git checkout no branch "desafio-guivue"**

	user@host:~$ cd dourasoft

	user@host:~/dourasoft$ git checkout desafio-guivue
    
6 - Entrar na pasta server e Instalar dependencias do Backend:

	user@host:~/dourasoft$ cd server

	user@host:~/dourasoft/server$ npm install


7 - Instalar dependencias do Frontend pasta client (node e quasar):

	user@host:~/dourasoft$ cd client

	user@host:~/dourasoft/client$ npm install

	user@host:~/dourasoft/client$ quasar upgrade -i

8 - Banco de dados: foram utilizados no desenvolvimento banco de dados em servidor local e também banco de dados em nuvem. Por praticidade, o banco de dados configurado atualmente está implementado externamente na nuvem (PostgreSQL - ElephantSQL):

	As credenciais de acesso ao ElephantSQL estão em um arquivo .env enviado no email paulo@dourasoft.com.br .  

	Este arquivo .env deve ser inserido dentro da pasta "SERVER" neste momento.

9 - Em caso de se manter em uso do Banco de Dados em nuvem, pular este passo. Caso desejar utilizar banco Postgres local, deve-se:

- a - instalar o PosgreSQL seguindo o roteiro deste link [link](https://www.postgresql.org/download/linux/ubuntu/)

- b - instalar o pgAdmin4 mostrado no roteiro deste [link](https://www.pgadmin.org/download/pgadmin-4-apt/) 


10 - Inicializar o server em um terminal a partir da **pasta server** (recomendado vscode com 02 terminais em modo split): 

	user@host:~/dourasoft/server$ nodemon

11 - Inicializar o client em outro terminal a partir da **pasta client**: 

	user@host:~/dourasoft/client$ npm start

12 - Uma instância do navegador deverá abrir o Frontend na URL http://localhost:9000 com o projeto




## Dúvidas:

WhatsApp: **67 9 9976 9781**

Ou envie um email para: **guicmarra@gmail.com**


