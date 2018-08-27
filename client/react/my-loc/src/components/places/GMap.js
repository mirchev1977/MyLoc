import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class GMap extends Component {
    constructor ( props ) {
        super( props );
        this.state = {
            currentPos: {
                lat: 42.6980274,
                lng: 23.323468,
            },
        };
    }

    componentWillMount () {
        if ( window.navigator.geolocation ) {
            window.navigator.geolocation.getCurrentPosition( ( position ) => {
                let coords = position.coords;
                this.setState( prevState => {
                    let state = this.state;
                    state.currentPos[ 'lat' ] = 42.7142092;
                    state.currentPos[ 'lng' ] = 23.2730744;

                    return state;
                } );
            } );
        }
    }


    render() {
        let currentPos = this.state.currentPos;
        return(
            <Map 
            google={this.props.google} 
            initialCenter={ { lat: currentPos.lat, lng: currentPos.lng  } }
            center={ { lat: currentPos.lat, lng: currentPos.lng  } }
            zoom={15}></Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: ( 'AIzaSyAVrOK49i5e3Mk8xv7PdHa_91JhvfpGEaM' )
})(GMap);
