import React, { Component, Fragment } from 'react';
import { isEmpty } from 'lodash';
import Marker from './Marker'

// examples:
import GoogleMap from './GoogleMap';

// consts: [34.0522, -118.2437]
var last = null
var selected = false
var records = ''
// var records = [
//   {
//     name: "Home",
//     types: ['Request'],
//     geometry: {
//       location: {
//         lat: 34.23,
//         lng: -77.94
//       }
//     },
//     address: '2131 S 17th Street'
//   },
//   {
//     name: "Home1",
//     types: ['Donation'],
//     geometry: {
//       location: {
//         lat: 34.148562,
//         lng: -77.935982
//       }
//     }
//   },
//   {
//     name: "Home2",
//     types: ['Request'],
//     geometry: {
//       location: {
//         lat: 34.206362,
//         lng: -77.922413
//       }
//     }
//   }
// ]

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.status}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.type}
      </div>
    </div>`




// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
// const handleApiLoaded = (map, maps, places, props, updateSelectedMarker, selectedMarker) => {
//   this.setState({gMap: map, gMaps: maps})
//   return


// const markers = [{}];
// const infowindows = [];

// var places = [
//   {
//     name: "Home",
//     types: ['Request'],
//     geometry: {
//       location: {
//         lat: 34.23,
//         lng: -77.94
//       }
//     },
//     address: '2131 S 17th Street'
//   },
//   {
//     name: "Home1",
//     types: ['Donation'],
//     geometry: {
//       location: {
//         lat: 34.148562,
//         lng: -77.935982
//       }
//     }
//   },
//   {
//     name: "Home2",
//     types: ['Request'],
//     geometry: {
//       location: {
//         lat: 34.206362,
//         lng: -77.922413
//       }
//     }
//   }
// ]

// for using a custom image as a marker
// var image = {
//   url: 'https://cdn4.iconfinder.com/data/icons/contact-us-19/48/35-512.png',
//   scaledSize: new maps.Size(25, 25),
// }

// places.forEach((place) => {
//   markers.push(new maps.Marker({
//     position: {
//       lat: Number(place.geometry.lat),
//       lng: Number(place.geometry.long),
//     },
//     map,
//     data: place,
//     // icon: image,
//     icon: place.type === 'REQUEST' ? {
//       path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
//       strokeColor: 'red',
//       scale: 5
//     } : {
//         path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
//         strokeColor: 'blue',
//         scale: 5
//       },
//   }));

//   infowindows.push(new maps.InfoWindow({
//     content: getInfoWindowString(place),
//   }));
// });

// markers.slice(1).forEach((marker, i) => {
//   marker.addListener('click', () => {
//     infowindows[i].open(map, marker)
//     props.setSelectedOrder(marker.data)
//     if (last) last.close()
//     last = infowindows[i]
//   })
// });
// console.log(markers)
// records = markers.slice(1)
//};

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

  updateSelectedMarker(item) {
    //this.setState({selectedMarker: item})
  }

  handleApiLoaded = (map, maps, places, props, updateSelectedMarker, selectedMarker) => {
    console.log(map)
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
    if (this.props.selectedOrder && this.props.selectedOrder != this.state.selectedMarker) this.setState({ selectedMarker: this.props.selectedOrder })
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
            const selected = this.props.selectedOrder && this.props.selectedOrder._id.toString() === order._id.toString();
            return (
              <Marker
                key={index}
                text={order.type}
                lat={Number(order.geometry.lat)}
                lng={Number(order.geometry.long)}
                selected={selected}
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
