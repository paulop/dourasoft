import React, {useState} from 'react'
import api from '../../../services/api'
import Links from '../../../components/Links'
import './style.css'

export default function EditarPedido(){

    const [status, setStatus] = useState('')
    const [data_pedido, setData] = useState('')
    const [total, setTotal] = useState('')
    const [id_cliente_pedido, setId] = useState('')
    const [id_pedido, setIdPedido] = useState('')


    
    async function handleEditarPedido(e) {
        e.preventDefault()
        const data = { id_pedido, status, data_pedido, total, id_cliente_pedido}
        
        try {
            await api.put(`/pedido/${data.id_pedido}`, data);
            alert('Editado!')
        } 
        catch (error) {
            alert('Erro ao editar pedido!');
        }
    }

    return(
        
        <div className="editar-pedido-container">

            
            <Links/>

            {/* Editar cliente */}
            <div className="updatePedido">
                <h1>Editar Pedido</h1>
                <form onSubmit={handleEditarPedido}>
                    <input 
                        value={id_pedido}
                        onChange={e => setIdPedido(e.target.value)}
                        placeholder='Id do pedido'
                        className="input-form"
                    />
                    <input 
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        placeholder='Status'
                        className="input-form"
                    />
                    <input
                        value={data_pedido}
                        onChange={e => setData(e.target.value)}
                        placeholder='Data'
                        className="input-form"
                    />
                    <input 
                        value={total}
                        onChange={e => setTotal(e.target.value)}
                        placeholder='Total'
                        className="input-form"
                    />
                    <input 
                        value={id_cliente_pedido}
                        onChange={e => setId(e.target.value)}
                        placeholder='ID cliente'
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