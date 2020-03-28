import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {ArrowLeftCircle} from 'react-feather';
import {completeOrder} from '../../lib/StitchFunctions';
import './OrderComplete.scss';

const OrderComplete = props => {
    let history = useHistory();
    const {checkAuthStatus, getUser, setIsAuthenticated} = props.globalContext;
    const {isAuthenticated, user, errors} = props.globalContext.state;

    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);
    const orderId = history.location.pathname.split('/').pop();

    useEffect(() => {
        if (orderId) {
            orderCompletion(orderId);
        }
    }, [orderId]); // fires callback any time these values are updated

    const orderCompletion = async () => {

        let res = await completeOrder(orderId);

        if (!res || res.status !== '200') {
            setStatus('FAILED');
            setMessage(res.message);
        } else {
            setStatus('COMPLETED');
            setMessage('Completed Successfully');
        }
    };

    return (
        <main className='order-complete'>
            <nav className="navbar fixed-top col-12" style={{backgroundColor: '#6F2C8E', paddingBottom: 15}}>
                <div className="col-12 mt-2 mr-auto">
                    <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => props.history.push('/')}/>
                    <span style={{fontSize: 18, color: 'white'}} href="#">StayNeighbor</span>
                </div>
            </nav>


            <div className="col-10 mr-auto ml-auto">
                <div style={{marginTop: 100}}>
                    <div className='col-12'>
                        <h1 style={{marginBottom: 90}}><b>Order</b> #{orderId}</h1>
                        <div className='row'>
                            <div className='col-6'>
                                <p><label>Status</label>: <b>{status}</b></p>
                                <p><label>Message</label>: <b>{message}</b></p>
                            </div>
                            <div className='col-6'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
};

export default OrderComplete;