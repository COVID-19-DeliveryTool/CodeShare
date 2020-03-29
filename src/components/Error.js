import React from 'react'
import {ArrowLeftCircle} from 'react-feather'

export default function Error(props){
    console.log(props)
    var { errors } = props.globalContext.state

    return (
        <main>
            <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6F2C8E', paddingBottom: 15 }}>
                <div className="col-12 mt-2 mr-auto">
                    <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => props.history.push('/')} />
                    <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                </div>
            </nav>
            <div className="col-12 row mr-auto" style={{marginTop:75}}>
                <div style={{paddingLeft:0,paddingRight:0,width:'20%'}}>
                    {errors.login}
                </div>
            </div>
        </main>
    )
}