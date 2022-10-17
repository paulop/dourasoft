import React, {useState} from 'react';

const InputCustomer= () => {

    const [customer_name, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [addr, setAddr] = useState("");


    // method onSubmitForm has a POST request
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {customer_name, phone, addr};
              
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            const response = await fetch('http://localhost:3001/customers/api/v1/cust', options);
            console.log(response);
            

            // Fast solution for table refresh
            window.location.reload();

        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <>
            <div className="container m-1">
                <div className="h2 text-center">Add Customer</div>
                    <form className="d-flex" onSubmit={onSubmitForm}>
                        <input 
                            type="text" 
                            className="form-control m-2 w-75"
                            value={customer_name}
                            placeholder="Name"
                            onChange={e => setCustomerName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="form-control m-2 w-75"
                            value={phone}
                            placeholder="Phone (11-Digit)" 
                            onChange={e => setPhone(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="form-control m-2 w-75"
                            value={addr}
                            placeholder="Address"
                            onChange={e => setAddr(e.target.value)}
                        />
                        <button className="btn btn-success m-2">Add</button>
                    </form>
            </div>
        </>
    );
};

export default InputCustomer;