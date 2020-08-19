import React, {useState} from 'react'
import api from '../../../services/api'
import Links from '../../../components/Links'

export default function NovoCliente(){

    const [status, setStatus] = useState('')
    const [data_pedido, setData] = useState('')
    const [total, setTotal] = useState('')
    const [id_cliente_pedido, setCliente] = useState('')


    //Adicionar Clientes
    async function handleNovoPedido(e) {
        e.preventDefault()
        const data = {status, data_pedido, total, id_cliente_pedido}
        try {
            await api.post('/pedido', data);
            alert('Cadastrado!')
        } 
        catch (error) {
            alert('Erro ao cadastrar pedido');
        }
    }

    return(


        
        <div className="novo-pedido-container">
            
            <Links/>

            {/* Adicionar Cliente */}
            <h1>Adicionar Pedido</h1>
            <form onSubmit={handleNovoPedido}>
                <input 
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    placeholder='Status do pedido'
                    className="input-form"
                />
                <input
                    value={data_pedido}
                    onChange={e => setData(e.target.value)}
                    placeholder='Data do pedido'
                    className="input-form"
                />
                <input 
                    value={total}
                    onChange={e => setTotal(e.target.value)}
                    placeholder='Total do pedido'
                    className="input-form"  
                />
                <input 
                    value={id_cliente_pedido}
                    onChange={e => setCliente(e.target.value)}
                    placeholder='Id do cliente'
                    className="input-form"  
                />
                <button className="button">
                    Cadastrar
                </button>
            </form>
        </div>
        
    );
}