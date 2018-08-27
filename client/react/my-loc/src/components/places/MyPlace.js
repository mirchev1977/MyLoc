import React, { Component } from 'react';
import DataField from '../common/DataField.js';
import GMap from './GMap.js';
import $ from 'jquery';

class MyPlace extends Component {
    placeViewClosed = '';
    placeViewOpened = '';

    constructor( props ) {
        super( props );

        this.state = {
            viewOpened: false,
            currentPos: {
                lat: 42.6980274,
                lng: 23.323468,
            },
        };

        this.openView           = this.openView.bind(       this );
        this.mapHolderClick     = this.mapHolderClick.bind( this );
        this.updatePosition     = this.updatePosition.bind( this );
    }

    updatePosition ( latLng ) {
        if ( !this.state ) return;
        this.setState( prevState => {
            let state = this.state;
            state[ 'currentPos' ] = latLng;
            return state;
        } );
    }

    mapHolderClick( event ) {
        event.stopPropagation();
    }

    openView ( event ) {
        if ( event.target.className === 'closedDataField' ) {
            return;
        }

        this.setState( {
            viewOpened: !this.state.viewOpened
        } );
    }

    render() {
        this.placeViewClosed = (<div className="placeContent">
            <p>Concert Hall</p>
            <p>Sofia</p>
            <p className="longer">Some Address in Sofia one two three four five six seven eight nine ten eleven twelve thirteen forteen</p>
            </div>);
        this.placeViewOpened = ( 
            <div className="placeContent">
                <div className="placeViewOpened">
                    <div className="column">
                       Category: <DataField
                            type="text"
                            name="category"
                            id="1"
                            value="Cinema" 
                        />
                        <br />
                        <br />
                       City: <DataField
                            type="text"
                            name="city"
                            id="1"
                            value="Sofia" 
                        />
                        <br />
                        <br />
                       Address: <DataField
                            type="text"
                            name="address"
                            id="1"
                            value="Some very long address in Sofia one two three four five six seven eight" 
                        />
                    </div>
                    <div className="column">
                       Public: <DataField
                            type="text"
                            name="category"
                            id="1"
                            value="Cinema" 
                        />
                        <br />
                        <br />
                       To Visit: <DataField
                            type="text"
                            name="city"
                            id="1"
                            value="Sofia" 
                        />
                        <br />
                        <br />
                       LatLng: <DataField
                            type="text"
                            name="latlng"
                            id="1"
                            value={ this.state.currentPos.lat + ' , ' + this.state.currentPos.lng }
                        />
                        <br />
                        <br />
                       Notes: <DataField
                            type="text"
                            name="notes"
                            id="1"
                            value="my very long notes come here..."
                        />
                    </div>
                    <div className="column" onClick={ this.mapHolderClick }>
                        <img alt="embedded img" src="https://eltecenglish.files.wordpress.com/2018/02/holidays-ielts-essay.jpg?w=1300" />
                       <span className="picSrc">Picture: <DataField
                            type="text"
                            name="picture"
                            id="1"
                            value="Picturesrconeverylongimageisembeddedhereonetwothreefourfivexsixseveneightnineteneleventwelve" 
                        /></span>
                    </div>
                    <div className="column mapHolder" id="mapHolder" onClick={ this.mapHolderClick }>
                        <GMap updatePosition={ this.updatePosition } />
                    </div>
                </div>
            </div> 
            );


        let view = this.state.viewOpened ? this.placeViewOpened : this.placeViewClosed;
        return(
            <div className="myPlace" onClick={ this.openView }>
            { view }    
            </div>
        );
    }
}

export default MyPlace;
