import React, {useEffect, useState} from 'react';

import EditCustomer from './EditCustomer';

const ListCustomers = () => {
    const [customers, setCustomers] = useState();

    
    // The empty array is used for rendering useEffect only once
    useEffect ( () => {
        const fetchData =  async () => {
            try {
                    async function fetchCustomers() {
                        const response = await fetch('http://localhost:3001/customers/api/v1/cust');
                        const data = await response.json();
                        await setCustomers(data.rows);
                        //console.log(data.rows);
                    }
                    fetchCustomers();

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();

    }, []);
    
    const deleteReg = async (id) => {

        const options = {method: 'DELETE'};
        //console.log(id)
        const deleteCust= await fetch(`http://localhost:3001/customers/api/v1/cust/${String(id)}`, options);
        // This should be the easiest way to update react useState, by means of a filter
        // Filter only those that do not match the deleted element id
        setCustomers(customers.filter(cust=>cust.id !== id));
        console.log(deleteCust);
        
    }


    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {customers && customers.map((cust) => {
                        return (
                            <tr key = {cust.id}>
                                <td>{cust.id}</td>
                                <td>{cust.customer_name}</td>
                                <td>{cust.phone}</td>
                                <td>{cust.addr}</td>
                                <td><EditCustomer cust={cust}/></td>
                                <td><button className="btn btn-danger" onClick={() => deleteReg(cust.id)}>Delete</button></td>

                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )    
}

export default ListCustomers