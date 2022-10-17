import React, {useState} from 'react';

const InputOrder= () => {

    const [customer_id, setCustomerId] = useState("");
    const [date, setDate] = useState("");


    // method onSubmitForm has a POST request
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {customer_id, date};
              
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            const response = await fetch('http://localhost:3001/orders/api/v1/ord/', options)
            console.log(response);
            

            // Fast solution for table refresh
            window.location.reload();

        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <>
            <div className="container">
                <div className="h2 text-center">Add Order</div>
                    <form className="d-flex justify-content-left" onSubmit={onSubmitForm}>
                        <input 
                            type="number" 
                            className="form-control m-2 w-50"
                            value={customer_id}
                            placeholder="Customer Id"
                            onChange={e => setCustomerId(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="form-control m-2 w-55"
                            value={date}
                            placeholder="Date (YYYY-MM-DD)" 
                            onChange={e => setDate(e.target.value)}
                        />
                        <button className="btn btn-success m-2">Add</button>
                    </form>
            </div>
        </>
    );
};

export default InputOrder;