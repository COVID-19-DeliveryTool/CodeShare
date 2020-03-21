import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Home } from 'react-feather'
import { ArrowLeftCircle, Circle, CheckCircle, Plus } from 'react-feather'

export default function DonationModuleHome(props) {
    var { register, errors, clearError, handleSubmit } = useForm()
    const [step, setStep] = useState(1)
    var [loading, setLoading] = useState(false)
    var [formData, setFormData] = useState({ donatedItems: [] })

    function validateStep1(values) {
        setFormData({ ...formData, values })
        setStep(2)
    }

    function validateStep2() {
        console.log('here')
        setStep(3)
    }

    function validateStep3() {
        setTimeout(() => {
            toast('Donation submitted successfully!')
            setStep(1)
        })
    }

    var itemList = [
        { id: 1, label: 'Toilet Paper', value: 'toilet paper' },
        { id: 2, label: 'Paper Towels', value: 'paper towels' },
        { id: 3, label: 'Milk', value: 'milk' },
        { id: 4, label: 'Eggs', value: 'eggs' },
        { id: 5, label: 'Batteries - AA', value: 'batteries aa' },
        { id: 6, label: 'Batteries - AAA', value: 'batters aaa' }
    ]

    var dropoff = [
        { id: 'morning', label: 'Morning', time: '9am - 12pm' },
        { id: 'afternoon', label: 'Afternoon', time: '12pm - 4pm' },
        { id: 'evening', label: 'Evening', time: '4pm - 9pm' },
    ]

    if (step === 1) {
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    {/* <div className="col-2">
                        <Home className="mr-auto mt-2" style={{color:'white'}}/>
                    </div> */}
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3" onClick={() => props.history.push('/')} />
                        <a style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</a>
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
                                    <input ref={register({ required: true })} name='firstName' style={{ backgroundColor: "#00000017" }} type="name" className="form-control" id="inputEmail4" placeholder="First Name"></input>
                                    {errors.firstName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.firstName.message || errors.firstName.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='lastName' style={{ backgroundColor: "#00000017" }} type="text" className="form-control" id="inputPassword4" placeholder="Last Name"></input>
                                    {errors.lastName && <p style={{ color: 'red', marginBottom: 0 }}>{errors.lastName.message || errors.lastName.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='phoneNumber' style={{ backgroundColor: "#00000017" }} type="text" className="form-control" id="inputPassword4" placeholder="Phone Number"></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='emailAddress' style={{ backgroundColor: "#00000017" }} type="email" className="form-control" id="inputPassword4" placeholder="Email Address"></input>
                                    {errors.phoneNumber && <p style={{ color: 'red', marginBottom: 0 }}>{errors.phoneNumber.message || errors.phoneNumber.type}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group ml-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='streetAddress' style={{ backgroundColor: "#00000017" }} type="text" className="form-control" id="inputPassword4" placeholder="Street Address"></input>
                                    {errors.streetAddress && <p style={{ color: 'red', marginBottom: 0 }}>{errors.streetAddress.message || errors.streetAddress.type}</p>}
                                </div>
                                <div className="form-group mr-auto col-xl-4 col-md-6">
                                    <input ref={register({ required: true })} name='zipCode' style={{ backgroundColor: "#00000017" }} type="text" className="form-control" id="inputPassword4" placeholder="Zip Code"></input>
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
    console.log(formData.donatedItems)
    if (step === 2) {
        return (
            <main>
                <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                    {/* <div className="col-2">
                        <Home className="mr-auto mt-2" style={{color:'white'}}/>
                    </div> */}
                    <div className="col-12 mt-2 mr-auto">
                        <ArrowLeftCircle color="white" className="mr-3" onClick={() => setStep(1)} />
                        <a style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</a>
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
                                        var itemIndex = formData.donatedItems.findIndex(a => a.value == item.value)
                                        if (formData.donatedItems && itemIndex > -1) {
                                            var itemsList = [...formData.donatedItems]
                                            itemsList.splice(itemIndex, 1)
                                            console.log(itemsList)
                                            return <li key={item.id} onClick={() => setFormData({ ...formData, donatedItems: itemsList })} className="list-group-item"><CheckCircle className="mr-3" size={14} />{item.label}</li>
                                        } else {
                                            return (
                                                <li key={item.id} onClick={() => setFormData({ ...formData, donatedItems: [...formData.donatedItems, item] })} className="list-group-item"><Circle className="mr-3" size={14} />{item.label}</li>
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
                            {!loading && <button onClick={() => validateStep2()} type="submit" style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="btn text-center mr-auto ml-auto col-xl-6 col-12 mt-4">Continue</button>}
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
                        <a style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</a>
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
                                        return <li key={item.id} className="list-group-item"><Circle className="mr-3" size={14} />{item.label} ({item.time})</li>
                                    })}
                                </ul>
                            </div>

                            <div className="form-group col-12 mr-auto ml-auto">
                                <label>Special Instructions</label>
                                <textarea placeholder="Enter any special instructions for our driver, e.g. ring doorbell, pick up box from front desk, etc.." className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>

                        {!loading && <button type="submit" style={{ backgroundColor: "rgb(158, 69, 183)", color: 'white' }} className="btn col-12 mt-4">Continue</button>}
                    </form>
                </div>
            </main>
        )
    }
}