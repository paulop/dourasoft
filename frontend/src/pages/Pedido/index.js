import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import Links from '../../components/Links'

export default function Pedido(){

    const [pedidos, setPedidos] = useState([])
    const [id_cliente_pedido, setId] = useState('')
    

    //Listar produtos   
    useEffect(() => {
        api.get('/pedido').then(res => {setPedidos(res.data)});
    }, []);


    async function handleSpecific(id_cliente_pedido) {
        api.get(`/pedido/${id_cliente_pedido}`).then(res => {setPedidos(pedidos.filter(pedido => pedido.id_cliente_pedido !== id_cliente_pedido))})
    }
    
    //Deletar produto
    async function handleDelete(id_pedido) {
        try {
            api.delete(`/pedido/${id_pedido}`)
            setPedidos(pedidos.filter(pedido => pedido.id_pedido !== id_pedido));
        }catch(error) {
            alert('Erro ao deletar')
        }
       
    }


    return(
        
        <div className="pedidos-container">

            <Links/>

            <form onSubmit={handleSpecific}>
                <input 
                        value={id_cliente_pedido}
                        onChange={e => setId(e.target.value)}
                        placeholder='ID Pedido'
                    />
                    <button>Buscar</button>
            </form>

            <div>
                <ul>
                    {pedidos.map(pedido => (
                        <li key={pedido.id_pedido}>
                            <strong>ID: </strong>
                            <p> {pedido.id_pedido} </p>
                            <strong>Status: </strong>
                            <p> {pedido.status} </p>

                            <strong>Data: </strong>
                            <p> {pedido.data_pedido}</p>

                            <strong>Total: </strong>
                            <p> {pedido.total} </p>

                            <strong>Cliente ID: </strong>
                            <p> {pedido.id_cliente_pedido} </p>

                            <button onClick={() => handleDelete(pedido.id_pedido)} type='button'>
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}