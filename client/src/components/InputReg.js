import React, {useState} from 'react';

const InputReg = () => {

    const [allValues, setAllValues] = useState({
        cod_prod: "",
        prod_name:"",
        description:"",
        price: ""
    });
    const changeHandler = ev => {
        setAllValues({...allValues, [ev.target.name]: ev.target.value})
     }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {allValues};
            const response = fetch("http://localhost:3001/api/v1/register",{
                method:"POST",
                headers: {"Content-Type": "application.json"},
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <div class="container m-1">
            <div className="h2 text-center">Add Product</div>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input 
                    type="number" 
                    className="form-control m-2 w-25"
                    value={allValues.cod_prod}
                    placeHolder="Code"
                    onChange={changeHandler}
                />
                <input 
                    type="text" 
                    className="form-control m-2 w-75"
                    value={allValues.name} 
                    placeHolder="Name"
                    onChange={changeHandler}
                />
                <input 
                    type="text" 
                    className="form-control m-2 w-75"
                    value={allValues.description}
                    placeHolder="Description" 
                    onChange={changeHandler}
                />
                <input 
                    type="number" 
                    className="form-control m-2 w-25"
                    value={allValues.price}
                    placeHolder="Price" 
                    step=".01"
                    onChange={changeHandler}
                />
                <button className="btn btn-success m-2">Add</button>
            </form>
            </div>
        </>
    );
};

export default InputReg;