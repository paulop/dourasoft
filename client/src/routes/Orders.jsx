import React from 'react';

import InputOrder from "../components/InputOrder"
import NavigateButtons from '../components/NavigateButtons';
import ListOrders from "../components/ListOrders";
import ClientSearch from "../components/ClientSearch";

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

            
                    
            <div class="row">
            
                    
                <div class="col-5">
                <div className="container w-150 ml-1 mt-3">
                        <ClientSearch/>
                    </div>
                </div>
                <div class="col-6">
                <div className="container w-100">
                        <InputOrder/>
                    </div>
                </div>
            </div>
            
            
            <div className="container">
                <ListOrders/>
            </div>
        </div>
     )
}
 
export default Products;