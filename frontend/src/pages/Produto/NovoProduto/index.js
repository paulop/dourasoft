import React, {useState} from 'react'
import api from '../../../services/api'
import Links from '../../../components/Links'
import './style.css'

export default function NovoProduto(){

    const [nome_produto, setNome] = useState('')
    const [desc_produto, setDesc] = useState('')
    const [preco_produto, setPreco] = useState('')
    const [codigo_produto, setCodigo] = useState('')
    


    //Adicionar Clientes
    async function handleNovoProduto(e) {
        e.preventDefault()
        const data = {nome_produto, desc_produto, preco_produto, codigo_produto}
        try {
            await api.post('/produto', data);
            alert('Cadastrado!')
        } 
        catch (error) {
            alert('Erro ao cadastrar cliente');
        }
    }

    return(

        
        <div className="novo-produto-container">
            
            <Links/>

            {/* Adicionar Cliente */}
            <h1>Adicionar Produto</h1>
            <form onSubmit={handleNovoProduto}>
                <input 
                    value={nome_produto}
                    onChange={e => setNome(e.target.value)}
                    placeholder='Nome do Produto'
                    className="input-form"
                />
                <textarea
                    value={desc_produto}
                    onChange={e => setDesc(e.target.value)}
                    placeholder='Descrição do Produto'
                    className="input-form"
                />
                <input 
                    value={preco_produto}
                    onChange={e => setPreco(e.target.value)}
                    placeholder='Preço'
                    className="input-form"
                />
                <input 
                    value={codigo_produto}
                    onChange={e => setCodigo(e.target.value)}
                    className="input-form"
                    placeholder='Código do produto (10 digitos)'
                />
                <button className="button">
                    Cadastrar
                </button>
            </form>
        </div>
        
    );
}