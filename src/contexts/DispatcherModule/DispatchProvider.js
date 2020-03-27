import React, { useState } from 'react';
import DispatchContext from './DispatchContext';
import { getOrders, getDrivers, assignOrder, updateOrderStatus, getOrder } from '../../lib/StitchFunctions';
import {toast} from 'react-toastify'

const DispatchProvider = props => {
    const [orders, setOrders] = useState(false)
    const [drivers, setDrivers] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(false)
    const [typeFilter, setTypeFilter] = useState(false)
    const [statusFilter, setStatusFilter] = useState(false)
    const [orderChanges, setOrderChanges] = useState(false)

    const getOrdersForDispatcher = async (notify) =>{
        try{
            const prom = await getOrders()
            if(prom.status === '200') setOrders(prom.data)
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
        if(orderChanges.driver === '' || orderChanges.driver) { //process driver change with assignOrder api
            var prom = await assignOrder(selectedOrder._id, orderChanges.driver.id ? orderChanges.driver.id : '')
            if(prom.status === '400') {
                console.log(prom)
            } else {
                console.log(prom)
            }
        }

        if(orderChanges.status){
            var prom = await updateOrderStatus(selectedOrder._id, orderChanges.status)
            if(prom.status === '400') {

            }
        }


        toast('Order successfully updated!')
        await getOrdersForDispatcher()
        setSelectedOrder(await getOrder(selectedOrder._id))
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
                    orderChanges: orderChanges
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