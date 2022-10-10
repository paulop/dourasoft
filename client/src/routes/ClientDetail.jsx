import React from 'react';

import InputReg from "../components/InputReg"
import NavigateButtons from '../components/NavigateButtons';

const  ClientDetail= () => {
    return ( 
        <div>
            <h1 className="d-flex mt-2">Client finder</h1>
            <NavigateButtons/>
            <container>
                <InputReg/>
            </container>
        </div>
     );
}
 
export default ClientDetail