import React, {useState} from 'react'
import api from '../../../services/api'
import './style.css'
import Links from '../../../components/Links'

export default function NovoCliente(){

    const [nome_cliente, setNome] = useState('')
    const [telefone_cliente, setTelefone] = useState('')
    const [endereco_cliente, setEndereco] = useState('')


    //Adicionar Clientes
    async function handleNovoCliente(e) {
        e.preventDefault()
        const data = {nome_cliente, telefone_cliente, endereco_cliente}
        try {
            await api.post('/cliente', data);
            alert('Cadastrado!')
        } 
        catch (error) {
            alert('Erro ao cadastrar cliente');
        }
    }

    return(


        
        <div className="novo-cliente-container">
            
            <Links/>

            {/* Adicionar Cliente */}
            <h1>Adicionar Cliente</h1>
            <form onSubmit={handleNovoCliente}>
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
                    Cadastrar
                </button>
            </form>
        </div>
        
    );
}