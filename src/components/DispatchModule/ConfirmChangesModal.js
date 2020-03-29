import React from 'react'
import {Modal,Button,Spinner} from 'react-bootstrap'
import {X} from 'react-feather'

export default function ConfirmChangesModal(props){
    const { loading, showConfirmModal, orderChanges, selectedOrder } = props.dispatchContext.state
    const { setShowConfirmModal, updateOrder } = props.dispatchContext

    return (
        <Modal style={{paddingTop:75}} size='lg' show={showConfirmModal} onHide={() => {}}>
            <Modal.Body style={{borderTop:'10px solid #6f2c8e'}}>
                <div className="form-row border-bottom col-12 mr-auto ml-auto">
                        <span className="mr-auto ml-auto" style={{fontSize:20,fontWeight:600,color:"#6f2c8e",letterSpacing:'.025rem'}}>Please confirm your changes.</span>
                        <span onClick={() => setShowConfirmModal(false)} className="float-right mt-2"><X className="hover"/></span>
                    </div>
                <div className="col-12 row d-flex ml-2 mr-2" style={{marginTop:25}}>
                    {orderChanges.driver === '' || orderChanges.driver ? 
                        <div className="col-12 col-xl-5">
                            <div className="border-bottom pb-1 row">
                                <div className='col-12 mr-0 lead' style={{fontSize:15,fontWeight:'600'}}>Assignment Changes</div>
                            </div>
                            <div>
                                {/* <li className="lead" style={{listStyleType:'none',fontSize:14}}>{formData.firstName} {formData.lastName}</li>
                                <li className="mb-1 lead" style={{listStyleType:'none',fontSize:14}}>{formData.address}</li>
                                <li className="mb-3 lead" style={{listStyleType:'none',fontSize:14}}>{formData.zipcode}</li>
                                <li className="lead" style={{listStyleType:'none',fontSize:14}}>{formData.phoneNumber}</li>
                                <li className="lead" style={{listStyleType:'none',fontSize:14}}>{formData.emailAddress}</li> */}
                            </div>
                        </div>
                    : ''}
                    {orderChanges.status ?
                        <div className="col-12 col-xl-5">
                            <div className="border-bottom pb-1 row">
                                <div className='col-12 mr-0 lead' style={{fontSize:15,fontWeight:'600'}}>Status Changes</div>
                            </div>
                            <div>
                                {/* {formData.items.map(item => {
                                    return (
                                        <li className="ml-3 lead" style={{fontSize:14}}>{item.value}</li>
                                    )
                                })} */}
                            </div>
                        </div>
                    : ''}
                </div>
                <div className="col-12 row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <th>Field</th>
                                <th>Original</th>
                                <th>Updated</th>
                            </thead>
                            <tbody>
                            {Object.keys(orderChanges).map((change) => {
                                if(change === 'enabled') return
                                var originalValue = selectedOrder[change]
                                var updatedValue = orderChanges[change]

                                if(change === 'driver') {
                                    if(!selectedOrder[change]) originalValue = ''
                                    else originalValue = selectedOrder[change].name
                                    updatedValue = orderChanges[change].name
                                }

                                return (
                                    <tr>
                                        <td>{change}</td>
                                        <td>{originalValue}</td>
                                        <td>{updatedValue}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        
                    </div>
                    <div className="col-5 mr-auto ml-auto"></div>
                </div>
                <div className="col-12 mr-auto ml-auto mt-4 text-center">
                    {!loading && <button className="btn col-12 btn-primary-hover" type="button" onClick={updateOrder}>Submit</button>}
                    {loading && <button className="btn col-12 btn-primary-hover" type="button">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </button>}
                </div>
            </Modal.Body>
        </Modal>
    )
}