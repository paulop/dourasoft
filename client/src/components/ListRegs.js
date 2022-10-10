import React, {useEffect} from 'react';

const ListRegs = () => {
    
    useEffect ( () => {
        const fetchData = async () => {
            try {
                const options = {method: 'GET', headers: {'Content-Type': 'text/plain'}};
                const response = fetch('http://localhost:3001/api/v1/regs', options)
                .then(response => response.json())
                .then(response => console.log(response.rows))
            } catch (error) {
                console.log(error.message)
            }
            
        }
        
        fetchData();
    });
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
                    <tr>
                        <td>105</td>
                        <td>computador10</td>
                        <td>note topper rapido</td>
                        <td>500.20</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>105</td>
                        <td>computador10</td>
                        <td>note topper rapido</td>
                        <td>500.20</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>

                </tbody>
            </table>
        </div>
    )    
}

export default ListRegs