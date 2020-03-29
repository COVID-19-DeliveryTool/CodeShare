import React from 'react'
import {ArrowLeftCircle} from 'react-feather'

export default function MenuBar(props){
    const {goBackTo} = props
    return (
        <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#781CB2', paddingBottom: 15 }}>
            <div className="col-12 mt-2 mr-auto">
                {props.setStep && <ArrowLeftCircle color="white" className="mr-3 underline-hover" onClick={() => props.setStep(goBackTo)} />}
                <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
            </div>
        </nav>
    )
}