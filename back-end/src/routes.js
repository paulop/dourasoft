const express = require('express');
const rotas = express.Router();
const ClienteController = require('./controllers/ClienteCotroller');
const ProdutoController = require('./controllers/ProdutosController');
const PedidosController = require('./controllers/PedidoController')

rotas.post('/clientes', ClienteController.cadastro);
rotas.put('/clientes/:id', ClienteController.editar);
rotas.get('/clientes', ClienteController.clientes);
rotas.delete('/clientes/:id', ClienteController.deletar);

rotas.post('/produtos', ProdutoController.cadastro);
rotas.put('/produtos/:id', ProdutoController.editar);
rotas.get('/produtos', ProdutoController.produtos);
rotas.get('/produto/:id', ProdutoController.produto);
rotas.delete('/produtos/:id', ProdutoController.deletar);

rotas.post('/pedidos/:id', PedidosController.cadastro);
rotas.post('/listaPedidos/:id', PedidosController.AdicionarProduto);
rotas.get('/pedidos', PedidosController.pedidos);
rotas.get('/pedido/:id', PedidosController.produtoPedido);
rotas.delete('/pedidos/lista/:id', PedidosController.deletarProdutoLista);
rotas.delete('/pedidos/:id', PedidosController.deletarPedido);


module.exports = rotas;