import React, {useState} from 'react'
import api from '../../../services/api'
import './style.css'

export default function AddCliente(){

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')


    //Adicionar Clientes
    async function handleNovoCliente(e) {
        e.preventDefault()
        const data = {nome, telefone, endereco}
        try {
            await api.post('/cliente', data);
            alert('Cadastrado!')
            window.location.reload();
        } 
        catch (error) {
            alert('Erro ao cadastrar cliente');
        }
    }

    return(


        
        <div className="addCliente">

            {/* Adicionar Cliente */}
            <h3>Adicionar</h3>
            <form onSubmit={handleNovoCliente}>
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
                <button className="button">
                    Cadastrar
                </button>
            </form>
        </div>
        
    );
}