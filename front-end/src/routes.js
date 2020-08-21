import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Produtos from './pages/Produtos';
import Index from './pages/Menu';
import Clientes from './pages/Clientes';
import Pedidos from './pages/Pedidos';

export default function Routes(){
    return (
        <BrowserRouter >
            <Switch>

                <Route path="/" exact component={Index} />
                <Route path="/clientes" exact component={Clientes} />
                <Route path="/produtos" exact component={Produtos} />
                <Route path="/pedidos" exact component={Pedidos} />

            </Switch>
        </BrowserRouter>
    )
}