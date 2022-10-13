import React from 'react';

import InputReg from "../components/InputProd"
import NavigateButtons from '../components/NavigateButtons';
import ListRegs from "../components/ListProds";

const Products= () => {
    return ( 
        <div className="container mt-5">
            <div className="container">
                <div className="row justify-content-end m-3">
                    <div className="column">
                        <div className="h1">Product finder</div>
                    </div>
                    <div className="col-5"></div>
                    <div className="column justify-content-end">
                        <NavigateButtons/>
                    </div>
                </div>
            </div>
            
            
            <div className="container">
                <InputReg/>
            </div>
            <div className="container">
                <ListRegs/>
            </div>
        </div>
     )
}
 
export default Products;