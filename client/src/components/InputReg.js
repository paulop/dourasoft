import React, {useState} from 'react';

const InputReg = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = fetch("http://localhost:3000/api/v1/register",{
                method:"POST",
                headers: {"Content-Type": "application.json"},
                body: JSON.stringify(body)
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <h1 className="text-center mt-5">Registers List</h1>
            <form className="d-flex mt-5">
                <input 
                    type="text" 
                    className="form-control" 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </>
    );
};

export default InputReg;