import React, { useState, useEffect } from 'react'
import { ArrowLeftCircle, Circle, CheckCircle, Plus } from 'react-feather'
import fulllogo from '../../images/fulllogo.png'
import headerLogo from '../../images/headerLogo.png'

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
    const {step, loading, formData, errors} = props.donationContext.state; // provider state values
    const { register, clearError, handleSubmit, setLoading, setFormData, setStep, validateStep1, validateStep2, validateStep3} = props.donationContext; // provider functions

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
                                    <input ref={register({ required: true })} onChange={(e) => {setFormData({...formData, firstName: e.target.value})}} name='firstName' style={{ backgroundColor: "#00000017" }} type="name" className="form-control" id="inputEmail4" placeholder="First Name"></input>
                                    {errors.firstName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.firstName.message || errors.firstName.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='lastName' onChange={(e) => setFormData({...formData, lastName: e.target.value})} style={{ backgroundColor: "#00000017" }} type="text" className="form-control" id="inputPassword4" placeholder="Last Name"></input>
                                    {errors.lastName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.lastName.message || errors.lastName.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='phoneNumber' onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} style={{ backgroundColor: "#00000017" }} type="text" className="form-control" id="inputPassword4" placeholder="Phone Number"></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='emailAddress' onChange={(e) => setFormData({...formData, emailAddress: e.target.value})} style={{ backgroundColor: "#00000017" }} type="email" className="form-control" id="inputPassword4" placeholder="Email Address"></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='streetAddress' onChange={(e) => setFormData({...formData, address: e.target.value})} style={{ backgroundColor: "#00000017" }} type="text" className="form-control" id="inputPassword4" placeholder="Street Address"></input>
                                    {errors.streetAddress && <p style={{ color: 'red', marginBottom: 0 }}>{errors.streetAddress.message || errors.streetAddress.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='zipCode' onChange={(e) => setFormData({...formData, zipcode: e.target.value})} style={{ backgroundColor: "#00000017" }} type="text" className="form-control" id="inputPassword4" placeholder="Zip Code"></input>
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

    if (step === 2) {
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    {/* <div className="col-2">
                        <Home className="mr-auto mt-2" style={{color:'white'}}/>
                    </div> */}
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
                                            console.log(itemsList)
                                            return <li key={item.id} onClick={() => setFormData({ ...formData, items: itemsList })} className="list-group-item underline-hover"><CheckCircle className="mr-3" size={14} />{item.label}</li>
                                        } else {
                                            return (
                                                <li key={item.id} onClick={() => setFormData({ ...formData, items: [...formData.items, item] })} className="list-group-item underline-hover"><Circle className="mr-3" size={14} />{item.label}</li>
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-xl-6 col-12 mr-auto ml-auto">
                                <input name='firstName' style={{ backgroundColor: "#00000017" }} type="name" className="form-control" id="inputEmail4" placeholder="+ Add additional Item"></input>
                                <button className="btn btn-sm btn-outline-success mt-3"><Plus /> Add Another</button>
                            </div>
                        </div>

                        <div className="form-row mr-auto ml-auto text-center">
                            {!loading && <button onClick={() => validateStep2()} disabled={formData && (!formData.items || (formData.items && formData.items.length === 0))} type="submit" style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="btn text-center mr-auto ml-auto col-xl-6 col-12 mt-4">Continue</button>}
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
                                        return <li key={item.id} onClick={() => setFormData({...formData, dropoff: item})} className="list-group-item underline-hover">{formData.dropoff === item ? <CheckCircle className="mr-3" size={14} /> : <Circle className="mr-3" size={14} />}{item.label} ({item.time})</li>
                                    })}
                                </ul>
                            </div>

                            <div className="form-group col-12 mr-auto ml-auto">
                                <label>Special Instructions</label>
                                <textarea onChange={e => setFormData({...formData, additionalInfo: e.target.value})} placeholder="Enter any special instructions for our driver, e.g. ring doorbell, pick up box from front desk, etc.." className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
                    {/* <div className="col-2">
                        <Home className="mr-auto mt-2" style={{color:'white'}}/>
                    </div> */}
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => props.history.push('/')} />
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
                        <button onClick={() => props.history.push('/')} className="btn btn-outline-brand btn-lg">Home</button>
                        <button onClick={() => window.location.replace('https://stayneighbor.com')} className="btn btn-outline-brand btn-lg">Learn More</button>
                    </div>
                </div>
            </main>
        )
    }
}