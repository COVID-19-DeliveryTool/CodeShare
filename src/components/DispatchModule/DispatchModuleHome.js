import React from 'react'
import { ArrowLeftCircle} from 'react-feather'

export default function DispatchModuleHome(props){
    return (
        <main>
            <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                <div className="col-12 mt-2 mr-auto">
                    <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => props.history.push('/')} />
                    <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                </div>
            </nav>
            <div className="col-10 mr-auto ml-auto">
                
            </div>
        </main>
    )
}