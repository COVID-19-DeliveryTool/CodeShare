import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { ArrowLeftCircle , LogOut , X , User , RefreshCw, Edit, Circle, PlayCircle, CheckCircle, XCircle, AlertCircle } from 'react-feather';
import {logUserOut} from '../../lib/StitchFunctions';
import {toast} from 'react-toastify';
import './OrderComplete.scss';
// import {getOrder} from '../../lib/StitchFunctions';


const OrderComplete = props => {
    let history = useHistory();
    const { checkAuthStatus, getUser, setIsAuthenticated } = props.globalContext;
    const { isAuthenticated, user, errors } = props.globalContext.state;

    const [order, setOrder] = useState({type:  'Donation', time: {value: '3pm  afternoon'}, status: 'Complete',firstName: 'Anthony', lastName:  'Vespoli',  address: '12130 W. Corrine Dr', zipcode: 21835, requestedItems: [        {"name": "eggs", "quantity": "1"},
    {"name": "bread", "quantity": "2"}], additionalInfo: 'Here is some additional info. Please leave items inside mailbox' });
    const [orderId, setOrderId] = useState(null);

    useEffect(()=>{
        console.log('history ', history);
        const orderId = history.location.pathname.split('/').pop();
        setOrderId(orderId);
    }, []); // fires initial load of component


    useEffect(() => {
        checkAuthStatus()
        if(isAuthenticated && !user) getUser()
        if(isAuthenticated && user && orderId && !order) console.log('no order') // todo impelement function getOrder(), setOrder(order) to trigger re render
    }, [isAuthenticated, user, orderId]); // fires callback any time these values are updated

    return(
        <main className='order-complete'>
            <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6F2C8E', paddingBottom: 15 }}>
                <div className="col-12 mt-2 mr-auto">
                    <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => props.history.push('/')} />
                    <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    {isAuthenticated === true && user ? <span title="Log Out" className="ml-auto float-right text-white">Welcome {user.profile.data.name}!  <LogOut onClick={() => {
                        logUserOut()
                        setIsAuthenticated(false)
                        props.history.push('/')
                        toast("You have been logged out!")
                    }} className="hover ml-2"/></span> : ''}
                </div>
            </nav>

            {order ? <div className="col-10 mr-auto ml-auto">
                <div style={{marginTop: 100}}>
                    <div className='col-12'>
                        <h1 style={{marginBottom: 90}}><b>Order</b> #{orderId}</h1>
                        <div className='row'>
                        <div className='col-6'>
                            <p><label>Type</label>: <b>{order.type}</b></p>
                            <p><label>Status</label>: <b>{order.status}</b></p>
                            <p><label>{order.type} Pick Up Time</label>: <b>{order.time.value}</b></p>
                            <p><label>First Name</label>: <b>{order.firstName}</b></p>
                            <p><label>Last Name</label>: <b>{order.lastName}</b></p>
                        </div>
                        <div className='col-6'>
                            <p><label>Address</label>: {order.address}</p>
                            <p><label>Zipcode</label>: {order.zipcode}</p>
                            <p><label>Additional Info</label>: {order.additionalInfo}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : null}

            {!isAuthenticated ? 
                <div className="text-center mr-auto ml-auto" style={{marginTop:'15rem',width:'20%'}}>
                    <div>
                        <span className="h5">Select a login partner...</span>
                    </div>
                </div>
            : ''}

            {errors.login ? 
                <div className="text-center mr-auto ml-auto" style={{marginTop:'15rem',width:'20%'}}>
                    <div>
                        <span className="h5">{errors.login}</span>
                    </div>
                </div>
            : ''}
        </main>
    )
};

export default OrderComplete;