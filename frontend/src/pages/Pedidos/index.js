import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import Menu from '../../components/Menu'
import AddPedido from './AddPedido'
import EditarPedido from './EditarPedido'
import './style.css'

export default function Pedidos(){

    const [pedidos, setPedido] = useState([]);
    

    //Listar pedidos   
    useEffect(() => {
        api.get('/pedido').then(res => {setPedido(res.data)});
    }, []);


    //Deletar pedido
    async function handleDelete(id) {
        try {
            await api.delete(`/pedido/${id}`)
            setPedido(pedidos.filter(pedido => pedido.id !== id));
        }catch(error) {
            alert('Erro ao deletar pedido')
        }
       
    }


    return(
        
        <div>
            <Menu/>
            <AddPedido/>
            <EditarPedido/>
            <h1>Pedidos</h1>
            <div>
                <ul className="pedidos">
                    {pedidos.map(pedido => (
                        <li key={pedido.id}>
                            <p>
                                <strong>ID:</strong>
                                {pedido.id}
                            </p>
                            <p>
                                <strong>ID Cliente: </strong>
                                {pedido.id_cliente}
                            </p>
                            <p>
                                <strong>Data: </strong>
                                {pedido.data_pedido}
                            </p>
                            <p>
                                <strong>status </strong>
                                {pedido.status}
                            </p>
                            <p>
                                <strong>total_pedido: </strong>
                                {pedido.total_pedido}
                            </p>
                            <button onClick={() => handleDelete(pedido.id)} type='button'>
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}