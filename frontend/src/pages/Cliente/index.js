import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import Links from '../../components/Links'

export default function Cliente(){

    const [clientes, setCliente] = useState([]);
    

    //Listar clientes   
    useEffect(() => {
        api.get('/cliente').then(res => {setCliente(res.data)});
    }, []);


    //Deletar clientes
    async function handleDelete(id_cliente) {
        try {
            api.delete(`/cliente/${id_cliente}`)
            setCliente(clientes.filter(cliente => cliente.id_cliente !== id_cliente));
        }catch(error) {
            alert('Erro ao deletar')
        }
       
    }


    return(
        
        <div className="clientes-container">

            <Links/>
            
            <div>
                <ul>
                    {clientes.map(cliente => (
                        <li key={cliente.id_cliente}>
                            <strong>ID: </strong>
                            <p> {cliente.id_cliente} </p>
                            <strong>Nome: </strong>
                            <p> {cliente.nome_cliente} </p>

                            <strong>Telefone: </strong>
                            <p> {cliente.telefone_cliente}</p>

                            <strong>Endereço: </strong>
                            <p> {cliente.endereco_cliente} </p>

                            <button onClick={() => handleDelete(cliente.id_cliente)} type='button'>
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}