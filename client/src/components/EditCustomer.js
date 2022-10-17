import React, {useState} from 'react';

const EditCustomer = ({cust}) => {

    const [customer_name, setCustomerName] = useState(cust.customer_name);
    const [phone, setPhone] = useState(cust.phone);
    const [addr, setAddr] = useState(cust.addr);


    const setData = async (e) => {
        e.preventDefault();
        try {
            const body = {customer_name, phone, addr};
            console.log(body);
            const options = {
                method: 'PUT',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            };
            const response = await fetch(`http://localhost:3001/customers/api/v1/cust/${String(cust.id)}`, options);
            console.log(response);
            // temporary solution for refresh page
            window.location.reload();
        } catch (error) {
            
        }

    }

    return (
        <>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${cust.id}`}>
            Edit
            </button>
            
            <div className="modal" id={`id${cust.id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
            
                <div className="modal-header">
                    <h4 className="modal-title" style={{color: "black"}}>Edit Customer</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
            
                <div className="modal-body">                   
                    <label style={{color: "black"}}>Name:</label>
                    <input type="text" className="form-control" value={customer_name} onChange={(e)=>setCustomerName(e.target.value)}/>
                    
                    <label style={{color: "black"}}>Phone:</label>
                    <input type="text" className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    
                    <label style={{color: "black"}}>Address:</label>
                    <input type="text" className="form-control" value={addr} step=".01" onChange={(e)=>setAddr(e.target.value)}/>
                    
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

export default EditCustomer;