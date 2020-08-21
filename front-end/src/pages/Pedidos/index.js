import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

import Header from '../../components/header';
import ModalPedidos from '../../components/adcionarPedidos';
import api from '../../services/api';


function Pedido() {
    const [ modalVisivel, setModalVisivel] = useState(false);
    const [ pedidos, setPedidos ] = useState([]);
    const [ idPedido, setIdPedido ] = useState(''); 

    async function editar(id){
        localStorage.setItem('IdPedido', id);
        
        setModalVisivel(true);
    }

    useEffect(() => {
        api.get('/pedidos').then( response => {
            setPedidos(response.data);
        })
    }, [pedidos])

    async function deletar(id){
        try {
            await api.delete(`pedidos/${id}`);

            setPedidos(pedidos.filter(pedido => pedidos.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao deletar serviço, tente novamente')
        }
    }

    return(
        <div className="content">

            <Header></Header>

            <h1>Pedidos</h1>
            <div className="table">
                <header>Pedidos realizados 

                <Link style={{ textDecoration: 'none' }} to={'/clientes'}>
                <button className="button" ><AddCircleOutlineIcon className="CircleBtn"></AddCircleOutlineIcon>Cadastrar um novo Cliente</button> 
                </Link>
                </header>
                
            <table className="table-box">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Produtos</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}> 
                            <td>{pedido.cliente}</td>
                            <td>R${pedido.total}</td>
                            <td>{pedido.data}</td>
                            <td>{pedido.status}</td>
                            <td>{pedido.produto[0]},{pedido.produto[1]}...</td>
                            <td><button onClick={() => editar(pedido.id)}><EditIcon /></button>
                            {modalVisivel ?
                                (<ModalPedidos onClose={() => setModalVisivel(false)}>
                                </ModalPedidos>) : null
                            }
                            </td>
                            <td><button onClick={() => deletar(pedido.id)} ><DeleteOutlineIcon /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Pedido;
