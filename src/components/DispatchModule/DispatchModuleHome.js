import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import MarkerInfoWindowGmapsObj from '../GoogleMaps/MarkerInfoWindowGmapsObj'
import { ArrowLeftCircle , LogOut , X , User , RefreshCw, Edit } from 'react-feather'
import {logUserOut} from '../../lib/StitchFunctions'
import {toast} from 'react-toastify'

export default function DispatchModuleHome(props){
    const { orders, selectedOrder, typeFilter, statusFilter, orderChanges, drivers } = props.dispatchContext.state
    const { getOrdersForDispatcher, setSelectedOrder, setTypeFilter, setStatusFilter, setOrderChanges, getDriversForDispatcher, setFormValue } = props.dispatchContext
    var { isAuthenticated, user, errors } = props.globalContext.state
    var { checkAuthStatus, getUser, setIsAuthenticated } = props.globalContext
    var filteredOrders = []

    useEffect(() => {
        checkAuthStatus()
        if(isAuthenticated && !user) getUser()
        if(isAuthenticated && user && !orders) getOrdersForDispatcher()
        if(isAuthenticated && user && orders && !drivers) getDriversForDispatcher()
    }, [isAuthenticated, user, orders, drivers])

    if(!user || !orders || !drivers) return <div>Loading</div>

    function applyFilters(orders){
        if(typeFilter) orders = orders.filter(a => a.type === typeFilter)
        if(statusFilter) orders = orders.filter(a => a.status === statusFilter)
        return orders
    }

    if(orders) filteredOrders = applyFilters(orders)
    console.log(user)
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
                <div className="col-12 row" style={{marginTop:75,maxHeight:'50vh'}}>
                    <div style={{paddingLeft:0,paddingRight:0}} className="col-3">
                        <div className={{width:'100%'}}>
                            <div style={{paddingLeft:'1.50rem'}}>
                                <label style={{width:'100%',fontSize:'.9rem'}} className="mb-0 pb-0 ml-2 lead">Order Type</label>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => setTypeFilter(typeFilter === 'REQUEST' ? '' : 'REQUEST')} type="button" class={`${typeFilter === 'REQUEST' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Requests ({filteredOrders.filter(a => a.type === 'REQUEST').length})</button>
                                    <button onClick={() => setTypeFilter(typeFilter === 'DONATION' ? '' : 'DONATION')} type="button" class={`${typeFilter === 'DONATION' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Donations ({filteredOrders.filter(a => a.type === 'DONATION').length})</button>
                                    <X onClick={() => setTypeFilter(false)} style={{marginTop:'.75rem',color:"grey"}} className="hover ml-1"/>
                                    <RefreshCw onClick={getOrdersForDispatcher} className="hover" style={{marginTop:'.75rem',marginLeft:'.50rem'}}/>
                                </div>
                            </div>
                            <div style={{paddingLeft:'1.50rem'}}>
                                <label style={{width:'100%',fontSize:'.9rem'}} className="mb-0 pb-0 ml-2 lead">Order Status</label>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => setStatusFilter(statusFilter === 'PENDING' ? '' : 'PENDING')} type="button" class={`${statusFilter === 'PENDING' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Pending ({filteredOrders.filter(a => a.status === 'PENDING').length})</button>
                                    <button onClick={() => setStatusFilter(statusFilter === 'ASSIGNED' ? '' : 'ASSIGNED')} class={`${statusFilter === 'ASSIGNED' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Assigned ({filteredOrders.filter(a => a.type === 'ASSIGNED').length})</button>
                                    <button onClick={() => setStatusFilter(statusFilter === 'COMPLETED' ? '' : 'COMPLETED')} class={`${statusFilter === 'COMPLETED' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Completed ({filteredOrders.filter(a => a.type === 'COMPLETED').length})</button>
                                    <X onClick={() => setStatusFilter(false)} style={{marginTop:'.75rem',color:"grey"}} className="hover ml-1"/>
                                </div>
                            </div>
                            <div style={{maxHeight:'70vh',paddingLeft:-50,paddingRight:0,borderRight:"2px solid black",overflowY:'auto'}} className="mt-2">
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
                    <div className={selectedOrder ? "col-6" : 'col-9'}>
                        <MarkerInfoWindowGmapsObj setSelectedOrder={setSelectedOrder} orders={filteredOrders} selectedOrder={selectedOrder}/>
                    </div>
                    
                    {selectedOrder ? 
                        <div className="col-3" style={{fontSize:12,paddingLeft:0,paddingRight:0}}>
                            <form className="col-12">
                                <div className="form-row border-bottom" style={{paddingBottom:5}}>
                                    <span className="mb-2 pb-0 lead">{selectedOrder.type.charAt(0)}{selectedOrder.type.slice(1).toLowerCase()} Details</span>
                                    <span className="ml-auto mt-2"><X className="hover"/></span>
                                </div>
                                <div className="form-row row pr-0 pl-0" style={{paddingTop:10}}>
                                    <div className="form-group col-12 col-xl-6">
                                        <label className="lead" for="exampleInputEmail1" style={{fontSize:'.9rem'}}><b>Type</b></label>
                                        <span style={{display:'block',fontSize:'.9rem'}} className={selectedOrder.type === "REQUEST" ? 'request-type lead' : 'donation-type lead'}>{selectedOrder.type}</span>
                                    </div>
                                    <div className="form-group col-12 col-xl-6">
                                        <label for="exampleInputEmail1" className="lead" style={{fontSize:'.9rem'}}><b>Name</b></label>
                                        <span className="lead" type="email" style={{display:'block',fontWeight:400}} aria-describedby="emailHelp">{selectedOrder.firstName} {selectedOrder.lastName}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label className='lead' style={{fontSize:'.9rem'}} or="exampleInputEmail1"><b>Assigned To</b></label>
                                        <select onChange={(e) => setOrderChanges({...orderChanges, driver: JSON.parse(e.target.value)})} disabled={orderChanges.enabled ? false : true} className="custom-select input-sm" style={{display:'block'}} >{drivers && [{name: ''}, ...drivers].map(driver => {
                                            return <option value={driver.name === '' ? false : JSON.stringify(driver)} selected={setFormValue('driver').id === driver.id ? true : false}>{driver.name}</option>
                                        })}</select>
                                    </div>
                                    <div className="form-group col-6">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Status</b></label>
                                        <select onChange={e => setOrderChanges({...orderChanges, status: e.target.value})} disabled={orderChanges.enabled ? false : true} className="custom-select" style={{display:'block'}} >{['ASSIGNED','PENDING','COMPLETED'].map(status => {
                                            return <option selected={setFormValue('status') === status ? true : false}>{status}</option>
                                        })}</select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-6">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Address</b></label>
                                        <input onChange={e => setOrderChanges({...orderChanges, address: e.target.value})} className={orderChanges.enabled ? 'lead form-control' : 'lead form-control no-border'} disabled={orderChanges.enabled ? false : true} style={{display:'block', fontSize:'.9rem'}} value={setFormValue('address')}></input>
                                    </div>
                                    <div className='lead' className="form-group col-6">
                                        <label className="lead" style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Zip Code</b></label>
                                        <select onChange={e => setOrderChanges({...orderChanges, status: e.target.value})} disabled={orderChanges.enabled ? false : true} className="custom-select" style={{display:'block'}} >{user.customData.zipcodes.map(zipcode => {
                                            return <option selected={setFormValue('zipcode') === zipcode ? true : false}>{zipcode}</option>
                                        })}</select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>{selectedOrder.type === 'DONATION' ? 'Pickup Time' : 'Delivery Time'}</b></label>
                                        <select onChange={e => setOrderChanges({...orderChanges, time: e.target.value})} disabled={orderChanges.enabled ? false : true} className="custom-select" style={{display:'block'}} >{['morning', 'afternoon', 'evening'].map(time => {
                                            return <option selected={setFormValue('time') === time ? true : false}>{time}</option>
                                        })}</select>
                                    </div>
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Phone Number</b></label>
                                        <input onChange={e => setOrderChanges({...orderChanges, phoneNumber: e.target.value})} className='lead form-control' type="text" disabled={orderChanges.enabled ? false : true} style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp" value={setFormValue('phoneNumber')}></input>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Date Created</b></label>
                                        <input type="text" className='lead form-control' disabled={true} style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp" defaultValue={`${new Date(selectedOrder.dateCreated).toLocaleDateString()} ${new Date(selectedOrder.dateCreated).toLocaleTimeString()}`}></input>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-5">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Items</b></label>
                                        <input type="text" disabled={orderChanges.enabled ? false : true} style={{display:'block',fontSize:'.9rem'}} aria-describedby="emailHelp" defaultValue={selectedOrder.items.map(item => item.name)}></input>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-12">
                                        <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Additional Info</b></label>
                                        <textarea type="text" disabled={orderChanges.enabled ? false : true} style={{display:'block',fontSize:'.9rem',width:'100%'}} aria-describedby="emailHelp" defaultValue={selectedOrder.additionalInfo}></textarea>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group mr-2 col-12 mr-auto ml-auto">
                                        {/* <label className='lead' style={{fontSize:'.9rem'}} for="exampleInputEmail1"><b>Items</b></label> */}
                                        {orderChanges.enabled && <button type="button" className="btn btn-outline-brand col-12">Save Order</button>}
                                        {!orderChanges.enabled && <button type="button" className="btn btn-outline-brand col-12" onClick={() => setOrderChanges({enabled: true})}>Edit Order</button>}
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

            {errors.login ? 
                <div className="text-center mr-auto ml-auto" style={{marginTop:'15rem',width:'20%'}}>
                    <div>
                        <span className="h5">{errors.login}</span>
                    </div>
                </div>
            : ''}
        </main>
    )
}