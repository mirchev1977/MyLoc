import React, { Component } from 'react';
import MyPlace from './MyPlace.js';
import $ from 'jquery';

class AllPlaces extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            places: { 
                0: { ID: 0, CATEGORY: 'NEW', CITY: 'NEW', ADDRESS: 'Some new address', PUBLIC: 'YES', 
                TOVISIT: 0, LATLNG: '', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/y94zpxvk ', 
                    USERID: this.props.common.loggedIn.ID }, 
                1: { ID: 1, CATEGORY: 'Cinema', CITY: 'Sofia', ADDRESS: 'Some address in Sofia', PUBLIC: 'YES', 
                TOVISIT: 0, LATLNG: '42.6980274 , 23.323468', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/y94zpxvk ', USERID: 1 }, 
                2: { ID: 2, CATEGORY: 'Theater', CITY: 'Plovdiv', ADDRESS: 'Some address in Plovdiv', PUBLIC: 'YES', 
                TOVISIT: 0, LATLNG: '42.1468899 , 24.7488805', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/y792z4y2', USERID: 1 }, 
                3: { ID: 3, CATEGORY: 'Car Service', CITY: 'Varna', ADDRESS: 'Some address in Varna', PUBLIC: 'YES', 
                TOVISIT: 0, LATLNG: '43.2263393 , 27.8602098', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/ybpgm2n8', USERID: 1 }, 
            }, 
        };
    }

    onInputChange = ( id, name, val ) => {
        let name_ = name.toUpperCase();
        this.setState( prevState => {
            let state = this.state;

            state[ 'places' ][ id ][ name_ ] = val;

            return state;
        } );
    }

    updatePosition = ( id, latlng ) => {
        this.setState( prevState => {
            let latlngStr = latlng.lat + ' , ' + latlng.lng;
            let state = this.state;
            state[ 'places' ][ id ][ 'LATLNG' ] = latlngStr;
            return state;
        } );
    }

    render() {
        let allPlaces = [];
        $.each( this.state.places, ( i, pl ) => {
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
                <button>There are some changes in your places' info. Please, confirm  them!</button>
                <div className="placeFields">
                    { allPlaces }
                </div>
            </div>
        );
    }
}

export default AllPlaces;
