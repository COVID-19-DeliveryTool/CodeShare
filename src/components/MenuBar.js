import React from 'react'
import {ArrowLeftCircle} from 'react-feather'

export default function MenuBar(props){
    console.log(props)
    const {goBackTo} = props
    return (
        <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
            <div className="col-12 mt-2 mr-auto">
                <ArrowLeftCircle color="white" className="mr-3 underline-hover" onClick={() => props.setStep(props.goBackTo)} />
                <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
            </div>
        </nav>
    )
}