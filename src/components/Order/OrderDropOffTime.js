import React from 'react'
import MenuBar from '../MenuBar'
import {CheckCircle,Circle} from 'react-feather'
import {dropoff} from '../../data/orders.js'
import OrderConfirmationModal from './OrderConfirmationModal'

export default function OrderDropOffTime(props){
    const {setStep, validateStep3, setFormData, formData, loading, stepThreeIsValid, showModal, setShowModal, submitRequest, type, errors} = props

    return (
        <main>
            <MenuBar {...props} goBackTo={2}/>
            {type==='donation' && <div className="col-xl-6 col-11 mr-auto ml-auto">
                <div className="text-center" style={{ marginTop: '7rem', color: "rgb(158, 69, 183)", fontFamily: 'sans-serif', fontSize: 28, fontWeight: 'bold' }}>
                    Just a few more details.
                </div>
                <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 14 }}>
                    Now we just need some details for our drivers so they can safely deliver your supplies.
                </div>
            </div>}

            {type==='request' && <div className="col-xl-6 col-11 mr-auto ml-auto">
                <div className="text-center" style={{ marginTop: '7rem', color: "rgb(158, 69, 183)", fontFamily: 'sans-serif', fontSize: 28, fontWeight: 'bold' }}>
                    Just a few more details.
                </div>
                <div className="text-center lead" style={{ marginTop: '.3rem', fontFamily: 'sans-serif', fontSize: 14 }}>
                    Now we just need some details for our drivers so they can safely make the delivery.
                </div>
            </div>}

            <div style={{ marginTop: 50 }} className="col-xl-6 col-10 mr-auto ml-auto">
                <form>
                    <div className="form-row">
                        <span>{type==='donation' ? "DONATION" : "DELIVERY"} TIME</span>
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
                            <textarea maxLength="500" style={{ backgroundColor: "rgba(158, 69, 183, 0.14)" }} onChange={e => setFormData({...formData, additionalInfo: e.target.value})} placeholder="Enter any special instructions for our driver, e.g. ring doorbell, leave at front desk, etc.." value={formData.additionalInfo} className="form-control text-black" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <button type="button" onClick={validateStep3} disabled={stepThreeIsValid()} className="btn w-100 mt-4 btn-primary-hover">Continue</button>
                    </div>
                </form>
            </div>
            <OrderConfirmationModal errors={errors} showModal={showModal} setStep={setStep} setShowModal={setShowModal} formData={formData} type={type} loading={loading} submitRequest={submitRequest}/>
        </main>
    )
}