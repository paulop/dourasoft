import React from 'react';

import ListCustomers from "../components/ListCustomers"

import InputCustomer from "../components/InputCustomer"

import NavigateButtons from '../components/NavigateButtons';

import sql from '../res/sql.png';

const Customers= () => {
    return ( 
        <div className="container mt-3">
            <div className="container">
                <div className="row">
                    <div className='container ml-5'>
                        <img src={sql} style={{width:"50px"}} alt="sql"/>
                    </div>
                </div>
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