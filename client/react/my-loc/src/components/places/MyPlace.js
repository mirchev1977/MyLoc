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
            this.props.updatePosition( this.props.id, state.currentPos );
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

    checkBox = ( event ) => {
        event.stopPropagation();
        let val = event.target.checked ? 1 : 0;
        let name = event.target.name.toUpperCase();
        this.props.onInputChange ( event.target.id, name, val );
    }

    deletePlace = ( event ) => {
        let id = this.props.id;
        this.props.deletePlace( id );
    }

    render() {
        this.placeViewClosed = (<div className="placeContent">
            <p>{this.props.category}</p>
            <p>{ this.props.city }</p>
            <p className="longer">{ this.props.address }</p>
            </div>);
        if ( this.props.id === 0 ) {
            this.placeViewClosed = <div className="newPlace">{ this.placeViewClosed }</div>;
        }
        this.placeViewOpened = ( 
            <div className="placeContent">
                <div className="placeViewOpened">
                    <div className="column">
                       Category: <DataField
                            type="text"
                            name="category"
                            id={ this.props.id }
                            value={ this.props.category }
                            component="myplace"
                            onInputChange={ this.props.onInputChange }
                        />
                        <br />
                        <br />
                       City: <DataField
                            type="text"
                            name="city"
                            id={ this.props.id }
                            value={ this.props.city }
                            component="myplace"
                            onInputChange={ this.props.onInputChange }
                        />
                        <br />
                        <br />
                       Address: <DataField
                            type="text"
                            name="address"
                            id={ this.props.id }
                            value={ this.props.address }
                            component="myplace"
                            onInputChange={ this.props.onInputChange }
                        />
                        <br />
                        <br />
                        <button className="deletePlace" onClick={ this.deletePlace }>Delete Place</button>
                    </div>
                    <div className="column">
                       Public: <DataField
                            type="text"
                            name="public"
                            id={ this.props.id }
                            value={ this.props.public }
                            component="myplace"
                            onInputChange={ this.props.onInputChange }
                        />
                        <br />
                        <br />
                       To visit: <input type="checkbox" name="tovisit" id={this.props.id } 
                            checked={ this.props.tovisit } value={ this.props.tovisit } onClick={ this.checkBox }  />
                        <br />
                        <br />
                       LatLng: <DataField
                            type="text"
                            name="latlng"
                            id={ this.props.id }
                            value={ this.props.latlng }
                            component="myplace"
                            onInputChange={ this.props.onInputChange }
                        />
                        <br />
                        <br />
                       Notes: <DataField
                            type="text"
                            name="notes"
                            id={ this.props.id }
                            value={ this.props.notes }
                            component="myplace"
                            onInputChange={ this.props.onInputChange }
                        />
                    </div>
                    <div className="column" onClick={ this.mapHolderClick }>
                        <img alt="embedded img" src={ this.props.pic } />
                       <span className="picSrc">Picture: <DataField
                            type="text"
                            name="pic"
                            id={this.props.id }
                            value={ this.props.pic }
                            component="myplace"
                            onInputChange={ this.props.onInputChange }
                        /></span>
                    </div>
                    <div className="column mapHolder" id="mapHolder" onClick={ this.mapHolderClick }>
                        <GMap updatePosition={ this.updatePosition } latlng={ this.props.latlng  } />
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
