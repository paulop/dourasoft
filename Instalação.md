# Instalação do desafio

## instalação back-end

1. Adentre a pasta back-end pelo terminal.
2. Execulte o comando "npm install".
3. Aguarde o fim da instalação dos pacotes.
4. Configure as variaveis ambiente que estão localizadas no arquivo .env na raiz da pasta back-end. "BD_USER" deve conter o usuario que será usado para consumir o banco de dados, "BD_PW" deve conter a senha do usuario do banco e "BD_DATABASE" deve conter a base de dados do banco q sera usado para armazenar os dados do site(Essas variaveis são modificadas atraves de qualquer editor de texto. Exemplo:Vs Code).    
5. Após a configuração das variaveis ambiente, novamente no terminal execulter "npx knex migrate:latest". Isso fara com que as migrations sejão execultadas e assim crie as tabelas no banco.
6. Após todos os passos anteriores execulte "npm start" no terminal e tera o back-end do site rodando.

## instalação front-end

1. Primeiro é necessario instalar o instalador de pacotes yarn. Pode acessar a pagina de instalação por esse link e seguir o passo a passo dado pelo site:https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable.
2. Após o fim da instalação através do terminal adentre na pasta front-end
3. Já dentro da pasta execulte o camando "yarn install"
4. Após o fim da instalação dos pacotes execulte o comando "yarn start", assim tera o front-end do site rodando e podera usalo.

-Ronan Laurindo Flôr
