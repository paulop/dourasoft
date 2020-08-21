import React from 'react';
import { useState, useEffect } from 'react';
import './main.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

import Header from '../../components/header';
import Modal from '../../components/adcionarProdutos';
import api from '../../services/api';
import ModalProdutos from '../../components/editarProduto';


function Produtos() {
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ modalVisivel, setModalVisivel] = useState(false);
    const [ produtos, setProdutos ] = useState([]); 

    function modal(e){
        e.preventDefault();

        setIsModalVisible(true);
    }

    useEffect(() => {
        api.get('/produtos').then(response => {
            setProdutos(response.data);
        })
    }, [produtos])

    async function editar(id){
        localStorage.setItem('IdProduto', id)

        setModalVisivel(true);
    }

    async function deletar(id){
        try {
            await api.delete(`produtos/${id}`);

            setProdutos(produtos.filter(produtos => produtos.id !== id));
        } catch (err) {
            alert('Erro ao deletar serviço, tente novamente')
        }
    }

    return(
        <div className="content">

            <Header></Header>

            <h1>Produtos</h1>
            <div className="table">
                <header>Produtos cadastrados 
                <button className="button" onClick={modal}><AddCircleOutlineIcon className="CircleBtn"></AddCircleOutlineIcon>Adicionar Produtos</button>
                {isModalVisible ? 
                    (<Modal onClose={ () => setIsModalVisible(false)}>
                    </Modal>) : null}
                </header>
                
            <table className="table-box">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.codigo}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.descricao}</td>
                            <td>R${produto.preco}</td>
                            <td><button onClick={() => editar(produto.id)}><EditIcon /></button>
                            {modalVisivel ?
                                (<ModalProdutos onClose={() => setModalVisivel(false)}>
                                </ModalProdutos>) : null
                            }
                            </td>
                            <td><button onClick={() => deletar(produto.id)} ><DeleteOutlineIcon /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Produtos;