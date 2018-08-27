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
        //let arr = this.props.latlng.split( /\s*,\s*/ )
        //arr[ 0 ] = parseFloat( arr[ 0 ].trim() );
        //arr[ 1 ] = parseFloat( arr[ 1 ].trim() );
        //this.setState( prevState => {
        //    let state = this.state;
        //    state.currentPos.lat = arr[ 0 ];
        //    state.currentPos.lng = arr[ 1 ];
        //} );

        this.placeViewClosed = (<div className="placeContent">
            <p>{this.props.category}</p>
            <p>{ this.props.city }</p>
            <p className="longer">{ this.props.address }</p>
            </div>);
        this.placeViewOpened = ( 
            <div className="placeContent">
                <div className="placeViewOpened">
                    <div className="column">
                       Category: <DataField
                            type="text"
                            name="category"
                            id={ this.props.id }
                            value={ this.props.category }
                        />
                        <br />
                        <br />
                       City: <DataField
                            type="text"
                            name="city"
                            id={ this.props.id }
                            value={ this.props.city }
                        />
                        <br />
                        <br />
                       Address: <DataField
                            type="text"
                            name="address"
                            id={ this.props.id }
                            value={ this.props.address }
                        />
                    </div>
                    <div className="column">
                       Public: <DataField
                            type="text"
                            name="public"
                            id={ this.props.id }
                            value={ this.props.public }
                        />
                        <br />
                        <br />
                       To Visit: <DataField
                            type="text"
                            name="tovisit"
                            id={ this.props.id }
                            value={ this.props.tovisit }
                        />
                        <br />
                        <br />
                       LatLng: <DataField
                            type="text"
                            name="latlng"
                            id={ this.props.id }
                            value={ this.props.latlng }
                        />
                        <br />
                        <br />
                       Notes: <DataField
                            type="text"
                            name="notes"
                            id={ this.props.id }
                            value={ this.props.notes }
                        />
                    </div>
                    <div className="column" onClick={ this.mapHolderClick }>
                        <img alt="embedded img" src={ this.props.pic } />
                       <span className="picSrc">Picture: <DataField
                            type="text"
                            name="picture"
                            id="1"
                            value={ this.props.pic }
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
