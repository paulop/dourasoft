import React, { useState, useEffect } from  'react';
import './main.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import api from '../../services/api'; 


const Modal = ({ id = 'modal', onClose = () => {}, children }) => {
    const [ pedidos, setPedidos ] = useState([]);
    const [ produtos, setProdutos ] = useState([]);
    const [ quantidade, setQuantidade ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ produto, setProduto ] = useState('');

    const IdPedido = localStorage.getItem('IdPedido');

    useEffect(() => {
        api.get('/produtos').then( response => {
            setProdutos(response.data)
        });
    }, [produtos])

    useEffect(() => {
        api.get(`/pedido/${IdPedido}`).then( response => {
            setPedidos(response.data);
        });
    }, [pedidos])


    async function deletar(id){
        try {
            await api.delete(`pedidos/lista/${id}`);

            setPedidos(pedidos.filter(pedido => pedidos.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao deletar produto do pedido, tente novamente')
        }
    }

    async function AdicionarProduto(e){
        e.preventDefault();
    
        const data = {
            quantidade,
            produto,
            status
        }

        console.log(data);
        try{
            const response = await api.post(`/listaPedidos/${IdPedido}`, data);
        } catch (error){
            console.log(error);
            alert("Erro ao adicionar a lista. Tente novamente")
        }
    }

    async function handleOutsideClick(e){
        if(e.target.id == id) {
            if(pedidos.length === 0){
                await api.delete(`pedidos/${IdPedido}`);
            }
            onClose();
        }
    }

    async function fechar(){
        if(pedidos.length === 0){
            await api.delete(`pedidos/${IdPedido}`);
        }
        onClose();
    }



    return <div  id={id} className="body" onClick={handleOutsideClick}>
        <div className="modal_container">
            <button className="fechar"onClick={fechar}><HighlightOffIcon /></button>
            <div className="content_modal" >{children}
                <h2>Realizar pedido</h2>
                <form onSubmit={AdicionarProduto}>
                    <p><select onChange={e => setProduto(e.target.value)}>
                        <option value="">escolha o produto</option>
                        {produtos.map(produto => (
                            <option key={produto.id} value={produto.id}
                            >{produto.nome}</option>
                        ))}
                    </select></p>
                    <p><select onChange={e => setStatus(e.target.value)}>
                        <option value="">selecione o Status do pedido</option>
                        <option value="Aberto"
                        >Aberto</option>
                        <option value="Entregue"
                        >Entregue</option>
                        <option value="Cancelado"
                        >Cancelado</option>
                    </select></p>
                    <p><input 
                        type="number"
                        placeholder="Quantidade de produtos"
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                    /></p>
                    <button className="buttonForm" type="submit">Adcionar</button>
                </form>
                            
                <div>
                    <table className="table-box">
                        <thead>
                            <tr>
                                <th>produto</th>
                                <th>quantidade</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map(pedido => (
                                <tr key={pedido.id}>
                                    <td>{pedido.produto}</td>
                                    <td>{pedido.quantidade}</td>
                                    <td><button onClick={() => deletar(pedido.id)} >Excluir</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>

    </div>
};

export default Modal;