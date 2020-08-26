import React, {useState} from 'react'
import api from '../../../services/api'
import './style.css'

export default function AddProduto(){

    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')


    //Adicionar Clientes
    async function handleNovoProduto(e) {
        e.preventDefault()
        const data = {codigo, nome, descricao, preco}
        try {
            await api.post('/produto', data);
            alert('Cadastrado!')
            window.location.reload();
        } 
        catch (error) {
            alert('Erro ao cadastrar produto');
        }
    }

    return(

        <div className="addProduto">

            {/* Adicionar Cliente */}
            <h3>Adicionar</h3>
            <form onSubmit={handleNovoProduto}>
                <input 
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                    placeholder='Codigo do Produto'
                    className="input-form"
                />
                <input 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder='Nome do Produto'
                    className="input-form"
                />
                <input
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    placeholder='descricao'
                    className="input-form"
                />
                <input 
                    value={preco}
                    onChange={e => setPreco(e.target.value)}
                    placeholder='preco'
                    className="input-form"
                />
                <button className="button">
                    Cadastrar
                </button>
            </form>
        </div>
        
    );
}