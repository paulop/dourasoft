import React, { useState } from  'react';
import './main.css';
import MaskedInput from 'react-text-mask';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import api from '../../services/api';


const Modal = ({ id = 'modal', onClose = () => {}, children }) => {

    const handleOutsideClick = (e) => {
        if(e.target.id == id) onClose();
    }

    const [ codigo, setCodigo ] = useState('');
    const [ descricao, setDescricao ] = useState('');
    const [ preco, setPreco ] = useState('');


    async function EditarCliente(e){
        e.preventDefault();
        const id = localStorage.getItem('IdProduto');

        const data = {
            codigo,
            descricao,
            preco
        } 

        try {
            const response = await api.put(`/produtos/${id}`, data);
            onClose();
        } catch (error) {
            console.log(error);
            alert("Algo deu Errado. Tente Novamente");
        }
    }

    return <div  id={id} className="modal" onClick={handleOutsideClick}>
        <div className="container_modal">
            <button className="close"onClick={onClose}><HighlightOffIcon /></button>
            <div className="content_modal">{children}
            <h2>Cadastro de Produtos</h2>
                <form onSubmit={EditarCliente}>
                    <p><input 
                        type="number"
                        placeholder="Código do produto"
                        value={codigo}
                        onChange={e => setCodigo(e.target.value)}
                    /></p>
                    <p><MaskedInput
                        mask={[/\d/, /\d/, /\d/, '.',/\d/, /\d/]}
                        placeholder="Preço do Produto"
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                        />
                    </p>
                    <p><textarea 
                        type="text"
                        placeholder="Descrição do Produto"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    /></p>
                    <p><button type="submit">Editar</button></p>
                </form>
            </div>
        </div>

    </div>
};

export default Modal;
