import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Cliente from './pages/Cliente';
import Produto from './pages/Produto';
import Pedido from './pages/Pedido';

import NovoCliente from './pages/Cliente/NovoCliente';
import EditarCliente from './pages/Cliente/EditarCliente';

import NovoProduto from './pages/Produto/NovoProduto';
import EditarProduto from './pages/Produto/EditarProduto'

import NovoPedido from './pages/Pedido/NovoPedido'
import EditarPedido from './pages/Pedido/EditarPedido'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Cliente}></Route>
                <Route path='/novocliente' component={NovoCliente}></Route>
                <Route path='/editarcliente' component={EditarCliente}></Route>

                <Route path='/produto' component={Produto}></Route>
                <Route path='/novoproduto' component={NovoProduto}></Route>
                <Route path='/editarproduto' component={EditarProduto}></Route>

                <Route path='/pedido' component={Pedido}></Route>
                <Route path='/novopedido' component={NovoPedido}></Route>
                <Route path='/editarpedido' component={EditarPedido}></Route>
            </Switch>
        </BrowserRouter>
    );
}