import React from 'react';

import ListCustomers from "../components/ListCustomers"

import InputCustomer from "../components/InputCustomer"

import NavigateButtons from '../components/NavigateButtons';

const Customers= () => {
    return ( 
        <div className="container mt-5">
            <div className="container">
                <div className="row justify-content-end m-3">
                    <div className="column">
                        <div className="h1">Customer finder</div>
                    </div>
                    <div className="col-5"></div>
                    <div className="column justify-content-end">
                        <NavigateButtons/>
                    </div>
                </div>
            </div>            
            <div className="container">
                <InputCustomer/>
            </div>
            <div className="container">
                <ListCustomers/>
            </div>
        </div>
     );
}
 
export default Customers