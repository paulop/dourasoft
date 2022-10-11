import React, {useEffect, useState} from 'react';

const ListRegs = () => {
    const [prods, setProds] = useState();
    
    // The empty array is used for rendering useEffect only once
    useEffect ( () => {
        const fetchData =  async () => {
            try {
                    async function fetchProds() {
                        const response = await fetch('http://localhost:3001/api/v1/regs');
                        const data = await response.json();
                        await setProds(data.rows);
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
        const deleteProd = await fetch(`http://localhost:3001/api/v1/regs/${id}`, options);
        console.log(deleteProd);
    }
    deleteReg(); 


    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {prods && prods.map((prod) => {
                        return (
                            <tr key = {prod.id}>
                                <td>{prod.cod_prod}</td>
                                <td>{prod.prod_name}</td>
                                <td>{prod.description}</td>
                                <td>{prod.price}</td>
                                <td><button className="btn btn-warning">Update</button></td>
                                <td><button className="btn btn-danger" onClick={() => deleteReg(prod.id)}>Delete</button></td>

                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    )    
}

export default ListRegs