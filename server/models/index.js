require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    `postgres://${process.env.DATABASE_USER}:${process.env.PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`,
    {dialect: 'postgres'}
);
const Cliente = require('./clienteModel')(sequelize, Sequelize);
const Produto = require('./produtoModel')(sequelize, Sequelize);
const Pedido = require('./pedidoModel')(sequelize, Sequelize);
const ProdutoPedido = require('./produtoPedidoModel')(sequelize, Sequelize);

Pedido.belongsTo(Cliente);
ProdutoPedido.belongsTo(Pedido);
ProdutoPedido.belongsTo(Produto);

module.exports = {
    Sequelize,
    sequelize,
    Cliente,
    Produto,
    Pedido,
    ProdutoPedido
};