import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import Pedidos from './pages/Pedidos'


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Clientes}></Route>
                <Route path='/produtos' component={Produtos}></Route>
                <Route path='/pedidos' component={Pedidos}></Route>
            </Switch>
        </BrowserRouter>
    );
}