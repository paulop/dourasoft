import React, {useState} from 'react'
import api from '../../../services/api'
import './style.css'

export default function BuscaCliente(){

    const [nome, setNome] = useState('')
    const [clientesBuscar, setClienteBuscar] = useState([])


    //Adicionar Pedido
    async function handleBuscar(e) {
        e.preventDefault()
        try {
            await api.get(`/cliente/${nome}`).then(res => {
                if(res.status === 404) {
                    alert('Não encontrado')
                }else {
                    setClienteBuscar(res.data)
                }
            });
        } 
        catch (error) {
            alert('Cliente Não encontrado');
        }
    }

    return(


        <div className="buscarCliente">

            <h3>Buscar</h3>
            <form onSubmit={handleBuscar}>
                <input 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder='Nome do cliente'
                    className="input-form"
                />
                <button className="button">
                    Buscar
                </button>
            </form>
            <div>
                <ul>
                    {clientesBuscar.map(cliente => (
                        <li key={cliente.id}>
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
                        </li>
                    ))}
                </ul>
            </div>
        
            
        </div>
        
    );
}