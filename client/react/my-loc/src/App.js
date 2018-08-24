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
                _new:        { 
                    NEW: {
                        ID: 'NEW',
                        USERNAME: 'NEW',
                        PASSWORD: 'NEW',
                        NAME:     'NEW',
                        ROLE:     'USER',
                    },
                _saved: true,
                },
                _delete: {},
            },
            deleted: '',
            error: '',
        };

        this.update        = this.update.bind( this );
        this.onInputChange = this.onInputChange.bind( this );
        this.submitChanges = this.submitChanges.bind( this );
        this.handleDelete  = this.handleDelete.bind( this );
    };

    update ( component, property, data ) {
        this.setState( prevState => {
            let state = this.state;
            state[ component ][ property ] = data;
            return state;
        } );
    }

    onInputChange ( component, property, id, name, data ) {
        if ( name && data ) {
            this.setState( prevState => {
                let hash = this.state[ component ][ property ];
                hash[ id ][ name ] = data;
                let state = this.state;
                state[ component ][ property ] = hash;
                state[ component ][ '_saved' ] = false;
                return state;
            } );
        }

        this.setState( prevState => {
            let item = this.state[ component ][ property ][ id ];
            let hash = this.state[ component ][ '_changed' ];
            hash[ id ] = item;
            let state = this.state;
            state[ component ][ '_changed' ][ id ] = item;
            return state;
        } );
    }

    submitChanges ( component, property, method, callback ) {
        let hash = this.state[ component ][ property ];
        let errMsg;
        if ( method === 'update' ) {
            for ( let i in hash ) {
                if ( errMsg ) {
                    break;
                }
                for ( var j in hash[ i ] ) {
                    let propValue = hash[ i ][ j ];
                    if ( propValue.length <= 1 && j !== 'ID' ) {
                        errMsg = "The value of the field " + '"' + j + '"' 
                            + '(user:' + hash[ i ][ 'USERNAME' ] + ') cannot be shorter than 2 characters...';
                        break;
                    }
                }
            }
        }

        let json = JSON.stringify( hash );

        this.setState( {
            deleted: '',
        } );

        this.setState( prevState => {
            let state = this.state;
            if ( errMsg ) {
                state.error = "Error: " + errMsg;
            }

            return state;
        } );
        if ( errMsg ) return;

        let _this = this;
        $.ajax( {
            method: 'POST',
            url: 'http://localhost:5000/' + component + '/' + method,
            data: { users: json },
            dataType: 'json',
            success: function ( data ) {
                if ( data[ 'STATUS' ] === 'OK' ) {
                    _this.setState( prevState => {
                        let state = _this.state;
                        state[ component ][ '_saved' ] = true;
                        state[ component ][ property ] = {};
                        callback( true );
                        if ( hash[ 'NEW' ] ) {
                            state[ component ][ '_users' ][ 'NEW' ] = _this.state[ component ][ '_new' ][ 'NEW' ];
                            _this.state[ component ][ '_new' ][ 'NEW' ] = {
                                ID: 'NEW',
                                USERNAME: 'NEW',
                                PASSWORD: 'NEW',
                                NAME:     'NEW',
                                ROLE:     'USER',
                            };
                        }
                    } );
                }
            }
        } );
    }

    handleDelete ( component, property, id ) {
        this.setState( prevState => {
            let item = this.state[ component ][ property ][ id ];
            let state = this.state;
            state[ component ][ '_saved' ] = false;
            state[ component ][ '_delete' ][ id ] = item;
            delete this.state[ component ][ property ][ id ];

           let msg;
            let deleted = [];
            for ( let i in state[ component ][ '_delete' ] ) {
                let delItem = state[ component ][ '_delete' ][ i ];
                if ( component === 'users' ) {
                    deleted.push( delItem[ 'USERNAME' ] );
                    msg = "Deleted users: ";
                }
            }

            msg += deleted.join( ', ' );
            state.deleted = msg;

            return state;
        } );
    }

    render() {
      return (
        <div className="App">
            <Header error={ this.state.error } deleted={ this.state.deleted } error={ this.state.error } />
            <Route path='/users/all' render={ 
                () => <AllUsers 
                    users={ this.state.users }  
                    update={ this.update } 
                    onInputChange={ this.onInputChange }
                    submitChanges = { this.submitChanges }
                    handleDelete={ this.handleDelete }
            /> } />
        </div>
      );
    }
}

export default App;
