import React, { useState } from 'react';
import DispatchContext from './DispatchContext';
import { getOrders, getDrivers, assignOrder, updateOrderStatus, getOrder, updateOrderFields } from '../../lib/StitchFunctions';
import {toast} from 'react-toastify'

const DispatchProvider = props => {
    const [orders, setOrders] = useState(false)
    const [drivers, setDrivers] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(false)
    const [typeFilter, setTypeFilter] = useState(false)
    const [statusFilter, setStatusFilter] = useState(false)
    const [orderChanges, setOrderChanges] = useState(false)
    const [loading, setLoading] = useState(false)

    const getOrdersForDispatcher = async (notify) =>{
        try{
            const prom = await getOrders()
            if(prom.status === '200') setOrders(prom.data.sort((a, b) => a.dateCreated < b.dateCreated))
            if(notify) toast('Orders updated!')
        } catch(e){
            console.log(e)
            //set error into global state?
        }
    }

    const getDriversForDispatcher = async () => {
        try {
            const prom = await getDrivers()
            if(prom.status === '200') setDrivers(prom.data)    
            console.log(prom.data)
        } catch(e) {
            
        }
    }

    const setFormValue = (key) => {
        try {
            if(!orderChanges.enabled) {  
                if(!selectedOrder[key]) return {}
                return selectedOrder[key]
            }
            else {
                if(orderChanges[key]) return orderChanges[key]
                else {
                    if(!selectedOrder[key]) return {}
                    return selectedOrder[key]
                }
            }
        } catch (e) {

        }
    }

    const updateOrder = async () => {
        if(!orderChanges) return
        setLoading(true)
        if(orderChanges.driver === '' || orderChanges.driver) { //process driver change with assignOrder api
            let prom = await assignOrder(selectedOrder._id, orderChanges.driver.email ? orderChanges.driver.email : '')
            if(prom.status === '400') {
                toast('We had an issue updating the order. Please try again later.')
                setLoading(false)
                return
            }
        }

        if(orderChanges.status){
            let prom = await updateOrderStatus(selectedOrder._id, orderChanges.status)
            if(prom.status === '400') {
                toast('We had an issue updating the order. Please try again later.')
                setLoading(false)
                return
            }
        }

        const addressChanged = orderChanges.address ? true : false
        let newFormData = {...selectedOrder}

        Object.keys(orderChanges).forEach((key) => {
            newFormData[key] = orderChanges[key]
        })

        let updateProm = await updateOrderFields(newFormData ,addressChanged)

        if(updateProm.status === '400') {
            toast('We had an issue updating the order. Please try again later.')
            setLoading(false)
            return
        }

        toast('Order successfully updated!')
        await getOrdersForDispatcher()
        setSelectedOrder(await getOrder(selectedOrder._id))
        setLoading(false)
    }

    return (
        <DispatchContext.Provider 
            value={{
                state: {
                    // put your state that you want to expose in here
                    orders: orders,
                    selectedOrder: selectedOrder,
                    typeFilter: typeFilter,
                    statusFilter: statusFilter,
                    drivers: drivers,
                    orderChanges: orderChanges,
                    loading: loading
                },
                // expose functions here
                getOrdersForDispatcher: (bool) => getOrdersForDispatcher(bool),
                getDriversForDispatcher: () => getDriversForDispatcher(),
                setSelectedOrder: (obj) => setSelectedOrder(obj),
                setTypeFilter: (str) => setTypeFilter(str),
                setStatusFilter: (str) => setStatusFilter(str),
                setDrivers: () => setDrivers(),
                setOrderChanges: (bool) => setOrderChanges(bool),
                setFormValue: (str) => setFormValue(str),
                updateOrder: () => updateOrder()
            }}
        >
            {props.children}
        </DispatchContext.Provider>
    )
};

export default DispatchProvider;