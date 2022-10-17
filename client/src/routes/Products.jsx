import React from 'react';

import InputReg from "../components/InputProd"
import NavigateButtons from '../components/NavigateButtons';
import ListRegs from "../components/ListProds";
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