import React, {useEffect} from 'react'
import { ArrowLeftCircle,LogOut} from 'react-feather'
import {logUserOut} from '../../lib/StitchFunctions'
import {toast} from 'react-toastify'

export default function DispatchModuleHome(props){
    console.log(props)
    const { orders } = props.dispatchContext.state
    const { getOrdersForDispatcher } = props.dispatchContext
    var { isAuthenticated, user } = props.globalContext.state
    var { checkAuthStatus, getUser, setIsAuthenticated } = props.globalContext

    useEffect(() => {
        checkAuthStatus()
        if(isAuthenticated) getUser()
        if(isAuthenticated && user && !orders) getOrdersForDispatcher()
    }, [isAuthenticated, user, orders])

    return (
        <main>
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

            {isAuthenticated && user ? 
            
            <div className="col-12 row mr-auto ml-auto" style={{marginTop:60}}>
                <div className="col-3">
                    <h6>List</h6>
                    <div>
                        {orders && orders.map(order => {
                            return (
                                <span>{order.firstName} {order.lastName}</span>
                            )
                        })}
                    </div>
                </div>
                <div className="col-6">
                    <h6>Map</h6>
                </div>
                <div className="col-3">
                    <h6>Details</h6>
                </div>
            </div> 
            
            : ''}

            {!isAuthenticated ? 
                <div className="col-6 text-center mr-auto ml-auto" style={{marginTop:'15rem'}}>
                    <div>
                        <span className="h5">Select a login partner...</span>
                    </div>
                </div>
            : ''}
        </main>
    )
}