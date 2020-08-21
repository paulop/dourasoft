import React from 'react';
import { useState, useEffect } from 'react';
import './main.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

import Header from '../../components/header';
import Modal from '../../components/adcionarCliente';
import ModalPedidos from '../../components/adcionarPedidos';
import Editar from '../../components/editarCliente';
import api from '../../services/api';


function Clientes() {
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ modalVisivel, setModalVisivel] = useState(false);
    const [ editModal, setEditModal] = useState(false);
    const [ clientes, setClientes ] = useState([]);

    function modal(e){
        e.preventDefault();

        setIsModalVisible(true);
    }

    function editar(id){
        localStorage.setItem('id', id)

        setEditModal(true);
    }

    async function pedido(id){
        const res = await api.post(`/pedidos/${id}`)
        
        localStorage.setItem('IdPedido', res.data.idPedido);
        
        setModalVisivel(true);
    }

    useEffect(() => {
        api.get('/clientes').then( response => {
            setClientes(response.data);
        })
    }, [clientes]);

    async function deletar(id){
        try {
            await api.delete(`clientes/${id}`);

            setClientes(clientes.filter(clientes => clientes.id !== id));
        } catch (err) {
            alert('Erro ao deletar serviço, tente novamente')
        }
    }

    return(
        <div className="content">

            <Header></Header>

            <h1>Clientes</h1>
            <div className="table">
                <header>Clientes cadastrados 
                <button className="button" onClick={modal}><AddCircleOutlineIcon className="CircleBtn"></AddCircleOutlineIcon>Adicionar Clientes</button>
                {isModalVisible ? 
                    (<Modal onClose={ () => setIsModalVisible(false)}>
                    </Modal>) : null}
                
                </header>
                
            <table className="table-box">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Pedir para o Cliente</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.endereco}</td>
                            <td><button onClick={() => pedido(cliente.id)}>Realizar um pedido</button>
                            {modalVisivel ?
                                (<ModalPedidos onClose={() => setModalVisivel(false)}>
                                </ModalPedidos>) : null
                            }
                            </td>
                            <td><button onClick={() => editar(cliente.id)}><EditIcon /></button>
                            {editModal ? 
                                (<Editar onClose={ () => setEditModal(false)}>
                                </Editar>) : null
                            }
                            </td>
                            <td><button onClick={() => deletar(cliente.id)} ><DeleteOutlineIcon /></button></td>
                        </tr>
                    ))};
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Clientes;