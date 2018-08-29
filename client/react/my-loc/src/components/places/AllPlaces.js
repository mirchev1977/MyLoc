import React, { Component } from 'react';
import MyPlace from './MyPlace.js';
import $ from 'jquery';

class AllPlaces extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            catFil: '',
            cityFil: '',
            addrFil: '',
        };
    }

    onInputChange = ( id, name, val ) => {
        if ( this.props.component.match( /public/i ) ) {
            if ( !this.props.common.loggedIn.ID ) {
                return;
            }
            if ( !name.match( /tovisit/i ) ) {
                return;
            }
        }
        let name_ = name.toUpperCase();
        this.props.onInputChange ( 'places', '_places', id, name_, val );
    }

    updatePosition = ( id, latlng ) => {
        if ( this.props.component.match( /public/i ) ) return;
        let latlngStr = latlng.lat + ' , ' + latlng.lng;
        this.props.onInputChange ( 'places', '_places', id, 'LATLNG', latlngStr );
        this.props.onInputChange ( 'places', '_placesChanges', id, '', latlngStr );
    }

    confirmChanges = () => {
        let _this = this;
        let changedPlaces = this.props.places[ '_changed' ];

        let json = JSON.stringify( changedPlaces );
        $.ajax( {
            method: 'POST',
            url: 'http://localhost:5000/places/update',
            data: { places: json },
            dataType: 'json',
            success: function ( data ) {
                _this.props.confirmChanges();
            },
            error: function ( data ) {
            }
        } );
    }

    componentDidMount () {
        let places = {};
        let owner = this.props.common.loggedIn.ID || 1;
        let newPlace = { ID: 0, CATEGORY: 'NEW', CITY: 'NEW', ADDRESS: 'Some new address', PUBLIC: 'YES', 
            TOVISIT: 0, LATLNG: '', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/y9msaz6e', 
                USERID: owner };


        let _this = this;
        $.ajax( {
            method: 'GET',
            url: 'http://localhost:5000/places/all',
            dataType: 'json',
            success: function ( data ) {
                let fetchedPlaces = data;

                if ( !_this.props.component.match( /public/i ) && owner && owner > 0 ) {
                    places[ newPlace.ID ] = newPlace;
                } 

                for ( var i in fetchedPlaces ) {
                    places[ i ] = fetchedPlaces[ i ];
                    places[ i ][ 'TODELETE' ] = 0;
                    places[ i ][ 'TOVISIT' ] = parseInt( places[ i ][ 'TOVISIT' ] );
                }

                _this.props.update ( 'places', '_places', places );
            }
        } );
    }

    handleKeyPress = ( event )  => {
        let name = event.target.name;
        if ( name === 'filterCateg' ) {
            this.setState( { catFil: event.target.value } );
        } else if ( name === 'filterCity' ) {
            this.setState( { cityFil: event.target.value } );
        } else if ( name === 'filterAddr' ) {
            this.setState( { addrFil: event.target.value } );
        }
    }

    render() {
        let places = this.props.places;

        let confirmButton = <button className="changedPlaces"
                onClick={ this.confirmChanges }>There are some changes in your places info. Please, confirm  them!</button>;
            confirmButton = this.props.placesChanges ? confirmButton : '';

        let allPlaces = [];
        $.each( places._places, ( i, pl ) => {
            let isPublic = this.props.component.match( /public/i );
            if ( isPublic ){
                if ( !pl[ 'PUBLIC' ].match( /yes/i ) ) {
                    return true;
                }
            }
            let placeUID = pl[ 'USERID' ];
            let loggedID = this.props.common.loggedIn.ID;
            if ( placeUID && loggedID && !isPublic ) {
                if ( placeUID.toString() !== loggedID.toString() ) {
                    return true;
                }
            }

            if ( this.state.catFil.length > 0 ) {
                let searchTerm = this.state.catFil;
                searchTerm = searchTerm.toLowerCase();
                let item = pl[ 'CATEGORY' ].toLowerCase();
                if ( !item.match( searchTerm ) ) {
                    return true;
                }
            }
            if ( this.state.cityFil.length > 0 ) {
                let searchTerm = this.state.cityFil;
                searchTerm = searchTerm.toLowerCase();
                let item = pl[ 'CITY' ].toLowerCase();
                if ( !item.match( searchTerm ) ) {
                    return true;
                }
            }
            if ( this.state.addrFil.length > 0 ) {
                let searchTerm = this.state.addrFil;
                searchTerm = searchTerm.toLowerCase();
                let item = pl[ 'ADDRESS' ].toLowerCase();
                if ( !item.match( searchTerm ) ) {
                    return true;
                }
            }
            if ( pl.TODELETE ) return true;
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
                deletePlace={ this.props.deletePlace }
                component={ this.props.component }
            />

                allPlaces.push( current );
        } );
        return(
            <div className="allPlaces">
                <h1>{ this.props.component }</h1>
                <div className="allPlacesContent">
                    <div className="placeHeader">
                        <div className="headerRow"><p>Category</p><br />
                            <span><input type="text" name="filterCateg" onKeyPress={ this.handleKeyPress } /></span><br /><br /></div>
                        <div className="headerRow"><p>City</p><br />
                            <span><input type="text" name="filterCity" onKeyPress={ this.handleKeyPress } /></span><br /><br /></div>
                        <div className="headerRow longer"><p>Address</p><br />
                            <span><input type="text" name="filterAddr" onKeyPress={ this.handleKeyPress } /></span><br /><br /></div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    { confirmButton }
                    <div className="placeFields">
                        { allPlaces }
                    </div>
                </div>
            </div>
        );
    }
}

export default AllPlaces;
