import React, {useEffect, useState} from 'react';
import Loading from '../Loading'
import {useHistory} from 'react-router-dom';
import {ArrowLeftCircle} from 'react-feather';
import {completeOrder} from '../../lib/StitchFunctions';
import StayNeighborBrand from '../StayNeighborBrand'
import './OrderComplete.scss';

const OrderComplete = props => {
    let history = useHistory();
    const [orderUpdateStatus, setOrderUpdateStatus] = useState(null)
    const orderId = history.location.pathname.split('/').pop();

    useEffect(() => {
        if(orderUpdateStatus === null && orderId != '') orderCompletion(orderId)
    },[orderUpdateStatus])

    const orderCompletion = async () => {
        let res = await completeOrder(orderId);
        setOrderUpdateStatus(res)
    }

    if(orderUpdateStatus === null && (orderId !== '' && orderId != 'complete')) return <Loading/>

    return (
        <main className='order-complete'>
            <nav className="navbar fixed-top col-12" style={{backgroundColor: '#781CB2', paddingBottom: 15}}>
                <div className="col-12 mt-2 mr-auto">
                    <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => props.history.push('/')}/>
                    <span style={{fontSize: 18, color: 'white'}} href="#">StayNeighbor</span>
                </div>
            </nav>

            <StayNeighborBrand/>

            {orderId === '' || orderId === 'complete' ? 
                <div className="col-10 mr-auto ml-auto mt-4" >
                    <div className='col-12 text-center'>
                        <span className='lead text-center mr-auto ml-auto' style={{fontSize:'1.75rem'}}><b>Sorry, we were unable to find this order.</b></span>
                    </div>
                </div>
            : ''}

            {orderUpdateStatus && orderUpdateStatus.status === '200' ? 
                <div className="col-10 mr-auto ml-auto">
                    <div style={{marginTop: 100}}>
                        <div className='col-12'>
                            <h1 style={{marginBottom: 90}}><b>Order</b> #{orderId}</h1>
                            <div className='row'>
                                <div className='col-6'>
                                    <p><label>Status</label>: <b>{orderUpdateStatus.status}</b></p>
                                    <p><label>Message</label>: <b>{orderUpdateStatus.message}</b></p>
                                </div>
                                <div className='col-6'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            : ''}

            {orderUpdateStatus && orderUpdateStatus.status === '400' ? 
                <div className="col-10 mr-auto ml-auto">
                    <div style={{marginTop: 100}}>
                        <div className='col-12'>
                            <h1 style={{marginBottom: 90}}><b>Order</b> #{orderId}</h1>
                            <div className='row'>
                                <div className='col-6'>
                                    <p><label>Status</label>: <b>{orderUpdateStatus.status}</b></p>
                                    <p><label>Message</label>: <b>{orderUpdateStatus.message}</b></p>
                                </div>
                                <div className='col-6'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            : ''}
        </main>
    )
};

export default OrderComplete;