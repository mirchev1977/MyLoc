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
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            infoText: "Your current position",
        };
    }

    componentWillMount () {
        if ( window.navigator.geolocation ) {
            window.navigator.geolocation.getCurrentPosition( ( position ) => {
                let coords = position.coords;
                this.setState( prevState => {
                    let state = this.state;
                    state.currentPos[ 'lat' ] = coords.latitude;
                    state.currentPos[ 'lng' ] = coords.longitude;

                    return state;
                } );
            } );
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
    }

    onMarkerDrop = ( props, marker, event ) => {
        let lat = marker.position.lat();
        let lng = marker.position.lng();

        this.setState( prevState => {
            let state = this.state;
            state.currentPos[ 'lat' ] = lat;
            state.currentPos[ 'lng' ] = lng;
            state.activeMarker = marker;
            state.showingInfoWindow = true;


            let currPosStr = "The position you chose is the following(lat,lng):";
            currPosStr += lat + ',' + lng;
            state.infoText = currPosStr;

            return state;
        } );
    }

    render() {
        return(
            <Map 
            google={this.props.google} 
            initialCenter={ { lat: this.state.currentPos, lng: this.state.currentPos  }}
            center={ { lat: this.state.currentPos, lat: this.state.currentPos  }}
            zoom={15}>
            <Marker
                title={'Your Courrent Position Here'}
                name={'My Position'}
                draggable={ true }
                onClick={this.onMarkerClick}
                onDragend={ this.onMarkerDrop }
                position={ { lat: this.state.currentPos, lng: this.state.currentPos  }} />

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow} >
                <div>
                    { this.state.infoText }
                </div>
            </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: ( 'AIzaSyAVrOK49i5e3Mk8xv7PdHa_91JhvfpGEaM' )
})(GMap);
