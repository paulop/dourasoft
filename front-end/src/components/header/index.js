import React from 'react';
import './main.css';
import { Link } from 'react-router-dom';

function Header() {
    return(
            <header>
            <div className="header">
                <h2>Gerenciador de produtos</h2>
                <nav>
                    <ul>
                        <Link style={{ textDecoration: 'none' }} to={'/'}><li>Inicio</li></Link>
                        <Link style={{ textDecoration: 'none' }} to={'/clientes'}><li>Clientes</li></Link>
                        <Link style={{ textDecoration: 'none' }} to={'/produtos'}><li>Produtos</li></Link>
                        <Link style={{ textDecoration: 'none' }} to={'/pedidos'}><li>Pedidos</li></Link>
                    </ul>
                </nav>
            </div>
            </header>
    )
}

export default Header;