import React, { Component } from 'react';
import Marker from './Marker'

// examples:
import GoogleMap from './GoogleMap';

// consts: [34.0522, -118.2437]
var last = null

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.status}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.type}
      </div>
    </div>`

class MarkerInfoWindowGmapsObj extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      selectedMarker: false,
      gMap: false,
      gMaps: false
    };
  }

  handleApiLoaded = (map, maps, places, props, updateSelectedMarker, selectedMarker) => {
    this.setState({ gMap: map, gMaps: maps })
    return
  }

  getPlaces(places, props) {
    const markers = [{}];
    const infowindows = [];
    var gMaps = this.state.gMaps
    var gMap = this.state.gMap

    places.forEach((place) => {
      markers.push(new gMaps.Marker({
        position: {
          lat: Number(place.geometry.lat),
          lng: Number(place.geometry.long),
        },
        gMap,
        data: place,
        // icon: image,
        icon: place.type === 'REQUEST' ? {
          path: gMaps.SymbolPath.BACKWARD_CLOSED_ARROW,
          strokeColor: 'red',
          scale: 5
        } : {
            path: gMaps.SymbolPath.FORWARD_CLOSED_ARROW,
            strokeColor: 'blue',
            scale: 5
          },
      }));

      infowindows.push(new gMaps.InfoWindow({
        content: getInfoWindowString(place),
      }));
    });

    markers.slice(1).forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(gMap, marker)
        props.setSelectedOrder(marker.data)
        if (last) last.close()
        last = infowindows[i]
      })
    });

    console.log(markers)
    return markers.slice(1)
  }

  render() {
    if (this.props.selectedOrder && this.props.selectedOrder !== this.state.selectedMarker) this.setState({ selectedMarker: this.props.selectedOrder })
    const defaultCenter = { lat: 34.23, lng: -77.94 };
    const coordinates = this.props.selectedOrder ? { lat: Number(this.props.selectedOrder.geometry.lat), lng: Number(this.props.selectedOrder.geometry.long) } : defaultCenter;
    return (
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMap
          defaultZoom={12}
          center={coordinates}
          bootstrapURLKeys={{ key: "AIzaSyD1t2vfHVpI_2dw0uqllA4lR5Q2Kjw9wdY" }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps, this.props.orders, this.props)}
        >
          {this.props.orders.map((order, index) => {
            return (
              <Marker
                key={index}
                text={order.type}
                lat={Number(order.geometry.lat)}
                lng={Number(order.geometry.long)}
                onClick={() => this.props.setSelectedOrder(order)}
              />
            )
          })}
        </GoogleMap>
      </div>

    );
  }
}

export default MarkerInfoWindowGmapsObj;
