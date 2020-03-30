import React, {useEffect} from 'react'
import Loading from '../Loading'
import ConfirmChangesModal from './ConfirmChangesModal'
import MarkerInfoWindowGmapsObj from '../GoogleMaps/MarkerInfoWindowGmapsObj'
import { ArrowLeftCircle , LogOut , X  , RefreshCw, Circle, PlayCircle, CheckCircle, XCircle, AlertCircle } from 'react-feather'
import {logUserOut} from '../../lib/StitchFunctions'
import {Spinner} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {differenceInHours, differenceInDays, differenceInMinutes} from 'date-fns'
import LoginError from '../LoginError'

export default function DispatchModuleHome(props){
    const { orders, selectedOrder, typeFilter, statusFilter, orderChanges, drivers, loading, showConfirmModal } = props.dispatchContext.state
    const { getOrdersForDispatcher, setSelectedOrder, setTypeFilter, setStatusFilter, setOrderChanges, getDriversForDispatcher, setFormValue, setShowConfirmModal } = props.dispatchContext
    var { isAuthenticated, user, errors } = props.globalContext.state
    var { checkAuthStatus, getUser, setIsAuthenticated } = props.globalContext
    var filteredOrders = []

    useEffect(() => {
        checkAuthStatus()
        if(isAuthenticated && user === null) getUser()
        if(isAuthenticated && user && !orders) getOrdersForDispatcher()
        if(isAuthenticated && user && orders && !drivers) getDriversForDispatcher()
    })

    if(errors.login) return <LoginError/>

    if(!user || !orders || !drivers) return <Loading/>

    function applyFilters(orders){
        if(typeFilter) orders = orders.filter(a => a.type === typeFilter)
        if(statusFilter.length > 0) orders = orders.filter(a => statusFilter.includes(a.status))
        return orders
    }

    function deriveDriverName(driver){
        if(!selectedOrder){
            if(driver.name === '') return true
        }

        if(selectedOrder && selectedOrder.assignedToDriver === driver.email){
            return true
        }

        return false
    }

    function timeSince(date){
        var hoursSince = differenceInHours(new Date(), new Date(date))
        if(hoursSince < 1) return `${differenceInMinutes(new Date(), new Date(date))} minutes ago`
        if(hoursSince > 24) return `${differenceInDays(new Date(), new Date(date))} days ago`
        return `${hoursSince} hours ago`
    }

    function addRemoveFilter(status){
        var statusIndex = statusFilter.findIndex(a => a === status)
        if(statusIndex > -1){
            var filters = [...statusFilter]
            filters.splice(statusIndex, 1)
            setStatusFilter(filters)
        } else {
            setStatusFilter([...statusFilter, status])
        }
    }

    if(orders) filteredOrders = applyFilters(orders)

    return (
        <main>
            <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#781CB2', paddingBottom: 15 }}>
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
                <div className="col-12 d-flex pl-0 flex-wrap" style={{marginTop:60,maxHeight:'50vh'}}>
                    <div className="col-12 col-md-4 col-xl-3" style={{paddingLeft:20,paddingRight:20}}>
                        <div className={{width:'100%'}}>
                            <div className="form-row border-bottom" style={{paddingBottom:5}}>
                                <span className="pb-0 lead pt-1 pb-1">Order Filters</span>
                            </div>
                            <div>
                                <label style={{width:'100%',fontSize:'.9rem'}} className="mb-0 pb-0 ml-2 lead">Type</label>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => setTypeFilter(typeFilter === 'REQUEST' ? '' : 'REQUEST')} type="button" className={`${typeFilter === 'REQUEST' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Requests</button>
                                    <button onClick={() => setTypeFilter(typeFilter === 'DONATION' ? '' : 'DONATION')} type="button" className={`${typeFilter === 'DONATION' ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}>Donations</button>
                                    <X onClick={() => setTypeFilter(false)} style={{marginTop:'.40rem',color:"grey"}} className="hover ml-1"/>
                                </div>
                            </div>
                            <div>
                                <label style={{width:'100%',fontSize:'.9rem'}} className="mb-0 pb-0 ml-2 lead">Status</label>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => addRemoveFilter('PENDING')} type="button" className={`${statusFilter.includes('PENDING') ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}><Circle/></button>
                                    <button onClick={() => addRemoveFilter('IN PROGRESS')} className={`${statusFilter.includes('IN PROGRESS') ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}><PlayCircle/></button>
                                    <button onClick={() => addRemoveFilter('COMPLETED')} className={`${statusFilter.includes('COMPLETED') ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}><CheckCircle/></button>
                                    <button onClick={() => addRemoveFilter('CANCELLED')} className={`${statusFilter.includes('CANCELLED') ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}><XCircle/></button>
                                    <button onClick={() => addRemoveFilter('ERROR/ACTION')} className={`${statusFilter.includes('ERROR/ACTION') ? 'btn-active-brand' : ''} btn btn-sm btn-outline-brand mr-0`} style={{fontSize:'.8rem'}}><AlertCircle/></button>
                                    <X onClick={() => setStatusFilter([])} style={{marginTop:'.40rem',color:"grey"}} className="hover ml-1"/>
                                </div>
                            </div>
                            <div className="form-row border-bottom" style={{paddingBottom:5}}>
                                <span className="pb-0 lead pt-1 pb-1">Order List</span>
                                <RefreshCw onClick={() => getOrdersForDispatcher(true)} className="hover brand" style={{marginTop:'.40rem',marginLeft:'1rem'}}/>
                            </div>
                            <div style={{maxHeight:'60vh',overflowY:'auto'}} className="mt-2">
                                {orders && filteredOrders.length > 0 && filteredOrders.map(order => {
                                    return (
                                        <li key={order._id.toString()} style={{fontSize:12,paddingRight:0,paddingBottom:'.25rem'}} className={`d-flex list-group-item order-list text-center pl-0 pr-0 pt-2 pb-1 ${selectedOrder._id ? order._id.toString() === selectedOrder._id.toString() ? 'active-order': "" : ''}`} onClick={() => {
                                            setSelectedOrder(order)
                                            setOrderChanges(false)
                                        }}>
                                            <span className={order.type === "REQUEST" ? 'request-type ml-1 mr-1' : 'donation-type  ml-1 mr-1'}>{order.type.charAt(0).toUpperCase()}</span>
                                            <span className="ml-2 mt-2 text-left" style={{width:'33%'}}>{order.status}</span>
                                            <span className="ml-2 mt-2 text-left" style={{width:'33%'}}>{order.firstName} {order.lastName}</span>
                                            <span className="ml-2 mt-2 text-left" style={{width:'33%'}}>{timeSince(order.dateCreated)}</span>
                                        </li>
                                    )
                                })}
                                {orders && filteredOrders.length === 0 ? 
                                    <span className="col-10 mr-auto ml-auto lead">No orders found.</span>
                                : ''}
                            </div>
                        </div>
                    </div>
                    <div style={{paddingTop:20}} className={selectedOrder ? 'col-xl-6 col-md-6' : 'col-xl-9 col-md-8'}>
                        <MarkerInfoWindowGmapsObj setSelectedOrder={setSelectedOrder} orders={filteredOrders} selectedOrder={selectedOrder}/>
                    </div>
                    
                    {selectedOrder ? 
                        <div className="col-12 col-sm-12 col-xl-3 col-md-2" style={{fontSize:12,paddingLeft:0,paddingRight:0}}>
                            <form className="col-12">
                                <div className="form-row border-bottom d-flex flex-nowrap" style={{paddingBottom:5}}>
                                    <span className="pb-0 lead pt-1 pb-1">{selectedOrder.type.charAt(0)}{selectedOrder.type.slice(1).toLowerCase()} Details</span>
                                    <span className="ml-auto mt-2"><X className="hover" onClick={() => {
                                        setSelectedOrder(false)
                                        setOrderChanges(false)
                                    }}/></span>
                                </div>
                                <div className="form-row row pr-0 pl-0" style={{paddingTop:10}}>
                                    <div className="form-group col-12 col-xl-6 mb-1 mt-1">
                                        <label className="lead mb-0" style={{fontSize:'.9rem'}}><b>Type</b></label>
                                        <span style={{display:'block',fontSize:'.9rem'}} className={selectedOrder.type === "REQUEST" ? 'request-type-details lead' : 'donation-type-details lead'}>{selectedOrder.type}</span>
                                    </div>
                                    <div className="form-group col-12 col-xl-6">
                                        <label htmlFor="exampleInputEmail1" className="lead mb-0" style={{fontSize:'.9rem'}}><b>Name</b></label>
                                        <span className="lead" type="email" style={{display:'block',fontWeight:400}} aria-describedby="emailHelp">{selectedOrder.firstName} {selectedOrder.lastName}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12 col-xl-6 mb-0">
                                        <label className='lead label-half text-secondary' style={{fontSize:'.9rem'}} or="exampleInputEmail1"><b>Assigned To</b></label>
                                        {orderChanges.enabled ? 
                                            <select onChange={(e) => setOrderChanges({...orderChanges, driver: e.target.value === '' ? '' : JSON.parse(e.target.value)})} disabled={orderChanges.enabled ? false : true} className={orderChanges.enabled ? 'custom-select lead' : 'custom-select no-border lead'} style={{display:'block',fontSize:14}} >{drivers && [{name: ''}, ...drivers].map(driver => {
                                                return <option key={driver.id} value={driver.email === '' ? '' : JSON.stringify(driver)} selected={deriveDriverName(driver)}>{driver.name}</option>
                                            })}</select>
                                        : 
                                            <span style={{display:'block',fontWeight:600,fontSize:'1rem'}} className={'lead'}>{drivers.find(a => a.email === setFormValue('assignedToDriver')) ? drivers.find(a => a.email === setFormValue('assignedToDriver')).name : ''}</span>
                                        }
                                    </div>
                                    <div className="form-group col-12 col-xl-6 mb-0">
                                        <label className='lead label-half text-secondary' style={{fontSize:'.9rem'}} htmlFor="exampleInputEmail1"><b>Status</b></label>
                                        {orderChanges.enabled ? 
                                            <select onChange={e => setOrderChanges({...orderChanges, status: e.target.value})} disabled={orderChanges.enabled ? false : true} className={orderChanges.enabled ? 'custom-select lead ' : 'custom-select no-border lead'} style={{display:'block',fontSize:'1rem'}} >{['PENDING','IN PROGRESS','COMPLETED','CANCELLED','ERROR/ACTION'].map(status => {
                                                return <option selected={setFormValue('status') === status ? true : false}>{status}</option>
                                            })}</select>
                                        : 
                                            <span style={{display:'block',fontWeight:600,fontSize:'1rem'}} className={'lead'}>{setFormValue('status')}</span>
                                        }
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12 col-xl-6 mb-0">
                                        <label className='lead label-half text-secondary' style={{fontSize:'.9rem'}} htmlFor="exampleInputEmail1"><b>Address</b></label>
                                        <input onChange={e => setOrderChanges({...orderChanges, address: e.target.value})} className={orderChanges.enabled ? 'lead form-control' : 'lead form-control no-border'} disabled={orderChanges.enabled ? false : true} style={{display:'inline',fontWeight:600,width:200,wordWrap:'break-word'}} value={setFormValue('address')}></input>
                                    </div>
                                    <div className="lead form-group col-12 col-xl-6 mb-0">
                                        <label className="lead label-half text-secondary" style={{fontSize:'.9rem'}} htmlFor="exampleInputEmail1"><b>Zip Code</b></label>
                                        {orderChanges.enabled ? 
                                            <select onChange={e => setOrderChanges({...orderChanges, zipcode: e.target.value})} disabled={orderChanges.enabled ? false : true} className={orderChanges.enabled ? 'custom-select lead' : 'custom-select no-border lead'} style={{fontWeight:600,color:'black'}} >{user.customData.zipcodes.sort().map(zipcode => {
                                                return <option selected={setFormValue('zipcode') === zipcode ? true : false}>{zipcode}</option>
                                            })}</select>
                                        : 
                                            <span style={{display:'block',fontWeight:600,fontSize:'1rem'}} className={'lead'}>{setFormValue('zipcode')}</span>
                                        }
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12 col-xl-6 mb-0">
                                        <label className='lead label-half text-secondary' style={{fontSize:'.9rem'}} htmlFor="exampleInputEmail1"><b>{selectedOrder.type === 'DONATION' ? 'Pickup Time' : 'Delivery Time'}</b></label>
                                        {orderChanges.enabled ? 
                                            <select onChange={e => setOrderChanges({...orderChanges, time: e.target.value})} disabled={orderChanges.enabled ? false : true} className={orderChanges.enabled ? 'custom-select text-dark lead' : 'custom-select no-border text-dark lead'} style={{display:'block',fontSize:'1rem'}} >{['morning', 'afternoon', 'evening'].map(time => {
                                                return <option selected={setFormValue('time') === time ? true : false}>{time.charAt(0).toUpperCase()}{time.slice(1)}</option>
                                            })}</select>
                                        : 
                                            <span style={{display:'block',fontWeight:600,fontSize:'1rem'}} className={'lead'}>{setFormValue('time').charAt(0).toUpperCase()}{setFormValue('time').slice(1)}</span>
                                        }
                                    </div>
                                    <div className="form-group col-12 col-xl-6 mb-0">
                                        <label className='lead label-half text-secondary' style={{fontSize:'.9rem'}} htmlFor="exampleInputEmail1"><b>Phone Number</b></label>
                                        <input onChange={e => setOrderChanges({...orderChanges, phoneNumber: e.target.value})} className={orderChanges.enabled ? 'form-control text-dark' : 'form-control no-border text-dark'} type="text" disabled={orderChanges.enabled ? false : true} style={{fontWeight:600,display:'block'}} aria-describedby="emailHelp" value={setFormValue('phoneNumber')}></input>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12 col-xl-6 mb-0">
                                        <label className='lead label-half text-secondary' style={{fontSize:'.9rem'}} htmlFor="exampleInputEmail1"><b>Date Created</b></label>
                                        <input type="text" className={orderChanges.enabled ? 'form-control text-dark' : 'form-control no-border text-dark'} disabled={true} style={{fontWeight:600,display:'block'}} aria-describedby="emailHelp" defaultValue={`${new Date(selectedOrder.dateCreated).toLocaleDateString()} ${new Date(selectedOrder.dateCreated).toLocaleTimeString()}`}></input>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-12 mb-0">
                                        <label className='lead label-half text-secondary' style={{fontSize:'.9rem'}} htmlFor="exampleInputEmail1"><b>Items</b></label>
                                        <ul className="list-group flex-md-row flex-wrap ml-3">
                                            {selectedOrder.items.map((item, index) => {
                                                return (
                                                    <li key={index} className="context-list lead" style={{width:'50%',fontWeight:600,fontSize:'1rem'}}>{item.name}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-row mt-2">
                                    <div className="form-group col-12">
                                        <label className='lead text-secondary' style={{fontSize:'.9rem'}} htmlFor="exampleInputEmail1"><b>Additional Info</b></label>
                                        <textarea onChange={e => setOrderChanges({...orderChanges, additionalInfo: e.target.value})} className={orderChanges.enabled ? 'form-control' : 'form-control no-border'} type="text" disabled={orderChanges.enabled ? false : true} style={{fontWeight:600,display:'block',fontSize:'.9rem',width:'100%'}} aria-describedby="emailHelp" value={selectedOrder.additionalInfo}></textarea>
                                    </div>
                                </div>
                                <div className="form-row pl-0">
                                    <div className="form-group col-12">
                                        {orderChanges.enabled && Object.keys(orderChanges).length > 1 && !loading && <button type="button" className="btn btn-outline-brand col-12 ml-0 mr-0" onClick={() => setShowConfirmModal(true)}>Save Order</button>}
                                        {orderChanges.enabled && loading &&  
                                            <button type="button" className="btn btn-outline-brand col-12 ml-0 mr-0">
                                                <Spinner animation="border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                            </button>
                                        }
                                        {orderChanges.enabled && <button type="button" className="btn btn-outline-brand col-12 ml-0 mr-0" onClick={() => setOrderChanges(false)}>Cancel</button>}
                                        {!orderChanges.enabled && <button type="button" className="btn btn-outline-brand col-12 ml-0 mr-0" onClick={() => setOrderChanges({enabled: true})}>Edit Order</button>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    : ''}
                </div>
            : ''}

            {showConfirmModal ? 
                <ConfirmChangesModal {...props}/>
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