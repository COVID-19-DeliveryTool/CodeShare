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
                                        <td>{change.charAt(0).toUpperCase()}{change.slice(1)}</td>
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