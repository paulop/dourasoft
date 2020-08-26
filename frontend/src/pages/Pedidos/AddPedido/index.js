import React, {useState} from 'react'
import api from '../../../services/api'
import './style.css'

export default function AddPedido(){

    const [id_cliente, setIdCliente] = useState('')
    const [data_pedido, setDataPedido] = useState('')
    const [status, setStatus] = useState('')
    const [total_pedido, setTotalPedido] = useState('')


    //Adicionar Pedido
    async function handleNovoPedido(e) {
        e.preventDefault()
        const data = {id_cliente, data_pedido, status, total_pedido}
        try {
            await api.post('/pedido', data);
            alert('Cadastrado!')
            window.location.reload();
        } 
        catch (error) {
            alert('Erro ao cadastrar pedido');
        }
    }

    return(


        <div className="addPedido">

            {/* Adicionar Cliente */}
            <h3>Adicionar</h3>
            <form onSubmit={handleNovoPedido}>
                <input 
                    value={id_cliente}
                    onChange={e => setIdCliente(e.target.value)}
                    placeholder='ID do Cliente'
                    className="input-form"
                />
                <input
                    value={data_pedido}
                    onChange={e => setDataPedido(e.target.value)}
                    placeholder='Data: YYYY-MM-DD'
                    className="input-form"
                />
                <input 
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    placeholder='Status do Pedido'
                    className="input-form"
                />
                <input 
                    value={total_pedido}
                    onChange={e => setTotalPedido(e.target.value)}
                    placeholder='Total do Pedido'
                    className="input-form"
                />                
                <button className="button">
                    Cadastrar
                </button>
            </form>
        </div>
        
    );
}