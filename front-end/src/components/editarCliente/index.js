import React, { useState } from  'react';
import './main.css';
import { formatToPhone } from 'brazilian-values';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import api from '../../services/api';


const Modal = ({id = 'modal', onClose = () => {}, children }) => {

    const handleOutsideClick = (e) => {
        if(e.target.id == id) onClose();
    }
    const [ telefone, setTelefone ] = useState('');
    const [ endereco, setEndereco ] = useState('');


    async function EditarCliente(e){
        e.preventDefault();

        const id = localStorage.getItem('id');

        const data = {
            telefone,
            endereco
        }

        try {
           const response = await api.put(`/clientes/${id}`, data); 
            onClose();
        } catch (error) {
            alert('Erro no Cadastro. Tente novamente');
        }
    }


    return <div  id={id} className="modal" onClick={handleOutsideClick}>
        <div className="container_modal">
            <button className="close"onClick={onClose}><HighlightOffIcon /></button>
            <div className="content_modal">{children}
            <h2>Editar Cliente</h2>
                <form onSubmit={EditarCliente}>
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
                    <p><button type="submit">Editar</button></p>
                </form>

            </div>
        </div>

    </div>
};

export default Modal;