import React from 'react'
import {Modal,Spinner} from 'react-bootstrap'
import {AlertTriangle} from 'react-feather'

export default function OrderConfirmationModal(props){
    const {showModal, setStep, setShowModal, formData, type, loading, submitRequest, errors} = props
    return (
        <Modal style={{paddingTop:75}} size='lg' show={showModal} onHide={() => {}}>
            <Modal.Body style={{borderTop:'10px solid #781CB2'}}>
                <div className="col-12 text-center">
                    <span style={{fontSize:20,fontWeight:600,color:"#781CB2",letterSpacing:'.025rem'}}>Is everything correct?</span>
                </div>
                <div className="col-12 row" style={{marginTop:25}}>
                    <div className="col-12 col-xl-5 mr-auto ml-auto">
                        <div className="border-bottom pb-1 row">
                            <div className='col-6 mr-0 lead' style={{fontSize:15,fontWeight:'600'}}>Your Info {errors.address ? <AlertTriangle style={{color:'red'}}/> : ''}</div>
                            <div onClick={() => {
                                setStep(1)
                                setShowModal(false)
                                }} className="col-6 text-right ml-0 lead hover" style={{color:'#781CB2',fontSize:13,fontWeight:'600'}}>Edit</div>
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
                                }} className="col-6 text-right ml-0 lead hover" style={{color:'#781CB2',fontSize:13,fontWeight:'600'}}>Edit</div>
                        </div>
                        <div>
                            {formData.items.map(item => {
                                return (
                                    <li className="ml-3 lead" style={{fontSize:14}}>{item.value}</li>
                                )
                            })}
                            {formData.freeTextItems.map(item => {
                                if(item === '') return false
                                return (
                                    <li className="ml-3 lead" style={{fontSize:14}}>{item}</li>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-12 row" style={{marginTop:25}}>
                    <div className="col-12 col-xl-5 mr-auto ml-auto">
                        <div className="border-bottom row pb-1">
                            <div className='col-6 mr-0 lead' style={{fontSize:15,fontWeight:'600'}}>{type==='donation' ? 'Pick Up Time' : 'Drop Off Time'}</div>
                                <div onClick={() => {
                                    setStep(3)
                                    setShowModal(false)
                                    }} className="col-6 text-right ml-0 lead hover" style={{color:'#781CB2',fontSize:13,fontWeight:'600'}}>Edit</div>
                                </div>
                            <div>
                            <li className="lead" style={{listStyleType:'none',fontSize:14}}>{formData.dropoff ? `${formData.dropoff.label} (${formData.dropoff.time})` : ''}</li>
                        </div>
                    </div>
                    <div className="col-xl-5 col-12 mr-auto ml-auto">
                        <div className="border-bottom row pb-1">
                            <div className='col-6 mr-0 lead' style={{fontSize:15,fontWeight:'600'}}>Additional Info</div>
                                <div onClick={() => {
                                    setStep(3)
                                    setShowModal(false)
                                    }} className="col-6 text-right ml-0 lead hover" style={{color:'#781CB2',fontSize:13,fontWeight:'600'}}>Edit</div>
                                </div>
                            <div>
                            <span className="lead" style={{listStyleType:'none',fontSize:14,border:0}} disabled={true}>{formData.additionalInfo}</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 mr-auto ml-auto mt-4 text-center">
                    {!loading && <button onClick={submitRequest} className="btn col-12 btn-primary-hover" type="button">Submit</button>}
                    {loading && <button className="btn col-12 btn-primary-hover" type="button">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </button>}
                    {type==='request' &&<span className="text-center mr-auto ml-auto">Please note our deliveries are contactless, we will leave the item where you specify.</span>}
                    {type==='donation' &&<span className="text-center mr-auto ml-auto">Please note our pickups are contactless, we will pickup the items from where you specify.</span>}
                </div>
            </Modal.Body>
        </Modal>
    )
}