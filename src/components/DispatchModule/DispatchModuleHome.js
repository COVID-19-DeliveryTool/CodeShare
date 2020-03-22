import React, {useEffect} from 'react'
import { ArrowLeftCircle,LogOut} from 'react-feather'
import {logUserOut} from '../../lib/StitchFunctions'
import {toast} from 'react-toastify'

export default function DispatchModuleHome(props){
    const { orders, selectedOrder } = props.dispatchContext.state
    const { getOrdersForDispatcher, setSelectedOrder } = props.dispatchContext
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
                <div className="col-12 row mr-auto ml-auto" style={{marginTop:75}}>
                    <div className="col-3">
                        <div className={{width:'100%'}}>
                            <div className="mb-2">
                                <button className="btn btn-sm btn-info mr-2">Requests</button>
                                <button className="btn btn-sm btn-secondary mr-2">Donations</button>
                                <button className="btn btn-sm btn-warning mr-2">Pending</button>
                                <button className="btn btn-sm btn-success mr-2">Assigned</button>
                                <button className="btn btn-sm btn-secondary">Completed</button>
                            </div>
                            {orders && orders.map(order => {
                                console.log(order._id, selectedOrder._id)
                                return (
                                    <li class={`list-group-item order-list ${order == selectedOrder ? 'active-order': ""}`} onClick={() => setSelectedOrder(order)}>
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group mr-2">
                                                    <label for="exampleInputEmail1"><b>Type</b></label>
                                                    <span style={{display:'block'}} className={order.type === "REQUEST" ? 'request-type' : 'donation-type'}>{order.type}</span>
                                                </div>
                                                <div className="form-group mr-2">
                                                    <label for="exampleInputEmail1"><b>Name</b></label>
                                                    <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{order.firstName} {order.lastName}</span>
                                                </div>
                                                <div className="form-group mr-2">
                                                    <label for="exampleInputEmail1"><b># in House</b></label>
                                                    <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{order.householdNum}</span>
                                                </div>
                                                <div className="form-group mr-2">
                                                    <label for="exampleInputEmail1"><b>Status</b></label>
                                                    <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{order.status}</span>
                                                </div>
                                            </div>
                                        </form>
                                    </li>
                                )
                            })}
                        </div>
                    </div>
                    <div className={selectedOrder ? "col-6" : 'col-9'}>
                        <h6>Map</h6>
                    </div>
                    
                    {selectedOrder ? 
                        <div style={{width:"20%"}} className="ml-auto">
                            <form>
                                <div className="form-row">
                                <span style={{fontWeight:'bolder'}}><u>{selectedOrder.type} Details</u></span>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-5 mr-2">
                                        <label for="exampleInputEmail1"><b>Type</b></label>
                                        <span style={{display:'block'}} className={selectedOrder.type === "REQUEST" ? 'request-type' : 'donation-type'}>{selectedOrder.type}</span>
                                    </div>
                                    <div className="form-group col-5 mr-2">
                                        <label for="exampleInputEmail1"><b>Name</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.firstName} {selectedOrder.lastName}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-5 mr-2">
                                        <label for="exampleInputEmail1"><b># in House</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.householdNum}</span>
                                    </div>
                                    <div className="form-group col-5 mr-2">
                                        <label for="exampleInputEmail1"><b>Status</b></label>
                                        <select selected={selectedOrder.status} style={{display:'block'}} >{['ASSIGNED','PENDING','COMPLETED'].map(status => {
                                            return <option selected={selectedOrder.status === status ? true : false}>{status}</option>
                                        })}</select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>Address</b></label>
                                        <span style={{display:'block'}}>{selectedOrder.address}</span>
                                    </div>
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>Zip Code</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.zipcode}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>{selectedOrder.type === 'DONATION' ? 'Pickup Time' : 'Delivery Time'}</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.dropoffTime}</span>
                                    </div>
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>Phone Number</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.phoneNumber}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>Date Created</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{new Date(selectedOrder.dateCreated).toLocaleDateString()} {new Date(selectedOrder.dateCreated).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>Phone Number</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.phoneNumber}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>Items</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.items.map(item => item.name)}</span>
                                    </div>
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>Additional Info</b></label>
                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.additionalInfo}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label for="exampleInputEmail1"><b>Assigned To</b></label>
                                        <select style={{display:'block'}} >{['','Patrick Willetts','Dillon Harless'].map(driver => {
                                            return <option>{driver}</option>
                                        })}</select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    : ''}
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