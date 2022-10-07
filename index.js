// criando e ativando o express
const express = require("express");
const app = express();

// definicao de porta
const PORT = 3000;

// middlewares
app.use(express.json());

// monitorar porta e msg de conexao 
app.listen(PORT, () => {
    console.log("Servidor iniciado porta: " + PORT)

});