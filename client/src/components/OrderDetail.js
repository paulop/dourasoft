import React, {useState} from 'react';

const OrderDetail= ({ord}) => {

    const [customer_id, setCustomerId] = useState(ord.customer_id);
    const [date, setDate] = useState(ord.date);
    const [status, setStatus] = useState(ord.status);
    const [total, setTotal] = useState(ord.total);

    const setData = async (e) => {
        e.preventDefault();
        try {
            const body = {customer_id, date, status, total};
            //console.log(body);
            const options = {
                method: 'PUT',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            };
            const response = await fetch(`http://localhost:3001/orders/api/v1/ord/${String(ord.id)}`, options);
            console.log(response);
            // temporary solution for refresh page
            window.location.reload();
        } catch (error) {
            
        }

    }

    return (
        <>
            <div className="container">
            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#myModal">
                Detail
            </button>

            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                
                    <div className="modal-header">
                    <h3 className="modal-title">Modal Heading</h3>
                    <button type="button" className="close" data-dismiss="modal">×</button>
                    </div>
                    
                    <div className="modal-body">
                    <h3>Some text to enable scrolling..</h3>
                    <p>Some text to enable scrolling.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    
                    <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                    
                </div>
                </div>
            </div>
            </div>

        </>

    );
        
};

export default OrderDetail;