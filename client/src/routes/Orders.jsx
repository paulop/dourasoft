import React from 'react';

import InputOrder from "../components/InputOrder"
import NavigateButtons from '../components/NavigateButtons';
import ListOrders from "../components/ListOrders";
import ClientSearch from "../components/ClientSearch";
import sql from '../res/sql.png';

const Products= () => {
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
                        <div className="h1">Order finder</div>
                    </div>
                    <div className="col-5"></div>
                    <div className="column justify-content-end">
                        <NavigateButtons/>
                    </div>
                </div>
            </div>              
            <div className="row">     
                <div className="col-5">
                <div className="container w-150 ml-1 mt-2">
                        <ClientSearch/>
                    </div>
                </div>
                <div className="col-6">
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