import React, {useState} from 'react';
import $ from "jquery"

const ClientSearch= () => {

    const [tempSch, setTempSch] = useState();
    const [tempName, setTempName] = useState();

    const [customer_name, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [addr, setAddr] = useState("");

    const submitSearch = async () => {
       
            const setData = async () => {
                try {
                    async function fetchOid() {
                        const body = {"customer_name": tempSch};
                        console.log(body)
                    
                    // Fow now it was needed to use a POST request, since GET does not allow to send a body
                    const options = {
                        method: 'POST',
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify(body)
    
                    };
                        const response = await fetch(`http://localhost:3001/customers/api/v1/cust/spec`,options);
                        const data = await response.json();
                        // due to data ping between client and server
                        await console.log('awaiting');
                        await console.log('awaiting')
                        await setTempName(data);
                        //setProdId(data[0].id)
                        console.log(data)
                        jEffect(data.length !== 0)
                        //console.log(prod_name);
                         
                    }
                    fetchOid();
                } catch (error) {     
                }
            }
            setData();
    }

    // Efeitos Jquery: informa se busca retornou cliente ou nao
    const jEffect = (test) => {
        // Condicional ternario para decidir qual mensagem usar
        test ? ($( "div.success" ).fadeIn( 300 ).delay( 3000 ).fadeOut( 400 )) : ($( "div.failure" ).fadeIn( 300 ).delay( 3000 ).fadeOut( 400 ));

    };

    const submitCustomer = async () => {

        try {
            const body = {customer_name, phone, addr};
  
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            const response = await fetch(`http://localhost:3001/customers/api/v1/cust/`, options);
            console.log(response)
            ($( "div.added" ).fadeIn( 300 ).delay( 3000 ).fadeOut( 400 ))
        
        } catch (error) {
            console.log(error.message);
        }

    };
       

    return (
        <>
        <div className="container">
            <h5>Customer Search</h5>

            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#myModal">
                Search
            </button>

            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog modal-lg">
                <div className="modal-content">
                
                    <div className="modal-header">
                    <h5 className="modal-title">Customer Search</h5>
                    <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>
                    
                    <div className="modal-body">
                        <div className="input-group col-md-4 m-1">
                            <input className="form-control py-2 border-right-0 border" onChange={e=>setTempSch(e.target.value)} type="search" placeholder="search" id={"example-search-input"}/>
                            <span className="input-group-append">
                                    <button className="btn btn-outline-secondary border-left-0 border" type="button" onClick={()=>submitSearch()}>
                                        <i className="fa fa-search"></i>
                                    </button>
                            </span>
                        </div> 
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {tempName && tempName.map((cust) => {
                                    return (                                                                                  
                                        <tr key = {cust.id}>
                                            <td>{cust.customer_name}</td>
                                            <td>{cust.phone}</td>
                                            <td>{cust.addr}</td>
                                        </tr>                
                                    );
                                })}
                                </tbody>                                          
                            </table>

                        <div className="alert-box success">Customer found in database !!!</div>
                        <div className="alert-box failure">Customer not found in database !!! Add new client below.</div>

                    <h3>Insert Customer:</h3>
                    <label style={{color: "black"}}>Name:</label>
                    <input type="text" className="form-control" value={customer_name} placeholder="Name" onChange={e => setCustomerName(e.target.value)}/>
                    
                    <label style={{color: "black"}}>Phone</label>
                    <input type="text" className="form-control" value={phone} placeholder="Phone (11-Digit)" onChange={e => setPhone(e.target.value)}/>
                    
                    <label style={{color: "black"}}>Address:</label>
                    <input type="text" className="form-control" value={addr} placeholder="Address" onChange={e => setAddr(e.target.value)}/>
                    </div>
                    
                    
                    <div className="modal-footer">
                    <div className='container ml-3'>
                        <div className="alert-box added">Customer ADDED. Check customer list !!!</div>
                    </div>    
                    <button type="button" className="btn btn-success" onClick={()=>submitCustomer()}>Add</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    
                </div>
                </div>
            </div>
            
        </div>
                            
            
        </>
    );
};

export default ClientSearch;