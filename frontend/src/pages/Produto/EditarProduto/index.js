import React, {useState} from 'react'
import api from '../../../services/api'
import Links from '../../../components/Links'
import './style.css'

export default function EditarProduto(){

    const [id_produto, setIdProduto] = useState('')
    const [nome_produto, setNome] = useState('')
    const [desc_produto, setDesc] = useState('')
    const [preco_produto, setPreco] = useState('')
    const [codigo_produto, setCodigo] = useState('')


    
    async function handleEditarProduto(e) {
        e.preventDefault()
        const data = {nome_produto, desc_produto, preco_produto, codigo_produto}
        try {
            await api.put(`/produto/${id_produto}`, data);
            alert('Editado!')
        } 
        catch (error) {
            alert('Erro ao editar produto!');
        }
    }

    return(
        
        <div className="editar-produto-container">

            
            <Links/>

            {/* Editar cliente */}
            <div className="updateProduto">
                <h1>Editar Produto</h1>
                <form onSubmit={handleEditarProduto}>
                    <input 
                        value={id_produto}
                        onChange={e => setIdProduto(e.target.value)}
                        placeholder='Id do Produto'
                        className="input-form"
                    />
                    <input 
                        value={nome_produto}
                        onChange={e => setNome(e.target.value)}
                        placeholder='Nome do Produto'
                        className="input-form"
                    />
                    <textarea
                        value={desc_produto}
                        onChange={e => setDesc(e.target.value)}
                        placeholder='Descrição do produto'
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
                        placeholder='Código (10 digitos)'
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