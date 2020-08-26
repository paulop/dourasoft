import React, {useState} from 'react'
import api from '../../../services/api'
import './style.css'

export default function EditarProduto() {

    const [id, setIdProduto] = useState('')
    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState('')


    
    async function handlePut(e) {
        e.preventDefault()
        const data = {codigo, nome, descricao, preco}
        try {
            await api.put(`/produto/${id}`, data);
            alert('Editado!')
            window.location.reload();
        } 
        catch (error) {
            alert('Erro ao editar Produto!');
        }
    }


    return (
        <div className="editarProduto">
            <h3>Editar</h3>
            <form onSubmit={handlePut}>
                <input 
                    value={id}
                    onChange={e => setIdProduto(e.target.value)}
                    placeholder='Id do Produto'
                    className="input-form"
                />
                <input 
                    value={codigo}
                    onChange={e => setCodigo(e.target.value)}
                    placeholder='Código do Produto'
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
                    placeholder='Descrição'
                    className="input-form"
                />
                <input 
                    value={preco}
                    onChange={e => setPreco(e.target.value)}
                    placeholder='Preço'
                    className="input-form"
                />
                <button>Editar</button>
            </form>
        </div>
    )
}