import React from 'react';
import {useNavigate} from "react-router-dom";

const NavigateButtons = () => {
    let navigate = useNavigate();
    

    return (
        <>
            <div className="container" >
                <div className="row justify-content-md-center">
                    <div className="h2 text-center">Navigation</div>
                </div>
                <div className="row justify-content-end">
                    <button onClick={() =>{navigate('/');}} className="btn btn-success m-1">Products</button>
                    <button onClick={() =>{navigate('/clients');}}  className="btn btn-warning m-1">Clients</button>
                    <button onClick={() =>{navigate('/orders');}}  className="btn btn-primary m-1">Orders</button>
                </div>
            </div>
        </>
    );
};

export default NavigateButtons;