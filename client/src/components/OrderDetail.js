import React, {useEffect, useState} from 'react';

const OrderDetail= ({ord}, {FP}) => {

    const [search, setSearch] = useState();
    const [tempName, setTempName] = useState("");
    const [prod_name, setProdName] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [product_id, setProdId] = useState("");
    const [order_id, setOrderId] = useState(ord.id);

    // Show Order items from specific order number
    const showOid = async () => {

        const setData = async () => {
            try {
                async function fetchOid() {
                    const response = await fetch(`http://localhost:3001/orders/api/v1/ordet/${String(ord.id)}`);
                    const data = await response.json();
                    await console.log("Retrieving data from server");
                    await setSearch(data.rows);    
                }
                fetchOid();
            } catch (error) {     
            }
        }

        setData();
    }

    // Search Item by name on DB in Products table
    const findItem = async () => {
        const setData = async () => {
            try {
                async function fetchOid() {
                    const body = {"prod_name": tempName};
                    //console.log(body)
                
                // Fow now it was needed to use a PUT request, since GET does not allow to send a body
                const options = {
                    method: 'POST',
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(body)

                };
                    const response = await fetch(`http://localhost:3001/api/v1/regs/spec`,options);
                    const data = await response.json();
                    // due to data desync between server - clie
                    await console.log('awaiting');
                    await console.log('awaiting');
                    await console.log('awaiting');
                    await setProdName(data);
                    setProdId(data[0].id)
                    console.log(data)
                    //console.log(prod_name);
                     
                }
                fetchOid();
            } catch (error) {     
            }
        }
        setData();
    }

    /*
    const SetAlert = () => {
        return(
            <div class="container">
            <h2>Alerts</h2>
            <p>The button with class="close" and data-dismiss="alert" is used to close the alert box.</p>
            <p>The alert-dismissible class adds some extra padding to the close button.</p>
            <div class="alert alert-success alert-dismissible">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Success!</strong> This alert box could indicate a successful or positive action.
            </div>
        );
    };
    */

    // Tratamento quando se clica o botao "Confirm" do modal de detalhe de pedido
    const changeDetail = async () => {

        
        try {
            //const body = {order_id, "product_id":product_id, "quantity":unit};

            const body = {order_id, product_id, quantity};

  
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            const response = await fetch(`http://localhost:3001/orders/api/v1/ordet/`, options)


            
            // Fast solution for table refresh
            // window.location.reload();

        } catch (error) {
            console.log(error.message);
        }
        try {
            async function fetchOid() {
                const response = await fetch(`http://localhost:3001/orders/api/v1/ordet/${String(ord.id)}`);
                const data = await response.json();
                await console.log("Retrieving data from server");
                await setSearch(data.rows);    
            }
            fetchOid();
        } catch (error) {     
        }
    }

    const SchResult = () => {
        return (
            <>
            {prod_name && prod_name.map((pro) => {
                return (
                    <tbody>                                                                                      
                    <tr key = {pro.id}>
                        <td>{pro.prod_name}</td>
                        <td><input type="number" className="fs-5 w-25" value={quantity} placeholder="Qty" onChange={e => setQuantity(parseInt(e.target.value))}/></td>
                        <td>{pro.price}</td>
                        <td>{quantity*pro.price}</td>
                    </tr>
                    </tbody>                 
                );
            })} 
            </>      
                                                
        );

    }
    
    const deleteReg = async (id) => {

        const options = {method: 'DELETE'};
        console.log(id)
        const result = await fetch(`http://localhost:3001/orders/api/v1/ordet/${String(id)}`, options);
        // This should be the easiest way to update react useState, by means of a filter
        // Filter only those that do not match the deleted element id
        setSearch(search.filter(sch=>sch.id !== id));
        
        console.log(result);
        
    }

    // whe we have more than one Modal element, it is needed to set target and id as random strings
    var rand1 = String(Math.floor(Math.random() * 1000000));
    var rand2 = String(Math.floor(Math.random() * 1000000));
    var acc = 0;

    const timedReload = () => {
        setTimeout(() => {
            window.location.reload();
          }, "200")
    };

    return (
        <>
            <div className="container" style={{color: "black"}} >
   
                <button type="button" className="btn btn-info" onClick={() => showOid()} data-toggle="modal" data-target={`#id${ord.id}`+rand1}>
                    Items
                </button>

                <div className="modal fade" id={`id${ord.id}`+rand1}>
                    <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    

                        <div className="modal-header">
                        <h4 className="modal-title">Order {'#'+ord.id} Items</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={() => timedReload()}>&times;</button>
                        </div>
                        

                        <div className="modal-body">
                            <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Subtotal</th>
                                    <th>Remove</th>
                                </tr>
                                </thead>
                                <tbody>                
                                    {search && search.map((sch) => {                                      
                                            acc = acc + parseFloat(sch.subtotal);
                                            console.log(acc)
                                            return (                                                                                                                                 
                                                <tr key = {sch.id}>
                                                    <td>{sch.prod_name}</td>
                                                    <td>{sch.quantity}</td>
                                                    <td>{sch.price}</td>
                                                    <td>{sch.subtotal}</td>
                                                    <td><button type="button" className="close mr-5" aria-label="Close" onClick={() => deleteReg(sch.id)}><span aria-hidden="true">&times;</span></button></td>
                                                {console.log(sch.subtotal)}
                                                </tr>                
                                            );
                                    })}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><kbd>TOTAL</kbd></td>
                                        <td><kbd>{parseFloat(acc).toFixed(2)}{/*total*/}</kbd></td>
                                        <td></td>
                                    </tr>                               
                            </tbody>
                            </table>
                        </div>
    
                        <div className="modal-body">
                            <h5 className="modal-title">Insert/Modify Product Quantity</h5>
                            <div className="input-group col-md-4 m-1">
                                        <input className="form-control py-2 border-right-0 border" onChange={e=>setTempName(e.target.value)} type="search" placeholder="search" id={"example-search-input"+rand2}/>
                                        <span className="input-group-append">
                                            <button className="btn btn-outline-secondary border-left-0 border" type="button" onClick={() =>findItem()}>
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </span>
                            </div> 
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Prod Name</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Subtotal</th>
                                </tr>
                                </thead>
                                <SchResult/>                                         
                            </table>
                        </div>
                        
                        <div className="modal-footer">
                            <div className="container">
                                <button type="button" className="btn btn-success m-1 mr-2" onClick={ () => changeDetail()}>Insert New</button>
                                <button type="button" className="btn btn-secondary m-1" data-dismiss="modal" onClick={() => timedReload()}>Close</button>
                            </div>
                        
                        </div>
                        
                    </div>
                    </div>
                </div>
                
            </div>
            

        </>

    );
        
};

export default OrderDetail;