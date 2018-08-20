import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header.js';
import AllUsers from './components/users/All.js';
import $ from 'jquery';

class App extends Component {
    constructor ( props )  {
        super( props );
        this.state = {
            users: { 
                _users:      { },
                _changed:    { },
            },
        };

        this.update        = this.update.bind( this );
        this.onInputChange = this.onInputChange.bind( this );
        this.submitChanges = this.submitChanges.bind( this );
    };

    update ( component, property, data ) {
        this.setState( prevState => {
            let state = this.state;
            state[ component ][ property ] = data;
            return state;
        } );
    }

    onInputChange ( component, property, id, name, data ) {
        this.setState( prevState => {
            let hash = this.state[ component ][ property ];
            hash[ id ][ name ] = data;
            let state = this.state;
            state[ component ][ property ] = hash;
            return state;
        } );

        this.setState( prevState => {
            let item = this.state[ component ][ property ][ id ];
            let hash = this.state[ component ][ '_changed' ];
            hash[ id ] = item;
            let state = this.state;
            state[ component ][ '_changed' ][ id ] = item;
            return state;
        } );
    }

    submitChanges ( component, property, callback ) {
        let hash = this.state[ component ][ property ];
        let json = JSON.stringify( hash );

        let _this = this;
        $.ajax( {
            method: 'POST',
            url: 'http://localhost:5000/users/update',
            data: { users: json },
            dataType: 'json',
            success: function ( data ) {
                if ( data[ 'STATUS' ] === 'OK' ) {
                    _this.setState( prevState => {
                        let state = _this.state;
                        state[ component ][ property ] = {};
                        callback( true );
                    } );
                }
            }
        } );
    }

    render() {
      return (
        <div className="App">
            <Header />
            <Route path='/users/all' render={ 
                () => <AllUsers 
                    users={ this.state.users }  
                    update={ this.update } 
                    onInputChange={ this.onInputChange }
                    submitChanges = { this.submitChanges }
            /> } />
        </div>
      );
    }
}

export default App;
