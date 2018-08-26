import React, { Component } from 'react';
import MyPlace from './MyPlace.js';

class AllPlaces extends Component {
    render() {
        return(
            <div className="allPlaces">
                <h1>All Places</h1>
                <div className="placeHeader">
                    <p>Category</p>
                    <p>City</p>
                    <p className="longer">Address</p>
                </div>
                <div className="placeFields">
                    <MyPlace />
                    <MyPlace />
                    <MyPlace />
                </div>
            </div>
        );
    }
}

export default AllPlaces;
