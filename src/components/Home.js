import React, {useState,useEffect} from 'react'
import {ChevronRight} from 'react-feather'

export default function Home(props){
    return (
        <div style={{backgroundColor: "rgb(158, 69, 183)",height:'100vh',color:'white'}}>
            <div style={{paddingTop: '10rem'}} className="mr-auto ml-auto">
                <p className="text-center lead" style={{fontSize:'2.25rem',fontWeight:'bolder'}}>StayNeighbor</p>
            </div>
            <div className="lead col-11 mr-auto ml-auto text-center" style={{fontSize:'1.25rem',marginTop:'2rem'}}>
                A volunteer-powered network for essential supplies - delivered in a safe, healthy, and organized way.
            </div>
            <div style={{marginTop:'3rem'}}>
                <div className="col-xl-6 col-12 text-center mr-auto ml-auto">
                    <button onClick={() => props.history.push('/request')} className="btn col-10 underline-hover" style={{color:'white',backgroundColor:'#480d63',fontSize:'1.25rem',paddingRight:50,paddingLeft:50,paddingTop:10,paddingBottom:10}}>I <b style={{fontWeight:'bolder'}}>need</b> supplies</button>
                </div>
                <div className="col-xl-6 col-12 text-center mt-4 mr-auto ml-auto">
                    <button onClick={() => props.history.push('/donate')} className="btn col-10 underline-hover" style={{color:'white',backgroundColor:'#480d63',fontSize:'1.25rem',paddingRight:50,paddingLeft:50,paddingTop:10,paddingBottom:10}}>I <b style={{fontWeight:'bolder'}}>have</b> supplies</button>
                </div>
            </div>
            <div style={{marginTop:15}} className="col-12 text-center">
                <p onClick={() => props.history.push('/dispatch')} className="lead underline-hover" style={{fontSize:'1.25rem'}}>Dispatchers  <ChevronRight size={18}/></p>
            </div>

            <nav className="navbar fixed-bottom" style={{backgroundColor: '#6f2c8e',paddingBottom:15}}>
                <div className="mr-auto ml-auto">
                    <a onClick={() => window.location.replace('https://www.stayneighbor.com')} style={{fontSize:11,color:'white'}} href="#">StayNeighbor is a community-built platform.  <b style={{color:'yellow'}}>GET INVOLVED</b></a>
                </div>
            </nav>
        </div>
    )
}