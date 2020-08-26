import React from 'react'
import { Link } from 'react-router-dom';
import './style.css'

export default function Menu(){
 
    return(
        
        <div className="Menu">

            <ul>
                <li>
                    <Link to="/" className="link">Clientes</Link> 
                </li>
                <li>
                    <Link to="/produtos" className="link">Produtos</Link> 
                </li>
                <li>
                    <Link to="/pedidos" className="link">Pedidos</Link> 
                </li>
            </ul>


        </div>
    );
}