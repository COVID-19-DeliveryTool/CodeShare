import React, { useState,Component, Fragment } from 'react';
import MarkerInfoWindowGmapsObj from './GoogleMaps/MarkerInfoWindowGmapsObj'
import GoogleMap from './GoogleMaps/GoogleMap'
import GoogleMapReact from 'google-map-react'

var defaultCenter = [34.23, -77.94]

export default function Dispatch(){
  const [selectedOrder, setSelectedOrder] = useState(false)

  console.log(selectedOrder)

  return (
    <div className="row" style={{height:'100vh',width:'100%'}}>
      <div className="col-3">
        <h6>list of orders</h6>
      </div>
      <div className={selectedOrder ? 'col-6' : 'col-9'}>
        <MarkerInfoWindowGmapsObj setSelectedOrder={setSelectedOrder}/>
      </div>
      {selectedOrder ? 
        <div className="col-3">
          <h6>order details</h6>
          <h6>{JSON.stringify(selectedOrder,null,2)}</h6>
        </div>
      : ''}
    </div>
    
  ) 
}




