import React, { useState } from 'react';
import DispatchContext from './DispatchContext';
import { getOrders } from '../../lib/StitchFunctions';

const DispatchProvider = props => {
    const [orders, setOrders] = useState(false)

    const getOrdersForDispatcher = async () =>{
        try{
            const prom = await getOrders()
            if(prom.errorCode) return //set into global error state or local?
            setOrders(prom)
        } catch(e){
            //set error into global state?
        }
    } 

    return (
        <DispatchContext.Provider 
            value={{
                state: {
                    // put your state that you want to expose in here
                    orders: orders
                },
                // expose functions here
                getOrdersForDispatcher: () => getOrdersForDispatcher()
            }}
        >
            {props.children}
        </DispatchContext.Provider>
    )
};

export default DispatchProvider;