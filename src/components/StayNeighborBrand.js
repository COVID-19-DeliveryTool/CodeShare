import React from 'react'
import fulllogo from '../images/fulllogo.png'

export default function StayNeighborBrand(){
    return (
        <div className="mr-auto ml-auto text-center" style={{ paddingTop: '7rem' }}>
            <img className="mr-auto ml-auto" style={{ width:'50%',maxWidth:'25rem' }} src={fulllogo} />
        </div>
    )
}