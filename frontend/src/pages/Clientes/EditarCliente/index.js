import React, {useState} from 'react'
import api from '../../../services/api'
import './style.css'

export default function EditarCliente() {

    const [id, setIdCliente] = useState('')
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')


    
    async function handlePut(e) {
        e.preventDefault()
        const data = {nome, telefone, endereco}
        try {
            await api.put(`/cliente/${id}`, data);
            alert('Editado!')
            window.location.reload();
        } 
        catch (error) {
            alert('Erro ao editar cliente!');
        }
    }


    return (
        <div className="editarCliente">
            <h3>Editar</h3>
            <form onSubmit={handlePut}>
                <input 
                    value={id}
                    onChange={e => setIdCliente(e.target.value)}
                    placeholder='Id do Cliente'
                    className="input-form"
                />
                <input 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder='Nome do Cliente'
                    className="input-form"
                />
                <input
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    placeholder='Telefone'
                    className="input-form"
                />
                <input 
                    value={endereco}
                    onChange={e => setEndereco(e.target.value)}
                    placeholder='Endereço'
                    className="input-form"
                />
                <button>Editar</button>
            </form>
        </div>
    )
}