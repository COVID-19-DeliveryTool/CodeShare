import React, {useEffect} from 'react'
import MarkerInfoWindowGmapsObj from '../GoogleMaps/MarkerInfoWindowGmapsObj'
import { ArrowLeftCircle,LogOut,X,User,CheckCircle,ShoppingCart} from 'react-feather'
import {logUserOut} from '../../lib/StitchFunctions'
import {toast} from 'react-toastify'

export default function DispatchModuleHome(props){
    const { orders, selectedOrder, typeFilter, statusFilter } = props.dispatchContext.state
    const { getOrdersForDispatcher, setSelectedOrder, setTypeFilter, setStatusFilter } = props.dispatchContext
    var { isAuthenticated, user } = props.globalContext.state
    var { checkAuthStatus, getUser, setIsAuthenticated } = props.globalContext
    var filteredOrders = []

    useEffect(() => {
        checkAuthStatus()
        if(isAuthenticated) getUser()
        if(isAuthenticated && user && !orders) getOrdersForDispatcher()
    }, [isAuthenticated, user, orders])

    function applyFilters(orders){
        console.log(typeFilter, statusFilter)
        if(typeFilter) orders = orders.filter(a => a.type === typeFilter)
        if(statusFilter) orders = orders.filter(a => a.status === statusFilter)
        return orders
    }

    if(orders) filteredOrders = applyFilters(orders)

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

            {isAuthenticated && user && orders ? 
                <div className="col-12 row mr-auto" style={{marginTop:75}}>
                    <div style={{paddingLeft:0,paddingRight:0,width:'20%'}}>
                        <div className={{width:'100%',height:"100%"}}>
                            <div style={{paddingLeft:'1.50rem'}}>
                                <label style={{width:'100%',fontSize:'.9rem'}} className="mb-0 pb-0 ml-2 lead">Order Type</label>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => setTypeFilter('REQUEST')} type="button" class={`${typeFilter === 'REQUEST' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Requests ({filteredOrders.filter(a => a.type === 'REQUEST').length})</button>
                                    <button onClick={() => setTypeFilter('DONATION')} type="button" class={`${typeFilter === 'DONATION' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Donations ({filteredOrders.filter(a => a.type === 'DONATION').length})</button>
                                    <X onClick={() => setTypeFilter(false)} style={{marginTop:'.75rem',color:"grey"}} className="hover ml-1"/>
                                </div>
                            </div>
                            <div style={{paddingLeft:'1.50rem'}}>
                                <label style={{width:'100%',fontSize:'.9rem'}} className="mb-0 pb-0 ml-2 lead">Order Status</label>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => setStatusFilter('PENDING')} type="button" class={`${statusFilter === 'PENDING' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Pending ({filteredOrders.filter(a => a.status === 'PENDING').length})</button>
                                    <button onClick={() => setStatusFilter('ASSIGNED')} class={`${statusFilter === 'ASSIGNED' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Assigned ({filteredOrders.filter(a => a.type === 'ASSIGNED').length})</button>
                                    <button onClick={() => setStatusFilter('COMPLETED')} class={`${statusFilter === 'COMPLETED' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Completed ({filteredOrders.filter(a => a.type === 'COMPLETED').length})</button>
                                    <X onClick={() => setStatusFilter(false)} style={{marginTop:'.75rem',color:"grey"}} className="hover ml-1"/>
                                </div>
                            </div>
                            <div style={{paddingLeft:-50,paddingRight:0,borderRight:"2px solid black"}} className="mt-2">
                                {orders && filteredOrders.map(order => {
                                    return (
                                        <li style={{fontSize:12,paddingLeft:'1.5rem',paddingRight:5,paddingBottom:'.25rem'}} class={`list-group-item order-list text-center ${order == selectedOrder ? 'active-order': ""}`} onClick={() => setSelectedOrder(order)}>
                                            <form>
                                                <div className="form-row" style={{paddingTop:'.25rem'}}>
                                                    <div className="form-group col-3 mr-2">
                                                        {/* <label for="exampleInputEmail1" className="lead" style={{fontSize:'1.1rem'}}>Type</label> */}
                                                        <span style={{display:'block',fontSize:'.9rem'}} className={order.type === "REQUEST" ? 'request-type' : 'donation-type'}>{order.type}</span>
                                                    </div>
                                                    <div className="form-group col-4 mr-2">
                                                        {/* <label for="exampleInputEmail1" className="lead" style={{fontSize:'.9rem'}}><b>Name</b></label> */}
                                                        <span type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{order.firstName} {order.lastName}</span>
                                                    </div>
                                                    {/* <div className="form-group col-2 mr-2">
                                                        <label for="exampleInputEmail1"><b>People</b></label>
                                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{order.householdNum}</span>
                                                    </div> */}
                                                    <div className="form-group col-3 mr-2">
                                                        {/* <label for="exampleInputEmail1" className="lead" style={{fontSize:'.9rem'}}><b>Status</b></label> */}
                                                        <span type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{order.status}</span>
                                                    </div>
                                                </div>
                                            </form>
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={selectedOrder ? "col-7" : 'col-9'}>
                        <MarkerInfoWindowGmapsObj setSelectedOrder={setSelectedOrder} orders={filteredOrders} selectedOrder={selectedOrder}/>
                    </div>
                    
                    {selectedOrder ? 
                        <div style={{width:"20%",fontSize:12}} className="ml-auto pl-2">
                            <form className="col-12 mr-auto ml-auto">
                                <div className="form-row">
                                    <label style={{width:'100%',fontSize:'1.2rem',letterSpacing:'.03rem'}} className="mb-2 pb-0 lead"><u>{selectedOrder.type} Details</u></label>
                                    {/* <span style={{fontWeight:'bolder'}}><u>{selectedOrder.type} Details</u></span> */}
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2">
                                        <label for="exampleInputEmail1" className="lead" style={{fontSize:'.9rem'}}><b>Type</b></label>
                                        <span style={{display:'block',fontSize:'.9rem'}} className={selectedOrder.type === "REQUEST" ? 'request-type lead mt-1' : 'donation-type lead mt-1'}>{selectedOrder.type}</span>
                                    </div>
                                    <div className="form-group mr-2">
                                        <label for="exampleInputEmail1" className="lead" style={{fontSize:'.9rem'}}><b>Name</b></label>
                                        <span className="lead" type="email" style={{display:'block'}} aria-describedby="emailHelp">{selectedOrder.firstName} {selectedOrder.lastName}</span>
                                    </div>
                                    <div className="form-group mr-2">
                                        {/* <label for="exampleInputEmail1"><b># in House</b></label> */}
                                        <User/>
                                        <span className="ml-2 lead mt-2" type="email" style={{display:'block',fontSize:"1.0rem"}} aria-describedby="emailHelp">{selectedOrder.householdNum}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} or="exampleInputEmail1"><b>Assigned To</b></label>
                                        <select style={{display:'block'}} >{['','Patrick Willetts','Dillon Harless'].map(driver => {
                                            return <option>{driver}</option>
                                        })}</select>
                                    </div>
                                    <div className="form-group col-5 mr-2">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Status</b></label>
                                        <select selected={selectedOrder.status} style={{display:'block'}} >{['ASSIGNED','PENDING','COMPLETED'].map(status => {
                                            return <option selected={selectedOrder.status === status ? true : false}>{status}</option>
                                        })}</select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Address</b></label>
                                        <span className='lead' style={{display:'block', fontSize:'.9rem'}}>{selectedOrder.address}</span>
                                    </div>
                                    <div className='lead' className="form-group mr-2 col-5">
                                        <label className="lead" style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Zip Code</b></label>
                                        <span className='lead' type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{selectedOrder.zipcode}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>{selectedOrder.type === 'DONATION' ? 'Pickup Time' : 'Delivery Time'}</b></label>
                                        <span className='lead' type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{selectedOrder.dropoffTime}</span>
                                    </div>
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Phone Number</b></label>
                                        <span className='lead' type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{selectedOrder.phoneNumber}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Date Created</b></label>
                                        <span type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{new Date(selectedOrder.dateCreated).toLocaleDateString()} {new Date(selectedOrder.dateCreated).toLocaleTimeString()}</span>
                                    </div>
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Phone Number</b></label>
                                        <span type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{selectedOrder.phoneNumber}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Items</b></label>
                                        <span type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{selectedOrder.items.map(item => item.name)}</span>
                                    </div>
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Additional Info</b></label>
                                        <span type="email" style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp">{selectedOrder.additionalInfo}</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    : ''}
                </div> 
            
            : ''}

            {!isAuthenticated ? 
                <div className="text-center mr-auto ml-auto" style={{marginTop:'15rem',width:'20%'}}>
                    <div>
                        <span className="h5">Select a login partner...</span>
                    </div>
                </div>
            : ''}
        </main>
    )
}