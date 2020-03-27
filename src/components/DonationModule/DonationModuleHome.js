import React, { useState, useEffect } from 'react'
import { ArrowLeftCircle, Circle, CheckCircle, Plus, CheckSquare, Square } from 'react-feather'
import {Modal,Spinner} from 'react-bootstrap'
import fulllogo from '../../images/fulllogo.png'

const dropoff = [
    { id: 'morning', label: 'Morning', time: '9am - 12pm' },
    { id: 'afternoon', label: 'Afternoon', time: '12pm - 4pm' },
    { id: 'evening', label: 'Evening', time: '4pm - 9pm' },
];

const itemList = [
    { id: 1, label: 'Toilet Paper', value: 'toilet paper' },
    { id: 2, label: 'Paper Towels', value: 'paper towels' },
    { id: 3, label: 'Milk', value: 'milk' },
    { id: 4, label: 'Eggs', value: 'eggs' },
    { id: 5, label: 'Batteries - AA', value: 'batteries aa' },
    { id: 6, label: 'Batteries - AAA', value: 'batters aaa' }
];

export default function DonationModuleHome(props) {
    const {step, loading, showModal, formData, errors} = props.donationContext.state; // provider state values
    const { stepOneIsValid, stepTwoIsValid, stepThreeIsValid, register, clearError, handleSubmit, setLoading, setFormData, setStep, validateStep1, validateStep2, validateStep3, setShowModal, submitDonation} = props.donationContext; // provider functions

    if (step === 1) {
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3 underline-hover" onClick={() => props.history.push('/')} />
                        <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    </div>
                </nav>
                <div className="col-10 mr-auto ml-auto">
                    <div className="text-center" style={{ marginTop: '5rem', color: "rgb(158, 69, 183)", fontFamily: 'sans-serif', fontSize: '1.75rem', fontWeight: 'bold' }}>
                        Howdy, Neighbor!
                    </div>
                    <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: '.9rem' }}>
                        Let's get started with some information.
                    </div>
                    <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 10 }}>
                        <i>While we need to share details with our volunteers, we will always keep your data private.</i>
                    </div>

                    <div style={{ marginTop: 30 }} className="text-center">
                        <form onSubmit={handleSubmit(validateStep1)}>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input onChange={(e) => {setFormData({...formData, firstName: e.target.value})}} name='firstName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="name" className="form-control" id="inputEmail4" placeholder="First Name" value={formData.firstName}></input>
                                    {errors.firstName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.firstName.message || errors.firstName.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input name='lastName' onChange={(e) => setFormData({...formData, lastName: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Last Name" value={formData.lastName}></input>
                                    {errors.lastName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.lastName.message || errors.lastName.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input name='phoneNumber' onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Phone Number" value={formData.phoneNumber}></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input name='emailAddress' onChange={(e) => setFormData({...formData, emailAddress: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Email Address" value={formData.emailAddress}></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input name='streetAddress' onChange={(e) => setFormData({...formData, address: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Street Address" value={formData.address}></input>
                                    {errors.streetAddress && <p style={{ color: 'red', marginBottom: 0 }}>{errors.streetAddress.message || errors.streetAddress.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input name='zipCode' onChange={(e) => setFormData({...formData, zipcode: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Zip Code" value={formData.zipcode}></input>
                                    {errors.zipCode && <p style={{ color: 'red', marginBottom: 0 }}>{errors.zipCode.message || errors.zipCode.type}</p>}
                                </div>
                            </div>

                            {!loading && <button onClick={() => validateStep1()} disabled={stepOneIsValid()} type="submit" style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="col-xl-8 mr-auto btn-primary-hover ml-auto col-12 btn mt-4">Continue</button>}
                        </form>
                    </div>
                </div>
            </main>
        )
    }

    if (step === 2) {
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3 underline-hover" onClick={() => setStep(1)} />
                        <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    </div>
                </nav>

                <div className="col-11 mr-auto ml-auto">
                    <div className="text-center" style={{ marginTop: '5rem', color: "rgb(158, 69, 183)", fontFamily: 'sans-serif', fontSize: 28, fontWeight: 'bold' }}>
                        What can you donate?
                    </div>
                    <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 14 }}>
                        Please let us know any supplies you can donate and our dispatchers will take it from here.
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }} className="col-10 mr-auto ml-auto">
                    <form>
                        <div className="form-row mr-auto ml-auto">
                            <div className="form-group col-xl-6 col-12 mr-auto ml-auto">
                                <ul className="list-group list-group-flush">
                                    {itemList.map(item => {
                                        var itemIndex = formData.items.findIndex(a => a.value == item.value)
                                        if (formData.items && itemIndex > -1) {
                                            var itemsList = [...formData.items]
                                            itemsList.splice(itemIndex, 1)
                                            return <li key={item.id} onClick={() => setFormData({ ...formData, items: itemsList })} className="list-group-item underline-hover"><CheckSquare className="mr-3 brand" size={18} />{item.label}</li>
                                        } else {
                                            return (
                                                <li key={item.id} onClick={() => setFormData({ ...formData, items: [...formData.items, item] })} className="ml-1 list-group-item underline-hover"><Square className="mr-3 brand" size={18} />{item.label}</li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-xl-6 col-12 mr-auto ml-auto">
                                <input name='firstName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="name" className="form-control" id="inputEmail4" placeholder="+ Add additional Item"></input>
                                <button className="btn btn-sm btn-outline-brand mt-3"><Plus /> Add Another</button>
                            </div>
                        </div>

                        <div className="form-row mr-auto ml-auto text-center">
                            {!loading && <button onClick={() => validateStep2()} disabled={stepTwoIsValid()} type="submit" style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="btn btn-primary-hover text-center mr-auto ml-auto col-xl-6 col-12 mt-4">Continue</button>}
                        </div>

                    </form>
                </div>
            </main>
        )
    }

    if (step === 3) {
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3" onClick={() => setStep(1)} />
                        <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    </div>
                </nav>

                <div className="col-xl-6 col-11 mr-auto ml-auto">
                    <div className="text-center" style={{ marginTop: '7rem', color: "rgb(158, 69, 183)", fontFamily: 'sans-serif', fontSize: 28, fontWeight: 'bold' }}>
                        Just a few more details.
                    </div>
                    <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 14 }}>
                        Now we just need some details for our drivers so they can safely pick up your donations.
                    </div>
                </div>

                <div style={{ marginTop: 50 }} className="col-xl-6 col-10 mr-auto ml-auto">
                    <form onSubmit={handleSubmit(validateStep3)}>
                        <div className="form-row">
                            <span>DROPOFF TIME</span>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-12 mr-auto ml-auto">
                                <ul className="list-group list-group-flush">
                                    {dropoff.map(item => {
                                        return <li key={item.id} onClick={() => setFormData({...formData, dropoff: item})} className="list-group-item underline-hover">{formData.dropoff === item ? <CheckCircle className="mr-3 brand" size={18} /> : <Circle className="mr-3 brand" size={18} />}{item.label} ({item.time})</li>
                                    })}
                                </ul>
                            </div>

                            <div className="form-group col-12 mr-auto ml-auto">
                                <label>Special Instructions</label>
                                <textarea onChange={e => setFormData({...formData, additionalInfo: e.target.value})} style={{backgroundColor: "rgba(158, 69, 183, 0.14)"}} placeholder="Enter any special instructions for our driver, e.g. ring doorbell, pick up box from front desk, etc.." className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>

                        {!loading && <button type="submit" disabled={stepThreeIsValid()} className="btn btn-primary-hover col-12 mt-4">Continue</button>}
                    </form>
                </div>
                <Modal style={{paddingTop:75}} size='lg' show={showModal} onHide={() => {}}>
                    <Modal.Body style={{borderTop:'10px solid #6f2c8e'}}>
                        <div className="col-12 text-center">
                            <span style={{fontSize:20,fontWeight:600,color:"#6f2c8e",letterSpacing:'.025rem'}}>Confirm your donation.</span>
                        </div>
                        
                        <div className="col-12 row" style={{marginTop:25}}>
                            <div className="col-12 col-xl-5 mr-auto ml-auto">
                                <div className="border-bottom pb-1 row">
                                    <div className='col-6 mr-0 lead' style={{fontSize:15,fontWeight:'600'}}>Your Info</div>
                                    <div onClick={() => {
                                        setStep(1)
                                        setShowModal(false)
                                        }} className="col-6 text-right ml-0 lead hover" style={{color:'#6f2c8e',fontSize:13,fontWeight:'600'}}>Edit</div>
                                </div>
                                <div>
                                    <li className="lead" style={{listStyleType:'none',fontSize:14}}>{formData.firstName} {formData.lastName}</li>
                                    <li className="mb-1 lead" style={{listStyleType:'none',fontSize:14}}>{formData.address}</li>
                                    <li className="mb-3 lead" style={{listStyleType:'none',fontSize:14}}>{formData.zipcode}</li>
                                    <li className="lead" style={{listStyleType:'none',fontSize:14}}>{formData.phoneNumber}</li>
                                    <li className="lead" style={{listStyleType:'none',fontSize:14}}>{formData.emailAddress}</li>
                                </div>
                            </div>
                            <div className="col-12 col-xl-5 mr-auto ml-auto">
                                <div className="border-bottom pb-1 row">
                                    <div className='col-6 mr-0 lead' style={{fontSize:15,fontWeight:'600'}}>Items</div>
                                    <div onClick={() => {
                                        setStep(2)
                                        setShowModal(false)
                                        }} className="col-6 text-right ml-0 lead hover" style={{color:'#6f2c8e',fontSize:13,fontWeight:'600'}}>Edit</div>
                                </div>
                                <div>
                                    {formData.items.map(item => {
                                        return (
                                            <li className="ml-3 lead" style={{fontSize:14}}>{item.value}</li>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 row" style={{marginTop:25}}>
                            <div className="col-12 col-xl-5 mr-auto ml-auto">
                                <div className="border-bottom row pb-1">
                                    <div className='col-6 mr-0 lead' style={{fontSize:15,fontWeight:'600'}}>Pick Up Time</div>
                                    <div onClick={() => {
                                        setStep(3)
                                        setShowModal(false)
                                        }} className="col-6 text-right ml-0 lead hover" style={{color:'#6f2c8e',fontSize:13,fontWeight:'600'}}>Edit</div>
                                </div>
                                <div>
                                    <li className="lead" style={{listStyleType:'none',fontSize:14}}>{formData.dropoff ? `${formData.dropoff.label} (${formData.dropoff.time})` : ''}</li>
                                </div>
                            </div>
                            <div className="col-5 mr-auto ml-auto"></div>
                        </div>
                        <div className="col-12 mr-auto ml-auto mt-4 text-center">
                            {!loading && <button onClick={submitDonation} className="btn col-12 btn-primary-hover" type="button">Send My Donation</button>}
                            {loading && <button className="btn col-12 btn-primary-hover" type="button">
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </button>}
                            <span className="text-center mr-auto ml-auto">Please note our pickups are contactless, we will pickup the items from you specify</span>
                        </div>
                    </Modal.Body>
                </Modal>
            </main>
        )
    }

    if(step == 4){
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    {/* <div className="col-2">
                        <Home className="mr-auto mt-2" style={{color:'white'}}/>
                    </div> */}
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => {
                            props.history.push('/')
                            setStep(1)
                        }} />
                        <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    </div>
                </nav>
                <div className="col-xl-6 col-11 mr-auto ml-auto" style={{paddingTop:'8rem'}}>
                    <div className="mr-auto ml-auto text-center">
                        <img className="mr-auto ml-auto" style={{width:'25rem'}} src={fulllogo}/>
                    </div>
                    <div className="mr-auto ml-auto text-center mt-4">
                        <span className="lead" style={{fontSize:'4rem',color:"rgba(0, 0, 0, 0.42)"}}>Thank you!</span>
                    </div>
                    <div className="mr-auto ml-auto text-center mt-2 mb-4">
                        <span className="lead" style={{fontSize:'2.0rem',color:"rgba(0, 0, 0, 0.42)"}}>Words cannot express our gratitude.</span>
                    </div>
                    <div className="mr-auto ml-auto text-center mt-2 mb-4">
                        <span className="lead" style={{fontSize:'1.5rem',color:"rgba(0, 0, 0, 0.42)"}}>A driver will pickup your order and ensure it reaches someone in need.</span>
                    </div>
                    <div className="mr-auto ml-auto text-center mt-2 mb-4">
                        <button onClick={() => {
                            props.history.push('/')
                            setStep(1)
                        }} className="btn btn-outline-brand btn-lg">Home</button>
                        <button onClick={() => window.location.replace('https://stayneighbor.com')} className="btn btn-outline-brand btn-lg">Learn More</button>
                    </div>
                </div>
            </main>
        )
    }
}