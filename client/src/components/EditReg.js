import React, {useState} from 'react';

const EditReg = ({prod}) => {

    const [cod_prod, setCodProd] = useState(prod.cod_prod);
    const [prod_name, setProdName] = useState(prod.prod_name);
    const [description, setDescription] = useState(prod.description);
    const [price, setPrice] = useState(prod.price);

    const setData = async (e) => {
        e.preventDefault();
        try {
            const body = {cod_prod, prod_name, description, price};
            //console.log(body);
            const options = {
                method: 'PUT',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            };
            const response = await fetch(`http://localhost:3001/api/v1/regs/${String(prod.id)}`, options);
            console.log(response);
            // temporary solution for refresh page
            window.location.reload();
        } catch (error) {
            
        }

    }

    return (
        <>
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${prod.id}`}>
            Edit
            </button>
            
            <div className="modal" id={`id${prod.id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
            
                <div className="modal-header">
                    <h4 className="modal-title" style={{color: "black"}}>Edit Product</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
            
                <div className="modal-body">
                    <label style={{color: "black"}}>Code:</label>
                    <input type="number" className="form-control" value={cod_prod} onChange={(e)=>setCodProd(parseInt(e.target.value))}/>
                    
                    <label style={{color: "black"}}>Name:</label>
                    <input type="text" className="form-control" value={prod_name} onChange={(e)=>setProdName(e.target.value)}/>
                    
                    <label style={{color: "black"}}>Description:</label>
                    <input type="text" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    
                    <label style={{color: "black"}}>Price:</label>
                    <input type="number" className="form-control" value={price} step=".01" onChange={(e)=>setPrice(parseFloat(e.target.value))}/>
                    
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

export default EditReg;