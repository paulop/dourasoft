import React, {useState} from 'react';

const InputOrder= () => {

    const [customer_id, setCustomerId] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState("");


    // method onSubmitForm has a POST request
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {customer_id, date, status, total};
              
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
            <div className="container m-1">
                <div className="h2 text-center">Add Order</div>
                    <form className="d-flex" onSubmit={onSubmitForm}>
                        <input 
                            type="number" 
                            className="form-control m-2 w-75"
                            value={customer_id}
                            placeholder="Customer Id"
                            onChange={e => setCustomerId(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="form-control m-2 w-75"
                            value={date}
                            placeholder="Date (YYYY-MM-DD)" 
                            onChange={e => setDate(e.target.value)}
                        />
                        <input 
                            type="text" 
                            className="form-control m-2 w-75"
                            value={status}
                            placeholder="Status"
                            onChange={e => setStatus(e.target.value)}
                        />
                        <input 
                            type="number" 
                            className="form-control m-2 w-75"
                            value={total}
                            placeholder="Total"
                            onChange={e => setTotal(e.target.value)}
                        />
                        <button className="btn btn-success m-2">Add</button>
                    </form>
            </div>
        </>
    );
};

export default InputOrder;