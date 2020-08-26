import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import Menu from '../../components/Menu'
import EditarCliente from './EditarCliente'
import AddCliente from './AddCliente'
import BuscaCliente from './BuscaCliente'
import './style.css'

export default function Cliente(){

    const [clientes, setCliente] = useState([]);
    

    //Listar clientes   
    useEffect(() => {
        api.get('/').then(res => {setCliente(res.data)});
    }, []);


    //Deletar cliente
    async function handleDelete(id) {
        try {
            await api.delete(`/cliente/${id}`)
            setCliente(clientes.filter(cliente => cliente.id !== id));
        }catch(error) {
            alert('Erro ao deletar cliente')
        }
       
    }


    return(
        
        <div>
            <Menu/>
            <AddCliente/>
            <EditarCliente/>
            <BuscaCliente/>
            <h1>Clientes</h1>
            <div>
                <ul className="clientes">
                    {clientes.map(cliente => (
                        <li key={cliente.id} style={{display: "inline"}}>
                            <p>
                                <strong>ID:</strong>
                                {cliente.id}
                            </p>
                            <p>
                                <strong>Nome: </strong>
                                {cliente.nome}
                            </p>
                            <p>
                                <strong>Telefone: </strong>
                                {cliente.telefone}
                            </p>
                            <p>
                                <strong>Endereço: </strong>
                                {cliente.endereco}
                            </p>
                            <button onClick={() => handleDelete(cliente.id)} type='button'>
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}