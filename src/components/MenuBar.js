import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {User} from 'react-feather'

export default function MenuBar(props){
    const location = window.location.pathname.replace('/', '');
    var pageTitle = location.charAt(0).toUpperCase() + location.slice(1)
    
    if(pageTitle == '') pageTitle = 'Home'

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className='navbar-brand col-sm-3 col-md-2 mr-0'><span>Stay Neighbor</span></Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto" style={{paddingLeft:100}}>
                    <li class="nav-item">
                        <span class=" h5" href="#">{pageTitle}</span>
                    </li>
                </ul>
                <span class="form-inline my-2 my-lg-0 ml-auto">
                    {/* <User className="pr-4" size={48}/> */}
                    <span className="pr-4">Hello Neighbour!  </span>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Log Out</button>
                </span>
            </div>
        </nav>
    )
}