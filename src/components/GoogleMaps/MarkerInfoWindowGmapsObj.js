import React, { Component, Fragment } from 'react';
import { isEmpty } from 'lodash';

// examples:
import GoogleMap from './GoogleMap';

// consts: [34.0522, -118.2437]
var last = null

const getInfoWindowString = place => `
    <div>
      <div style="font-size: 16px;">
        ${place.name}
      </div>
      <div style="font-size: 14px; color: grey;">
        ${place.types[0]}
      </div>
    </div>`

// Refer to https://github.com/google-map-react/google-map-react#use-google-maps-api
const handleApiLoaded = (map, maps, places, props, updateSelectedMarker, selectedMarker) => {
  const markers = [{}];
  const infowindows = [];

  var places = [
    {
      name: "Home",
      types: ['Request'],
      geometry: {
        location: {
          lat: 34.23,
          lng: -77.94
        }
      },
      address: '2131 S 17th Street'
    },
    {
      name: "Home1",
      types: ['Donation'],
      geometry: {
        location: {
          lat: 34.148562,
          lng: -77.935982
        }
      }
    },
    {
      name: "Home2",
      types: ['Request'],
      geometry: {
        location: {
          lat: 34.206362,
          lng: -77.922413
        }
      }
    }
  ]

  // for using a custom image as a marker
  // var image = {
  //   url: 'https://cdn4.iconfinder.com/data/icons/contact-us-19/48/35-512.png',
  //   scaledSize: new maps.Size(25, 25),
  // }

  places.forEach((place) => {
    markers.push(new maps.Marker({
      position: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
      },
      map,
      data: place,
      // icon: image,
      icon: place.types.includes('Request') ? {
        path: maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        strokeColor: 'red',
        scale: 5
      } : {
          path: maps.SymbolPath.FORWARD_CLOSED_ARROW,
          strokeColor: 'blue',
          scale: 5
        },
    }));

    infowindows.push(new maps.InfoWindow({
      content: getInfoWindowString(place),
    }));
  });

  markers.slice(1).forEach((marker, i) => {
    marker.addListener('click', () => {
      infowindows[i].open(map, marker)
      props.setSelectedOrder(marker.data)
      if (last) last.close()
      last = infowindows[i]
    })
  });
};

class MarkerInfoWindowGmapsObj extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      selectedMarker: false
    };
  }

  updateSelectedMarker(item) {
    //this.setState({selectedMarker: item})
  }

  render() {
    const { places } = [1, 2, 3]
    return (

      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={[34.23, -77.94]}
          bootstrapURLKeys={{ key: "AIzaSyD1t2vfHVpI_2dw0uqllA4lR5Q2Kjw9wdY" }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places, this.props)}
        />
      </div>

    );
  }
}

export default MarkerInfoWindowGmapsObj;
