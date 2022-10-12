import React, {useState} from 'react';

import Finder from "../apis/Finder";

const InputReg = () => {

    const [cod_prod, setCodProd] = useState("");
    const [prod_name, setProdName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");


    // method onSubmitForm has a POST request
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {cod_prod, prod_name, description, price};
            //console.log(body);
              
            const response = await Finder.post('/register',body)
            console.log(response.data[0]);
            

            // Fast solution for table refresh
            window.location.reload();

        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <>
            <div className="container m-1">
            <div className="h2 text-center">Add Product</div>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input 
                    type="number" 
                    className="form-control m-2 w-25"
                    value={cod_prod}
                    placeholder="Code"
                    onChange={e => setCodProd(parseInt(e.target.value))}
                />
                <input 
                    type="text" 
                    className="form-control m-2 w-75"
                    value={prod_name} 
                    placeholder="Name"
                    onChange={e => setProdName(e.target.value)}
                />
                <input 
                    type="text" 
                    className="form-control m-2 w-75"
                    value={description}
                    placeholder="Description" 
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                    type="number" 
                    className="form-control m-2 w-25"
                    value={price}
                    placeholder="Price" 
                    step=".01"
                    onChange={e => setPrice(parseFloat(e.target.value))}
                />
                <button className="btn btn-success m-2">Add</button>
            </form>
            </div>
        </>
    );
};

export default InputReg;