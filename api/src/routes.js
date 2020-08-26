const express = require('express')
const routes = express.Router()


const ClienteController =  require('./controllers/ClienteController')
const ProdutoController =  require('./controllers/ProdutoController')
const PedidoController =   require('./controllers/PedidoController')

routes  
    //clientes
    .get('/', ClienteController.index)
    .get('/cliente/:nome', ClienteController.indexById)
    .post('/cliente', ClienteController.create)
    .put('/cliente/:id', ClienteController.update)
    .delete('/cliente/:id', ClienteController.delete)
    //produtos
    .get('/produto', ProdutoController.index)
    .post('/produto', ProdutoController.create)
    .put('/produto/:id', ProdutoController.update)
    .delete('/produto/:id', ProdutoController.delete)
    //pedidos e lista_itens
    .get('/pedido', PedidoController.index)
    .get('/lista_itens/:id', PedidoController.indexListaItens)
    .post('/pedido', PedidoController.create)
    .post('/lista_itens', PedidoController.createListaItens)
    .put('/pedido/:id', PedidoController.update)
    .put('/lista_itens/:id', PedidoController.updateListaItens)
    .delete('/pedido/:id', PedidoController.delete)
    .delete('/lista_itens/:id', PedidoController.deleteListaItens)




    
module.exports = routes