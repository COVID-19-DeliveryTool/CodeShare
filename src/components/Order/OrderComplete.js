import React, {useEffect, useState} from 'react';
import queryString from 'query-string'
import {Spinner} from 'react-bootstrap'
import Loading from '../Loading'
import MenuBar from '../MenuBar'
import {completeOrder} from '../../lib/StitchFunctions';
import StayNeighborBrand from '../StayNeighborBrand'
import './OrderComplete.scss';
import {toast} from 'react-toastify'

const OrderComplete = props => {
    const [requestIds, setRequestIds] = useState(null)
    const [loading, setLoading] = useState(false)
    const [orderUpdateStatus, setOrderUpdateStatus] = useState(false)

    const orderCompletion = async () => {
        let res = await completeOrder(requestIds.orderId, requestIds.did)
        if(res.status === '200'){
            setLoading(false)
            toast('Order Completed!')
            setOrderUpdateStatus(true)
        } else {
            setLoading(false)
            toast(res.message)
            setOrderUpdateStatus(false)
        } 
    }

    useEffect(() => {
        if(requestIds === null) getRequestIds()
    })

    function getRequestIds(){
        var queryParams = queryString.parse(window.location.search)
        if(!queryParams.orderId || !queryParams.did) setRequestIds(false)
        else setRequestIds(queryParams)
    }

    if(requestIds === null) return <Loading/>

    return (
        <main className='order-complete'>
            <MenuBar/>
            <StayNeighborBrand/>

            {requestIds === false ? 
                <div className="col-10 mr-auto ml-auto">
                    <div className='col-12 mt-4'>
                        <div className='col-6 mr-auto ml-auto text-center lead'>
                            <span>We're sorry, we had trouble loading this order.  Please verify the link and try again.</span>
                        </div>
                        <div className='col-6'>
                        </div>
                    </div>
                </div>
            : ''}

            {requestIds.orderId && requestIds.did && !orderUpdateStatus ? 
                <div className="col-10 mr-auto ml-auto">
                    <div className='col-12 mt-4 pt-4'>
                        <div className='col-6 mr-auto ml-auto text-center lead'>
                            <span>Please click the buttom below to mark the order as complete.  The recipient will receive a confirmation email.</span>
                        </div>
                    </div>
                    <div className="col-12 mt-4 pt-4">
                        {!loading && 
                            <div className='col-6 mr-auto ml-auto text-center'>
                                <button onClick={() => {
                                    setLoading(true)
                                    orderCompletion()
                                }} type="button" className="btn btn-lg btn-outline-brand">Complete Order</button>
                            </div>
                        }
                        {loading &&
                            <div className='col-6 mr-auto ml-auto text-center'>
                                <button type="button" className="btn btn-lg btn-outline-brand">
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            : ''}

            {orderUpdateStatus ? 
                <div className="col-10 mr-auto ml-auto">
                    <div className='col-12 mt-4 pt-4'>
                        <div className='col-6 mr-auto ml-auto text-center lead'>
                            <span>Order completed succesfully!</span>
                        </div>
                    </div>
                    <div className="col-12 row mt-4 pt-4">
                        <div className='col-6 mr-auto ml-auto text-center'>
                            <button onClick={() => {
                                window.location.replace('https://app.stayneighbor.com')
                            }} type="button" className="btn btn-lg btn-outline-brand">Home</button>
                        </div>
                        <div className='col-6 mr-auto ml-auto text-center'>
                            <button onClick={() => {
                                window.location.replace('https://stayneighbor.com')
                            }} type="button" className="btn btn-lg btn-outline-brand">Learn More</button>
                        </div>
                    </div>
                </div>
            : ''}
        </main>
    )
};

export default OrderComplete;