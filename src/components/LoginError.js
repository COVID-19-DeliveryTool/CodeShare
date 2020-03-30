import React from 'react'
import MenuBar from './MenuBar'
import StayNeighborBrand from './StayNeighborBrand'

export default function LoginError(){
    return (
        <main>
            <MenuBar/>
            <StayNeighborBrand/>
            <div className="col-12 mr-auto ml-auto text-center" style={{marginTop:30}}>
                <span className="lead text-center mr-auto ml-auto" style={{fontSize:'1.5rem'}}>We're sorry, but we had trouble logging you in.</span>
            </div>
            <div className="col-12 mr-auto ml-auto text-center" style={{marginTop:'.4rem'}}>
                <span className="lead text-center mr-auto ml-auto" style={{fontSize:'1.5rem'}}>If you haven't already, please sign up as a volunteer using the link below.</span>
            </div>
            <div className="col-12 mr-auto ml-auto text-center" style={{marginTop:'1.5rem'}}>
                <button type='button' onClick={() => window.location.replace("https://app.stayneighbor.com")} className="btn btn-outline-brand" style={{fontSize:'1.5rem',minWidth:'8rem'}}>Home</button>
                <button type='button' onClick={() => window.location.replace("https://stayneighbor.com/volunteer")} className="btn btn-outline-brand" style={{fontSize:'1.5rem',minWidth:'8rem'}}>Volunteer</button>
            </div>
        </main>
    )
}