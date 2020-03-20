import React, {useState,useEffect} from 'react'
import {ChevronRight} from 'react-feather'
import {getOrders} from '../lib/StitchFunctions'

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
                    <button onClick={() => props.history.push('/request')} className="btn col-10" style={{color:'white',backgroundColor:'#480d63',fontSize:'1.25rem',paddingRight:50,paddingLeft:50,paddingTop:10,paddingBottom:10}}>I <b style={{fontWeight:'bolder'}}>need</b> supplies</button>
                </div>
                <div className="col-xl-6 col-12 text-center mt-4 mr-auto ml-auto">
                    <button onClick={() => props.history.push('/supply')} className="btn col-10" style={{color:'white',backgroundColor:'#480d63',fontSize:'1.25rem',paddingRight:50,paddingLeft:50,paddingTop:10,paddingBottom:10}}>I <b style={{fontWeight:'bolder'}}>have</b> supplies</button>
                </div>
            </div>
            <div style={{marginTop:15}} className="col-12 text-center">
                <p className="lead" style={{fontSize:'1.25rem'}}>Dispatchers & Deliverers  <ChevronRight size={18}/></p>
            </div>

            <button onClick={() => getOrders()} className="btn col-10" style={{color:'white',backgroundColor:'#480d63',fontSize:'1.25rem',paddingRight:50,paddingLeft:50,paddingTop:10,paddingBottom:10}}>test stitch</button>

            <nav class="navbar fixed-bottom" style={{backgroundColor: '#6f2c8e',paddingBottom:15}}>
                <div className="mr-auto ml-auto">
                    <a style={{fontSize:11,color:'white'}} href="#">StayNeighbor is a community-built platform.  <b style={{color:'yellow'}}>GET INVOLVED</b></a>
                </div>
            </nav>
        </div>
    )
}