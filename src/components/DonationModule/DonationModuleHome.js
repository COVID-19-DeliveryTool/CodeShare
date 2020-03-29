import React from 'react'
import OrderDropOffTime from '../Order/OrderDropOffTime'
import { ArrowLeftCircle} from 'react-feather'
import OrderCompleteLandingPage from '../Order/OrderCompleteLandingPage'
import MenuBar from '../MenuBar'
import ItemList from '../ItemList'

export default function DonationModuleHome(props) {
    const {step, loading, showModal, formData, errors} = props.donationContext.state; // provider state values
    const { stepOneIsValid, stepTwoIsValid, stepThreeIsValid, setLoading, setFormData, setStep, validateStep1, validateStep2, validateStep3, setShowModal, submitDonation, setErrors} = props.donationContext; // provider functions

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
                        <form>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input maxLength="15" onChange={(e) => {setFormData({...formData, firstName: e.target.value})}} name='firstName' style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="name" className="form-control" id="inputEmail4" placeholder="First Name" value={formData.firstName}></input>
                                    {errors.firstName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.firstName.message || errors.firstName.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input maxLength="15" name='lastName' onChange={(e) => setFormData({...formData, lastName: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Last Name" value={formData.lastName}></input>
                                    {errors.lastName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.lastName.message || errors.lastName.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input maxLength="12" name='phoneNumber' onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Phone Number" value={formData.phoneNumber}></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input maxLength="25" name='emailAddress' onChange={(e) => setFormData({...formData, emailAddress: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Email Address" value={formData.emailAddress}></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input maxLength="30" name='streetAddress' onChange={(e) => setFormData({...formData, address: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Street Address" value={formData.address}></input>
                                    {errors.streetAddress && <p style={{ color: 'red', marginBottom: 0 }}>{errors.streetAddress.message || errors.streetAddress.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input maxLength="6" name='zipCode' onChange={(e) => setFormData({...formData, zipcode: e.target.value})} style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} type="text" className="form-control" id="inputPassword4" placeholder="Zip Code" value={formData.zipcode}></input>
                                    {errors.zipCode && <p style={{ color: 'red', marginBottom: 0 }}>{errors.zipCode.message || errors.zipCode.type}</p>}
                                </div>
                            </div>

                            {!loading && <button onClick={() => validateStep1()} disabled={stepOneIsValid()} type="button" style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="col-xl-8 mr-auto btn-primary-hover ml-auto col-12 btn mt-4">Continue</button>}
                        </form>
                    </div>
                </div>
            </main>
        )
    }

    if (step === 2) return (
        <main>
            <MenuBar goBackTo={1}/>
            <div className="col-11 mr-auto ml-auto">
                <div className="text-center" style={{ marginTop: '5rem', color: "rgb(158, 69, 183)", fontFamily: 'sans-serif', fontSize: 28, fontWeight: 'bold' }}>
                    What can you donate?
                </div>
                <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 14 }}>
                    Please let us know any supplies you can donate and our dispatchers will take it from here.
                </div>
            </div>
            <ItemList formData={formData} stepTwoIsValid={stepTwoIsValid} setFormData={setFormData} setStep={setStep} validateStep2={validateStep2} setLoading={setLoading} {...props}/>
        </main>
        
    )

    if (step === 3) return <OrderDropOffTime type={'donation'} setStep={setStep} validateStep3={validateStep3} setFormData={setFormData} formData={formData} stepThreeIsValid={stepThreeIsValid} showModal={showModal} setShowModal={setShowModal} submitRequest={submitDonation} loading={loading} errors={errors} setErrors={setErrors}/>

    if(step == 4) return <OrderCompleteLandingPage {...props} setStep={setStep} type={'donation'}/>
}