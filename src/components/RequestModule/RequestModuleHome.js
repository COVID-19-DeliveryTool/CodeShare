import React, { useState, useEffect } from 'react';
import { ArrowLeftCircle, Circle, CheckCircle, Plus, CheckSquare, Check, Square } from 'react-feather';
import fulllogo from '../../images/fulllogo.png'

const itemList = [
    { id: 1, label: 'Toilet Paper', value: 'toilet paper' },
    { id: 2, label: 'Paper Towels', value: 'paper towels' },
    { id: 3, label: 'Milk', value: 'milk' },
    { id: 4, label: 'Eggs', value: 'eggs' },
    { id: 5, label: 'Batteries - AA', value: 'batteries aa' },
    { id: 6, label: 'Batteries - AAA', value: 'batters aaa' }
];

const dropoff = [
    { id: 'morning', label: 'Morning', time: '9am - 12pm' },
    { id: 'afternoon', label: 'Afternoon', time: '12pm - 4pm' },
    { id: 'evening', label: 'Evening', time: '4pm - 9pm' },
];

export default function RequestModuleHome(props) {
    const {step, loading, formData, errors} = props.requestContext.state; // provider state values
    const { register, clearError, handleSubmit, setLoading, setFormData, setStep, validateStep1, validateStep2, validateStep3} = props.requestContext; // provider functions

    if (step == 1) {
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    {/* <div className="col-2">
                        <Home className="mr-auto mt-2" style={{color:'white'}}/>
                    </div> */}
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => props.history.push('/')} />
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
                                    <input ref={register({ required: true })} onChange={(e) => {setFormData({...formData, firstName: e.target.value})}} name='firstName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="name" className="form-control lead" id="inputEmail4" placeholder="First Name"></input>
                                    {errors.firstName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.firstName.message || errors.firstName.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} onChange={(e) => {setFormData({...formData, lastName: e.target.value})}} name='lastName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Last Name"></input>
                                    {errors.lastName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.lastName.message || errors.lastName.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} onChange={(e) => {setFormData({...formData, phoneNumber: e.target.value})}} name='phoneNumber' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Phone Number"></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} onChange={(e) => {setFormData({...formData, emailAddress: e.target.value})}} name='emailAddress' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="email" className="form-control" id="inputPassword4" placeholder="Email Address"></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} onChange={(e) => {setFormData({...formData, address: e.target.value})}} name='streetAddress' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Street Address"></input>
                                    {errors.streetAddress && <p style={{ color: 'red', marginBottom: 0 }}>{errors.streetAddress.message || errors.streetAddress.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='zipCode' onChange={(e) => {setFormData({...formData, zipcode: e.target.value})}} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Zip Code"></input>
                                    {errors.zipCode && <p style={{ color: 'red', marginBottom: 0 }}>{errors.zipCode.message || errors.zipCode.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group mr-auto ml-auto col-xl-4 col-md-8 mr-auto ml-auto text-center">
                                    <span className="text-center" style={{ fontWeight: 'bolder', fontSize: '2rem' }} type="number" id="peopleInHousehold">0</span>
                                    <input ref={register({ required: true, min: 0, max: 10 })} onChange={e => setFormData({...formData, householdNum: e.target.value})} name="peopleInHousehold" ref={register({ required: true, max: 10, min: 1 })} name='phoneNumber' type="range" defaultValue='0' onChange={(e) => document.getElementById('peopleInHousehold').innerText = e.target.value} className="custom-range" min="0" max="10" id="customRange2"></input>
                                    <label className='lead'>People in Household</label>
                                    {errors.zipCode && <p style={{ color: 'red', marginBottom: 0 }}>{errors.zipCode.message || errors.zipCode.type}</p>}
                                </div>
                            </div>

                            {!loading && <button onClick={() => validateStep1()} type="submit" style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="col-xl-8 mr-auto ml-auto col-12 btn mt-4">Continue</button>}
                        </form>
                    </div>
                </div>
            </main>
        )
    }

    if (step == 2) {
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    {/* <div className="col-2">
                        <Home className="mr-auto mt-2" style={{color:'white'}}/>
                    </div> */}
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => setStep(1)} />
                        <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    </div>
                </nav>

                <div className="col-11 mr-auto ml-auto">
                    <div className="text-center" style={{ marginTop: '5rem', color: "rgb(158, 69, 183)", fontFamily: 'sans-serif', fontSize: 28, fontWeight: 'bold' }}>
                        What can we provide?
                    </div>
                    <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 14 }}>
                        Please let us know any essential supplies you might need and our dispatchers will take it from here.
                    </div>
                    <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 10 }}>
                        <i>Please, only select things you or your ones NEED.</i>
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
                                                <li key={item.id} onClick={() => setFormData({ ...formData, items: [...formData.items, item] })} className="underline-hover list-group-item"><Square className="mr-3 brand" size={18} />{item.label}</li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-xl-6 col-12 mr-auto ml-auto">
                                <input name='firstName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="name" className="form-control" id="inputEmail4" placeholder="+ Add additional Item"></input>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className="form-group col-xl-6 col-12 mr-auto ml-auto">
                                <button className="btn btn-sm btn-outline-brand"><Plus /> Add Another</button>
                            </div>
                        </div>

                        <div className="form-row mr-auto ml-auto text-center">
                            {!loading && <button onClick={() => validateStep2()} disabled={formData && (!formData.items || (formData.items && formData.items.length === 0))}  type="submit" style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="btn text-center mr-auto ml-auto col-xl-6 col-12 mt-1">Continue</button>}
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
                    {/* <div className="col-2">
                        <Home className="mr-auto mt-2" style={{color:'white'}}/>
                    </div> */}
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => setStep(1)} />
                        <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    </div>
                </nav>

                <div className="col-xl-6 col-11 mr-auto ml-auto">
                    <div className="text-center" style={{ marginTop: '7rem', color: "rgb(158, 69, 183)", fontFamily: 'sans-serif', fontSize: 28, fontWeight: 'bold' }}>
                        Just a few more details.
                    </div>
                    <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 14 }}>
                        Now we just need some details for our drivers so they can safely deliver your supplies.
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
                                <textarea style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} onChange={e => setFormData({...formData, additionalInfo: e.target.value})} placeholder="Enter any special instructions for our driver, e.g. ring doorbell, leave at front desk, etc.." className="form-control text-black" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>

                        {!loading && <button type="submit" disabled={formData && (!formData.dropoff)} style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="btn col-12 mt-4">Continue</button>}
                    </form>
                </div>
            </main>
        )
    }

    if(step == 4){
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => {
                            setStep(1)
                            props.history.push('/')
                        }} />
                        <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    </div>
                </nav>
                <div className="col-xl-6 col-11 mr-auto ml-auto" style={{paddingTop:'8rem'}}>
                    <div className="mr-auto ml-auto text-center">
                        <img className="mr-auto ml-auto" style={{width:'25rem'}} src={fulllogo}/>
                    </div>
                    <div className="mr-auto ml-auto text-center mt-4">
                        <span className="lead" style={{fontSize:'4rem',color:"rgba(0, 0, 0, 0.42)"}}>Help is on the way.</span>
                    </div>
                    <div className="mr-auto ml-auto text-center mt-2 mb-4">
                        <span className="lead" style={{fontSize:'1.5rem',color:"rgba(0, 0, 0, 0.42)"}}>When your order is assigned to a driver, we will let you know.</span>
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