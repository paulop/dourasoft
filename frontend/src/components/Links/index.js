import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

export default function Links(){

    return(
        
        <div className="links-container">

        <ul style={{display: "flex"}}>
            <li>
                <Link to="/" className="link" style={{textDecoration: 'underline'}}>Clientes</Link>
                <ul>
                    <li> <Link to="/novocliente" className="link">Novo Cliente</Link></li>
                    <li><Link to="/editarcliente" className="link">Editar Cliente</Link></li>
                </ul>    
            </li>
            <li>
                <Link to="/produto" className="link" style={{textDecoration: 'underline'}}>Produtos</Link>
                <ul>
                    <li><Link to="/novoproduto" className="link">Novo Produto</Link></li>
                    <li><Link to="/editarproduto" className="link">Editar Produto</Link></li>
                </ul>    
            </li>
            <li>
                <Link to="/pedido" className="link" style={{textDecoration: 'underline'}}>Pedidos</Link>
                <ul>
                    <li><Link to="/novopedido" className="link">Novo Pedido</Link></li>
                    <li><Link to="/editarpedido" className="link">Editar Pedido</Link></li>
                </ul>    
            </li>
        </ul>


        </div>
    );
}