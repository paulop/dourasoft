import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import Menu from '../../components/Menu'
import AddProduto from './AddProduto'
import EditarProduto from './EditarProduto'
import './style.css'

export default function Produtos(){

    const [produtos, setProduto] = useState([]);
    

    //Listar produtos   
    useEffect(() => {
        api.get('/produto').then(res => {setProduto(res.data)});
    }, []);


    //Deletar produto
    async function handleDelete(id) {
        try {
            await api.delete(`/produto/${id}`)
            setProduto(produtos.filter(produto => produto.id !== id));
        }catch(error) {
            alert('Erro ao deletar produto')
        }
       
    }


    return(
        
        <div>
            <Menu/>
            <AddProduto/>
            <EditarProduto/>
            <h1>Produtos</h1>
            <div>
                <ul className="produtos">
                    {produtos.map(produto => (
                        <li key={produto.id}>
                            <p>
                                <strong>ID:</strong>
                                {produto.id}
                            </p>
                            <p>
                                <strong>Código: </strong>
                                {produto.codigo}
                            </p>
                            <p>
                                <strong>Nome: </strong>
                                {produto.nome}
                            </p>
                            <p>
                                <strong>Descrição: </strong>
                                {produto.descricao}
                            </p>
                            <p>
                                <strong>Preço: </strong>
                                {produto.preco}
                            </p>
                            <button onClick={() => handleDelete(produto.id)} type='button'>
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}