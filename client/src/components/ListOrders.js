import React, {useEffect, useState} from 'react';

import EditOrder from './EditOrder';
import OrderDetail from './OrderDetail';

const ListOrders = () => {
    const [orders, setOrders] = useState();

    
    // The empty array is used for rendering useEffect only once
    useEffect ( () => {
        const fetchData =  async () => {
            try {
                    async function fetchProds() {
                        const response = await fetch('http://localhost:3001/orders/api/v1/ord/');
                        const data = await response.json();
                        await setOrders(data.rows);
                        //console.log(data.rows);
                    }
                    fetchProds();

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();

    }, []);
    
    
    const deleteReg = async (id) => {

        const options = {method: 'DELETE'};
        //console.log(id)
        const result = await fetch(`http://localhost:3001/orders/api/v1/ord/${String(id)}`, options);
        // This should be the easiest way to update react useState, by means of a filter
        // Filter only those that do not match the deleted element id
        setOrders(orders.filter(ord=>ord.id !== id));
        console.log(result);
        
    }

    // Date conversion for showing a short version
    const nDate = (dt) => {
        let timestamp = Date.parse(dt);
            let date = new Date(timestamp);
            //let nDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            let nDate = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
        return nDate;
    }
     

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Id</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Total</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((ord) => {
                        return (
                            <tr key = {ord.id}>
                                <td>{ord.id}</td>
                                <td>{ord.customer_id}</td>
                                <td>{nDate(ord.date)}</td>
                                <td>{ord.status}</td>
                                <td>{ord.total}</td>                                
                                <td><OrderDetail ord={ord}/></td>
                                <td><EditOrder ord={ord}/></td>
                                <td><button className="btn btn-danger" onClick={() => deleteReg(ord.id)}>Delete</button></td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )    
}

export default ListOrders