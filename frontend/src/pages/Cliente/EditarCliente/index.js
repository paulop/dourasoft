import React, {useState} from 'react'
import api from '../../../services/api'
import Links from '../../../components/Links'
import './style.css'

export default function EditarCliente(){

    const [id_cliente, setIdCliente] = useState('')
    const [nome_cliente, setNome] = useState('')
    const [telefone_cliente, setTelefone] = useState('')
    const [endereco_cliente, setEndereco] = useState('')


    
    async function handleEditarCliente(e) {
        e.preventDefault()
        const data = {nome_cliente, telefone_cliente, endereco_cliente}
        try {
            await api.put(`/cliente/${id_cliente}`, data);
            alert('Editado!')
        } 
        catch (error) {
            alert('Erro ao editar cliente!');
        }
    }

    return(
        
        <div className="editar-cliente-container">

            
            <Links/>

            {/* Editar cliente */}
            <div className="updateCliente">
                <h1>Editar Cliente</h1>
                <form onSubmit={handleEditarCliente}>
                    <input 
                        value={id_cliente}
                        onChange={e => setIdCliente(e.target.value)}
                        placeholder='Id do Cliente'
                        className="input-form"
                    />
                    <input 
                        value={nome_cliente}
                        onChange={e => setNome(e.target.value)}
                        placeholder='Nome do Cliente'
                        className="input-form"
                    />
                    <input
                        value={telefone_cliente}
                        onChange={e => setTelefone(e.target.value)}
                        placeholder='Telefone'
                        className="input-form"
                    />
                    <input 
                        value={endereco_cliente}
                        onChange={e => setEndereco(e.target.value)}
                        placeholder='Endereço'
                        className="input-form"
                    />
                    <button className="button">
                        Editar
                    </button>
               </form>
            </div>
        </div>
    );
}