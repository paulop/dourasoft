import React from 'react';

import InputReg from "../components/InputReg"
import NavigateButtons from '../components/NavigateButtons';

const Orders= () => {
    return ( 
        <div>
            <div className="row justify-content-center m-5 ">
                <div className="column">
                    <div className="h1">Order finder</div>
                </div>
                <div className="col-5"></div>
                <div className="column justify-content-end">
                    <NavigateButtons/>
                </div>
            </div>
            <container>
                <InputReg/>
            </container>
        </div>
     )
}
 
export default Orders;