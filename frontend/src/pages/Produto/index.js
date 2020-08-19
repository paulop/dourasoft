import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import Links from '../../components/Links'

export default function Produto(){

    const [produtos, setProdutos] = useState([]);
    

    //Listar produtos   
    useEffect(() => {
        api.get('/produto').then(res => {setProdutos(res.data)});
    }, []);


    //Deletar produto
    async function handleDelete(id_produto) {
        try {
            api.delete(`/produto/${id_produto}`)
            setProdutos(produtos.filter(produto => produto.id_produto !== id_produto));
        }catch(error) {
            alert('Erro ao deletar')
        }
       
    }


    return(
        
        <div className="produtos-container">

            <Links/>

            <div>
                <ul>
                    {produtos.map(produto => (
                        <li key={produto.id_produto}>
                            <strong>ID: </strong>
                            <p> {produto.id_produto} </p>
                            <strong>Nome do Produto: </strong>
                            <p> {produto.nome_produto} </p>

                            <strong>Descrição: </strong>
                            <p> {produto.desc_produto}</p>

                            <strong>Preço: </strong>
                            <p> {produto.preco_produto} </p>

                            <strong>Endereço: </strong>
                            <p> {produto.codigo_produto} </p>

                            <button onClick={() => handleDelete(produto.id_produto)} type='button'>
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}