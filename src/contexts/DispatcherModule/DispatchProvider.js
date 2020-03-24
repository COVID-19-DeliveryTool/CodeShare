import React, { useState } from 'react';
import DispatchContext from './DispatchContext';
import { getOrders } from '../../lib/StitchFunctions';

const DispatchProvider = props => {
    const [orders, setOrders] = useState(false)
    const [drivers, setDrivers] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(false)
    const [typeFilter, setTypeFilter] = useState(false)
    const [statusFilter, setStatusFilter] = useState(false)

    const getOrdersForDispatcher = async () =>{
        try{
            const prom = await getOrders()
            if(prom.errorCode) return //set into global error state or local?
            setOrders(prom)
        } catch(e){
            console.log(e)
            //set error into global state?
        }
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
                    drivers: drivers
                },
                // expose functions here
                getOrdersForDispatcher: () => getOrdersForDispatcher(),
                setSelectedOrder: (obj) => setSelectedOrder(obj),
                setTypeFilter: (str) => setTypeFilter(str),
                setStatusFilter: (str) => setStatusFilter(str),
                setDrivers: () => setDrivers()
            }}
        >
            {props.children}
        </DispatchContext.Provider>
    )
};

export default DispatchProvider;