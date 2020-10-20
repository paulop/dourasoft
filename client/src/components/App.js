import React from 'react';
import '../assets/components/App.css';
import Header from "./Header";
import {Route} from "react-router-dom";
import ClientContainer from "../containers/ClientContainer";
import ProductContainer from "../containers/ProductContainer";
import OrderContainer from "../containers/OrderContainer";

function App() {
    return (
        <div className="App">
            <Header/>
            <Route path={["/clientes", "/"]} exact>
                <ClientContainer/>
            </Route>
            <Route path="/produtos">
                <ProductContainer/>
            </Route>
            <Route path="/pedidos">
                <OrderContainer/>
            </Route>
        </div>
    );
}

export default App;
