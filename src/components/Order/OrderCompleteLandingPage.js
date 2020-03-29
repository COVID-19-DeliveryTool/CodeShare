import React from 'react'
import MenuBar from '../MenuBar'
import StayNeighborBrand from '../StayNeighborBrand'

export default function OrderCompleteLandingPage(props){
    const {type, setStep} = props
    return (
        <main>
            <MenuBar {...props}/>
            <div className="col-xl-6 col-11 mr-auto ml-auto">
                <StayNeighborBrand/>

                {type==='request' && 
                    <React.Fragment>
                        <div className="mr-auto ml-auto text-center mt-3">
                            {type==='request' &&<span className="lead" style={{fontSize:'3rem',color:"rgba(0, 0, 0, 0.42)"}}>Help is on the way.</span>}
                        </div>
                        <div className="mr-auto ml-auto text-center mt-2 mb-4">
                            <span className="lead" style={{fontSize:'1.5rem',color:"rgba(0, 0, 0, 0.42)"}}>When your order is assigned to a driver, we will let you know.</span>
                        </div>
                        <div className="mr-auto ml-auto text-center mt-2 mb-4">
                            <button onClick={() => {
                                props.history.push('/')
                                setStep(1)
                            }} className="btn btn-outline-brand btn-lg">Home</button>
                            <button onClick={() => window.location.replace('https://stayneighbor.com')} className="btn btn-lg btn-outline-brand">Learn More</button>
                        </div>
                    </React.Fragment>
                }

                {type==='donation' && 
                    <React.Fragment>
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
                    </React.Fragment>
                }
            </div>
        </main>
    )
}