import React, {useState} from 'react'
import api from '../../../services/api'
import './style.css'

export default function EditarPedido() {

    const [id, setId] = useState('')
    const [id_cliente, setIdCliente] = useState('')
    const [data_pedido, setDataPedido] = useState('')
    const [status, setStatus] = useState('')
    const [total_pedido, setTotalPedido] = useState('')


    
    async function handlePut(e) {
        e.preventDefault()
        const data = {id_cliente, data_pedido, status, total_pedido}
        try {
            await api.put(`/pedido/${id}`, data);
            alert('Editado!')
            window.location.reload();
        } 
        catch (error) {
            alert('Erro ao editar pedido!');
        }
    }


    return (
        <div className="editarPedido">
            <h3>Editar</h3>
            <form onSubmit={handlePut}>
                <input 
                    value={id}
                    onChange={e => setId(e.target.value)}
                    placeholder='ID do pedido'
                    className="input-form"
                />
                <input 
                    value={id_cliente}
                    onChange={e => setIdCliente(e.target.value)}
                    placeholder='ID do Cliente'
                    className="input-form"
                />
                <input
                    value={data_pedido}
                    onChange={e => setDataPedido(e.target.value)}
                    placeholder='Data Pedido'
                    className="input-form"
                />
                <input 
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    placeholder='Status'
                    className="input-form"
                />
                <input 
                    value={total_pedido}
                    onChange={e => setTotalPedido(e.target.value)}
                    placeholder='Total Pedido'
                    className="input-form"
                />                
                <button>Editar</button>
            </form>
        </div>
    )
}