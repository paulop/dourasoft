const express = require('express')
const routes = express.Router()
const knex = require('./database/index')

//constollers
const ClienteController =  require('./controllers/ClienteController')
const ProdutoController =  require('./controllers/ProdutoController')
const PedidoController =  require('./controllers/PedidoController')



routes
    //cliente
    .get('/cliente', ClienteController.index)
    .post('/cliente', ClienteController.create)
    .put('/cliente/:id_cliente', ClienteController.update)
    .delete('/cliente/:id_cliente', ClienteController.delete)
    //Produto
    .get('/produto', ProdutoController.index)
    .post('/produto', ProdutoController.create)
    .put('/produto/:id_produto', ProdutoController.update)
    .delete('/produto/:id_produto', ProdutoController.delete)
    // //Pedido
    .get('/pedido', PedidoController.index)
    .get('/pedido/:id_cliente_pedido', PedidoController.index)
    .post('/pedido', PedidoController.create)
    .put('/pedido/:id_pedido', PedidoController.update)
    .delete('/pedido/:id_pedido', PedidoController.delete)

    
module.exports = routes