import React, {useEffect} from 'react'
import { ArrowLeftCircle,LogOut,X,User} from 'react-feather'
import {logUserOut} from '../../lib/StitchFunctions'
import {toast} from 'react-toastify'

export default function DispatchModuleHome(props){
    const { orders, selectedOrder, typeFilter, statusFilter } = props.dispatchContext.state
    const { getOrdersForDispatcher, setSelectedOrder, setTypeFilter, setStatusFilter } = props.dispatchContext
    var { isAuthenticated, user } = props.globalContext.state
    var { checkAuthStatus, getUser, setIsAuthenticated } = props.globalContext

    useEffect(() => {
        checkAuthStatus()
        if(isAuthenticated) getUser()
        if(isAuthenticated && user && !orders) getOrdersForDispatcher()
    }, [isAuthenticated, user, orders])

    function applyFilters(orders){
        if(typeFilter) orders = orders.filter(a => a.type === typeFilter)
        if(statusFilter) orders = orders.filter(a => a.status === statusFilter)
        return orders
    }

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
                <div className="col-12 row mr-auto ml-auto" style={{marginTop:75}}>
                    <div className="col-3" style={{paddingLeft:0,paddingRight:0}}>
                        <div className={{width:'100%'}}>
                            <div>
                                <label style={{width:'100%',fontSize:'.9rem'}} className="mb-0 pb-0 ml-2 lead">Order Type</label>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => setTypeFilter('REQUEST')} type="button" class={`${typeFilter === 'REQUEST' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Requests ({orders.filter(a => a.type === 'REQUEST').length})</button>
                                    <button onClick={() => setTypeFilter('DONATION')} type="button" class={`${typeFilter === 'DONATION' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Donations ({orders.filter(a => a.type === 'DONATION').length})</button>
                                    <X onClick={() => setTypeFilter(false)} style={{marginTop:'.75rem',color:"grey"}} className="hover ml-1"/>
                                </div>
                            </div>
                            <div>
                                <label style={{width:'100%',fontSize:'.9rem'}} className="mb-0 pb-0 ml-2 lead">Order Status</label>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => setStatusFilter('PENDING')} type="button" class={`${statusFilter === 'PENDING' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Pending ({orders.filter(a => a.status === 'PENDING').length})</button>
                                    <button onClick={() => setStatusFilter('ASSIGNED')} class={`${statusFilter === 'ASSIGNED' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Assigned ({orders.filter(a => a.type === 'ASSIGNED').length})</button>
                                    <button onClick={() => setStatusFilter('COMPLETED')} class={`${statusFilter === 'COMPLETED' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Completed ({orders.filter(a => a.type === 'COMPLETED').length})</button>
                                    <X onClick={() => setStatusFilter(false)} style={{marginTop:'.75rem',color:"grey"}} className="hover ml-1"/>
                                </div>
                            </div>
                            <div style={{maxHeight:'80vh',overflowY:'auto',paddingLeft:0,paddingRight:0}} className="mt-2">
                                {orders && applyFilters(orders).map(order => {
                                    return (
                                        <li style={{fontSize:12,paddingLeft:5,paddingRight:5}} class={`list-group-item order-list ${order == selectedOrder ? 'active-order': ""}`} onClick={() => setSelectedOrder(order)}>
                                            <form>
                                                <div className="form-row">
                                                    <div className="form-group col-3 mr-2">
                                                        <label for="exampleInputEmail1"><b>Type</b></label>
                                                        <span style={{display:'block'}} className={order.type === "REQUEST" ? 'request-type' : 'donation-type'}>{order.type}</span>
                                                    </div>
                                                    <div className="form-group col-4 mr-2">
                                                        <label for="exampleInputEmail1"><b>Name</b></label>
                                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{order.firstName} {order.lastName}</span>
                                                    </div>
                                                    {/* <div className="form-group col-2 mr-2">
                                                        <label for="exampleInputEmail1"><b>People</b></label>
                                                        <span type="email" style={{display:'block'}} aria-describedby="emailHelp">{order.householdNum}</span>
                                                    </div> */}
                                                    <div className="form-group col-3 mr-2">
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
                    </div>
                    <div className={selectedOrder ? "col-6" : 'col-9'}>
                        <h6>Map</h6>
                    </div>
                    
                    {selectedOrder ? 
                        <div style={{width:"20%",fontSize:12}} className="ml-auto pl-2">
                            <form>
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
                                <div className="form-row">
                                    
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