import React, { useState } from  'react';
import './main.css';
import { formatToPhone } from 'brazilian-values';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import api from '../../services/api';


const Modal = ({ id = 'modal', onClose = () => {}, children }) => {

    const handleOutsideClick = (e) => {
        if(e.target.id == id) onClose();
    }

    const [ nome, setNome ] = useState('');
    const [ telefone, setTelefone ] = useState('');
    const [ endereco, setEndereco ] = useState('');

    async function CadastrarCliente(e){
        e.preventDefault();

        const data = {
            nome, 
            telefone,
            endereco
        }

        try {
           const response = await api.post('/clientes', data);
           onClose();
        } catch (error) {
            alert('Erro no Cadastro. Tente novamente');
        }
    }


    return <div  id={id} className="modal" onClick={handleOutsideClick}>
        <div className="container_modal">
            <button className="close"onClick={onClose}><HighlightOffIcon /></button>
            <div className="content_modal">{children}
            <h2>Cadastro de Cliente</h2>
                <form onSubmit={CadastrarCliente}>
                    <p><input
                        type="texto"
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    /></p>
                    <p><input
                        type="text"
                        name="telefone"
                        placeholder="Número"
                        value={formatToPhone(telefone)}
                        required
                        onChange={e => setTelefone(e.target.value)}
                    /></p>
                    <p><input
                        type="texto"
                        placeholder="Endereço"
                        value={endereco}
                        onChange={e => setEndereco(e.target.value)}
                    /></p>
                    <p>
                    </p>
                    <p><button type="submit">Cadastrar</button></p>
                </form>

            </div>
        </div>

    </div>
};

export default Modal;