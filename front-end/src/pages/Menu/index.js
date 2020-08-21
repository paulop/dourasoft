import React from 'react';
import { Link } from 'react-router-dom';
import './main.css'


function Index() {
    return(
        <div className="content">
            <div className="Titulo">
                <h1 className="contentH2">Gerenciamento de Produtos e de Pedidos</h1>
                <h2>O que deseja fazer ?</h2>
            </div>

            <div className="link">

            <ul>
                <Link style={{ textDecoration: 'none' }} to="/produtos"><li>Produtos</li></Link>
                <Link style={{ textDecoration: 'none' }} to="/clientes"><li>Clientes</li></Link>
                <Link style={{ textDecoration: 'none' }} to="/pedidos"><li>Pedidos</li></Link>    
            </ul>

            </div>    
        
        </div>
    );
}

export default Index;