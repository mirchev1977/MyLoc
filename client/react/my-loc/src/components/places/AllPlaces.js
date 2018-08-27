import React, { Component } from 'react';
import MyPlace from './MyPlace.js';
import $ from 'jquery';

class AllPlaces extends Component {
    constructor( props ) {
        super( props );
        this.state = {
        };
    }

    onInputChange = ( id, name, val ) => {
        let name_ = name.toUpperCase();
        this.props.onInputChange ( 'places', '_places', id, name_, val );
    }

    updatePosition = ( id, latlng ) => {
        let latlngStr = latlng.lat + ' , ' + latlng.lng;
        this.props.onInputChange ( 'places', '_places', id, 'LATLNG', latlngStr );
        this.props.onInputChange ( 'places', '_placesChanges', id, '', latlngStr );
    }

    confirmChanges = () => {
        this.props.confirmChanges();
    }

    render() {
        let places = this.props.places;

        let confirmButton = <button className="changedPlaces"
                onClick={ this.confirmChanges }>There are some changes in your places info. Please, confirm  them!</button>;
            confirmButton = this.props.placesChanges ? confirmButton : '';

        let allPlaces = [];
        $.each( places._places, ( i, pl ) => {
            let current = <MyPlace 
                key={ i }
                id={pl.ID}
                category={pl.CATEGORY}  
                city={pl.CITY}  
                address={pl.ADDRESS}  
                public={pl.PUBLIC}  
                tovisit={pl.TOVISIT}  
                latlng={pl.LATLNG}  
                notes={pl.NOTES}  
                pic={pl.PIC}  
                userid={pl.USERID}  

                onInputChange={ this.onInputChange }
                updatePosition={ this.updatePosition }
            />

                allPlaces.push( current );
        } );
        return(
            <div className="allPlaces">
                <h1>All Places</h1>
                <div className="placeHeader">
                    <p>Category</p>
                    <p>City</p>
                    <p className="longer">Address</p>
                </div>
                { confirmButton }
                <div className="placeFields">
                    { allPlaces }
                </div>
            </div>
        );
    }
}

export default AllPlaces;
