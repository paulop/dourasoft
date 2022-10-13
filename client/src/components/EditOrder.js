import React, {useState} from 'react';

const EditOrder= ({ord}) => {

    const [customer_id, setCustomerId] = useState(ord.customer_id);
    const [date, setDate] = useState(ord.date);
    const [status, setStatus] = useState(ord.status);
    const [total, setTotal] = useState(ord.total);

    const setData = async (e) => {
        e.preventDefault();
        try {
            const body = {customer_id, date, status, total};
            //console.log(body);
            const options = {
                method: 'PUT',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            };
            const response = await fetch(`http://localhost:3001/orders/api/v1/ord/${String(ord.id)}`, options);
            console.log(response);
            // temporary solution for refresh page
            window.location.reload();
        } catch (error) {
            
        }

    }

    return (
        <>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${ord.id}`}>
            Edit
            </button>
            
            <div className="modal" id={`id${ord.id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
            
                <div className="modal-header">
                    <h4 className="modal-title" style={{color: "black"}}>Edit Order</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
            
                <div className="modal-body">
                    <label style={{color: "black"}}>Customer Id:</label>
                    <input type="number" className="form-control" value={customer_id} onChange={(e)=>setCustomerId(parseInt(e.target.value))}/>
                    
                    <label style={{color: "black"}}>Date:</label>
                    <input type="text" className="form-control" value={date} onChange={(e)=>setDate(e.target.value)}/>
                    
                    <label style={{color: "black"}}>Status:</label>
                    <input type="text" className="form-control" value={status} onChange={(e)=>setStatus(e.target.value)}/>
                    
                    <label style={{color: "black"}}>Total:</label>
                    <input type="number" className="form-control" value={total} step=".01" onChange={(e)=>setTotal(parseFloat(e.target.value))}/>
                    
                </div>
            
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e)=>setData(e)}>Confirm</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            
                </div>
            </div>
            </div>

        </>

    );
        
};

export default EditOrder;