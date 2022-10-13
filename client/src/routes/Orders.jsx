import React from 'react';

import InputOrder from "../components/InputOrder"
import NavigateButtons from '../components/NavigateButtons';
import ListOrders from "../components/ListOrders";

const Products= () => {
    return ( 
        <div className="container mt-5">
            <div className="container">
                <div className="row justify-content-end m-3">
                    <div className="column">
                        <div className="h1">Order finder</div>
                    </div>
                    <div className="col-5"></div>
                    <div className="column justify-content-end">
                        <NavigateButtons/>
                    </div>
                </div>
            </div>
            
            
            <div className="container">
                <InputOrder/>
            </div>
            <div className="container">
                <ListOrders/>
            </div>
        </div>
     )
}
 
export default Products;