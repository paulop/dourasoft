import React, {useEffect, useState} from 'react';

const OrderDetail= ({ord}) => {

    const [search, setSearch] = useState();

    const [prod_name, setProdName] = useState();

/*
    // The empty array is used for rendering useEffect only once
    useEffect ( (id) => {
        const setData = async () => {
            try {
                async function fetchOid() {
                    const response = await fetch(`http://localhost:3001/orders/api/v1/ordet/${String(ord.id)}`);
                    const data = await response.json();
                    console.log(data.rows);
                    await setSearch(data.rows);
                    console.log(ord.id);
                    console.log(search);
                     
                }
                fetchOid();
            } catch (error) {     
            }
        }
        setOrders(orders.filter(ord=>ord.id == id));
    }, []);
*/

    // Show Order items from specific order number
    const showOid = async (id) => {
        const setData = async () => {
            try {
                async function fetchOid() {
                    const response = await fetch(`http://localhost:3001/orders/api/v1/ordet/${String(ord.id)}`);
                    const data = await response.json();
                    //console.log(data.rows);
                    await setSearch(data.rows);
                    //console.log(ord.id);
                    //console.log(search);
                     
                }
                fetchOid();
            } catch (error) {     
            }
        }
        //setSearch((ord).filter(ord=>ord.id == id));
        setData();
    }

    // Search Item by name on DB in Products table
    const findItem = async (id) => {
        const setData = async () => {
            try {
                async function fetchOid() {
                    const body = {prod_name};
                //console.log(body);
                const options = {
                    method: 'PUT',
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(body)
                };
                    const response = await fetch(`http://localhost:3001/orders/api/v1/ordet/${String(ord.id)}`);
                    const data = await response.json();
                    //console.log(data.rows);
                    await setSearch(data.rows);
                    //console.log(ord.id);
                    //console.log(search);
                     
                }
                fetchOid();
            } catch (error) {     
            }
        }
        //setSearch((ord).filter(ord=>ord.id == id));
        setData();
    }

    // whe we have more than one Modal element, it is needed to set target and id as random strings
    var rand1 = String(Math.floor(Math.random() * 1000000));
    var rand2 = String(Math.floor(Math.random() * 1000000));


    return (
        <>
            <div className="container" style={{color: "black"}} >
   
                <button type="button" className="btn btn-info" onClick={() => showOid(ord.id)} data-toggle="modal" data-target={`#myModal`+rand1}>
                    Items
                </button>

                <div className="modal fade" id={`myModal`+rand1}>
                    <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    

                        <div className="modal-header">
                        <h4 className="modal-title">Order Items</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        

                        <div className="modal-body">
                            <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Unit Price</th>
                                    <th>Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>                
                                    {search && search.map((sch) => {
                                            return (                                                                                       
                                                <tr key = {sch.id}>
                                                    <td>{sch.prod_name}</td>
                                                    <td>{sch.quantity}</td>
                                                    <td>{sch.price}</td>
                                                    <td>{sch.subtotal}</td>
                                                </tr>                
                                            );
                                    })}                               
                            </tbody>
                            </table>
                        </div>
    
                        <div className="modal-body">
                            <h5 className="modal-title">Insert/Modify Product Quantity</h5>
                            <div className="input-group col-md-4 m-1">
                                        <input className="form-control py-2 border-right-0 border" type="search" placeholder="search" onChange={e=>{setProdName(e.target.value)}} id={"example-search-input"+rand2}/>
                                        <span className="input-group-append">
                                            <button className="btn btn-outline-secondary border-left-0 border" type="button">
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
                                <tbody>
                                <tr>
                                    <td>Fanta 2L</td>
                                    <td>10</td>
                                    <td>7.50</td>
                                    <td>75.00</td>
                                </tr>                                    
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="modal-footer">
                            <div className="container">
                                <button type="button" className="btn btn-success m-1" data-dismiss="modal">Ok</button>
                                <button type="button" className="btn btn-secondary m-1" data-dismiss="modal">Close</button>
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