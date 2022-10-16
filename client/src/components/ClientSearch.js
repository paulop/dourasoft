import React, {useState} from 'react';

const ClientSearch= () => {
    /*
    // method onSubmitForm has a POST request
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = {customer_id, date};
              
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            }
            const response = await fetch('http://localhost:3001/orders/api/v1/ord/', options)
            console.log(response);
            

            // Fast solution for table refresh
            //window.location.reload();

        } catch (error) {
            console.log(error.message);
        }

    }
    */
    return (
        <>
        <h5 className="modal-title">Customer Search</h5>
        <div className="input-group col-md-4 m-1">
            <input className="py-2 border-right-0 border w-50" onChange={()=>{}} type="search" placeholder="search" id={"example-search-input"}/>
            <span className="input-group-append">
                <button className="btn btn-outline-secondary border-left-0 border" type="button" onClick={()=>{}}>
                    <i className="fa fa-search"></i>
                </button>
            </span>
        </div>                     
            
        </>
    );
};

export default ClientSearch;