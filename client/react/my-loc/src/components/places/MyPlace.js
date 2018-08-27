import React, { Component } from 'react';
import DataField from '../common/DataField.js';
import GMap from './GMap.js';
import $ from 'jquery';

class MyPlace extends Component {
    placeViewClosed = (<div className="placeContent">
        <p>Concert Hall</p>
        <p>Sofia</p>
        <p className="longer">Some Address in Sofia one two three four five six seven eight nine ten eleven twelve thirteen forteen</p>
        </div>);
    placeViewOpened = ( 
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
                   Picture: <DataField
                        type="text"
                        name="address"
                        id="1"
                        value="Picture src" 
                    />
                    <br />
                    <br />
                   LatLng: <DataField
                        type="text"
                        name="latlng"
                        id="1"
                        value="123,123" 
                    />
                </div>
                <div className="column" onClick={ this.mapHolderClick }>
                    <img src="https://eltecenglish.files.wordpress.com/2018/02/holidays-ielts-essay.jpg?w=1300" />
                </div>
                <div className="column mapHolder" id="mapHolder" onClick={ this.mapHolderClick }>
                    <GMap />
                </div>
            </div>
        </div> 
        );

    placeView = '';

    constructor( props ) {
        super( props );

        this.state = {
            viewOpened: true,
            lat: '',
            lng: '',
        };

        this.openView           = this.openView.bind(           this );
        this.toggleOpenedClosed = this.toggleOpenedClosed.bind( this );
        this.mapHolderClick     = this.mapHolderClick.bind( this );
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
        this.toggleOpenedClosed();
    }

    componentDidMount () {
        this.toggleOpenedClosed();
    }

    componentWillMount () {
        this.placeView = this.placeViewClosed;
    }

    toggleOpenedClosed () {
        if ( this.state.viewOpened ) {
            this.placeView = this.placeViewOpened;
        } else {
            this.placeView = this.placeViewClosed;
            this.placeView = this.placeViewOpened;
        }
    }

    render() {
        return(
            <div className="myPlace" onClick={ this.openView }>
            { this.placeView }    
            </div>
        );
    }
}

export default MyPlace;
