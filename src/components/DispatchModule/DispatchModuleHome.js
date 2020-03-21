import React, {useState,useEffect} from 'react'
import { ArrowLeftCircle,LogOut} from 'react-feather'
import {checkUserAuth,getUserInfo,logUserOut} from '../../lib/StitchFunctions'
import {toast} from 'react-toastify'

export default function DispatchModuleHome(props){
    const [authStatus, setAuthStatus] = useState(null)

    useEffect(() => {
        if(authStatus === null) checkUserAuth(setAuthStatus)
    }, [authStatus])

    return (
        <main>
            <nav className="navbar fixed-top col-12" style={{ backgroundColor: '#6f2c8e', paddingBottom: 15 }}>
                <div className="col-12 mt-2 mr-auto">
                    <ArrowLeftCircle color="white" className="mr-3 hover" onClick={() => props.history.push('/')} />
                    <span style={{ fontSize: 18, color: 'white' }} href="#">StayNeighbor</span>
                    {authStatus === true ? <span className="ml-auto float-right text-white">Welcome {getUserInfo().profile.data.name}!  <LogOut onClick={() => {
                        logUserOut()
                        props.history.push('/')
                        toast("You have been logged out!")
                    }} className="hover ml-2"/></span> : ''}
                </div>
            </nav>
            {authStatus ? <div className="col-10 mr-auto ml-auto" style={{marginTop:100}}>
                <h4>{getUserInfo().profile.data.name}</h4>
            </div> : ''}

            {!authStatus ? 
                <div className="col-10 mr-auto ml-auto" style={{marginTop:100}}>
                    <h5>Redirecting to login...</h5>
                </div>
            : ''}
        </main>
    )
}