import React, { useState, useEffect } from 'react';
import MenuBar from '../MenuBar'
import ItemList from '../ItemList'
import OrderDropOffTime from '../Order/OrderDropOffTime'
import { ArrowLeftCircle} from 'react-feather';
import OrderCompleteLandingPage from '../Order/OrderCompleteLandingPage'

export default function RequestModuleHome(props) {
    const {step, loading, formData, errors, showModal} = props.requestContext.state; // provider state values
    const { setShowModal, submitRequest, stepOneIsValid, stepTwoIsValid, stepThreeIsValid, setLoading, setFormData, setStep, validateStep1, validateStep2, validateStep3, setErrors} = props.requestContext; // provider functions

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
                        <form>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input maxLength="15" required={true} onChange={(e) => {setFormData({...formData, firstName: e.target.value})}} name='firstName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="name" value={formData.firstName} className="form-control lead" id="inputEmail4" placeholder="First Name"></input>
                                    {errors.firstName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.firstName.message || errors.firstName.type}</p>}
                                </div>
                                <div  className="form-group mr-auto col-xl-4 col-md-6">
                                    <input maxLength="15" required={true} onChange={(e) => {setFormData({...formData, lastName: e.target.value})}} name='lastName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" value={formData.lastName} className="form-control" id="inputPassword4" placeholder="Last Name"></input>
                                    {errors.lastName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.lastName.message || errors.lastName.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input maxLength="12" required={true} onChange={(e) => {setFormData({...formData, phoneNumber: e.target.value})}} name='phoneNumber' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" value={formData.phoneNumber} className="form-control" id="inputPassword4" placeholder="Phone Number"></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                                <div  className="form-group mr-auto col-xl-4 col-md-6">
                                    <input maxLength="30" required={true} onChange={(e) => {setFormData({...formData, emailAddress: e.target.value})}} name='emailAddress' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" value={formData.emailAddress} className="form-control" id="inputPassword4" placeholder="Email Address"></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input maxLength="75" required={true} onChange={(e) => {setFormData({...formData, address: e.target.value})}} name='streetAddress' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" value={formData.address} className="form-control" id="inputPassword4" placeholder="Address"></input>
                                    {errors.address && <p style={{ color: 'red', marginBottom: 0 }}>{errors.address.message || errors.address.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input maxLength="6" required={true} name='zipCode' onChange={(e) => {setFormData({...formData, zipcode: e.target.value})}} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" value={formData.zipcode} className="form-control" id="inputPassword4" placeholder="Zip Code"></input>
                                    {errors.zipCode && <p style={{ color: 'red', marginBottom: 0 }}>{errors.zipCode.message || errors.zipCode.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group mr-auto ml-auto col-xl-4 col-md-8 mr-auto ml-auto text-center">
                                    <span className="text-center" style={{ fontWeight: 'bolder', fontSize: '2rem' }} type="number" id="peopleInHousehold">{formData.householdNum}</span>
                                    <input required={true} onChange={e => setFormData({...formData, householdNum: e.target.value})} name="peopleInHousehold" name='phoneNumber' type="range" value={formData.householdNum} onChange={(e) => {
                                        document.getElementById('peopleInHousehold').innerText = e.target.value
                                        setFormData({...formData, householdNum: e.target.value})
                                     }} className="custom-range" min="1" max="10" id="customRange2"></input>
                                    <label className='lead'>People in Household</label>
                                    {errors.zipCode && <p style={{ color: 'red', marginBottom: 0 }}>{errors.zipCode.message || errors.zipCode.type}</p>}
                                </div>
                            </div>

                            {!loading && <button onClick={validateStep1} type="button" disabled={stepOneIsValid()} className="col-xl-8 col-12 mr-auto ml-auto btn mt-4 btn-primary-hover">Continue</button>}
                        </form>
                    </div>
                </div>
            </main>
        )
    }

    if (step == 2) {
        return (
            <main>
                <MenuBar setStep={setStep} goBackTo={1}/>
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
                <ItemList formData={formData} stepTwoIsValid={stepTwoIsValid} setFormData={setFormData} setStep={setStep} validateStep2={validateStep2} setLoading={setLoading} {...props}/>
            </main>
        )
    }

    if (step === 3) return <OrderDropOffTime type={'request'} setStep={setStep} validateStep3={validateStep3} setFormData={setFormData} formData={formData} stepThreeIsValid={stepThreeIsValid} showModal={showModal} setShowModal={setShowModal} submitRequest={submitRequest} loading={loading} errors={errors} setErrors={setErrors}/>

    if(step == 4) return <OrderCompleteLandingPage setStep={setStep} type={'request'}/>
}