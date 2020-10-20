const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const clienteRouter = require('./routes/clienteRouter');
const pedidoRouter = require('./routes/pedidoRouter');
const produtoRouter = require('./routes/produtoRouter');

const app = express();

const db = require("./models");
db.sequelize.sync();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clientes', indexRouter);
app.use('/produtos', indexRouter);
app.use('/pedidos', indexRouter);
app.use('/api/clientes', clienteRouter);
app.use('/api/produtos', produtoRouter);
app.use('/api/pedidos', pedidoRouter);

module.exports = app;
