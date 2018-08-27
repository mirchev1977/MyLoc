import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import { withRouter } from 'react-router';
import Header from './components/common/Header.js';
import AllUsers from './components/users/All.js';
import Register from './components/users/Register.js';
import Login from './components/users/LogIn.js';
import Logout from './components/users/Logout.js';
import AllPlaces from './components/places/AllPlaces.js';
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
            places: {
                _places: { 
                    0: { ID: 0, CATEGORY: 'NEW', CITY: 'NEW', ADDRESS: 'Some new address', PUBLIC: 'YES', 
                    TOVISIT: 0, LATLNG: '', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/y9msaz6e', 
                        USERID: 1 }, 
                    1: { ID: 1, CATEGORY: 'Cinema', CITY: 'Sofia', ADDRESS: 'Some address in Sofia', PUBLIC: 'YES', 
                    TOVISIT: 0, LATLNG: '42.6980274 , 23.323468', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/y94zpxvk ', USERID: 1 }, 
                    2: { ID: 2, CATEGORY: 'Theater', CITY: 'Plovdiv', ADDRESS: 'Some address in Plovdiv', PUBLIC: 'YES', 
                    TOVISIT: 0, LATLNG: '42.1468899 , 24.7488805', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/y792z4y2', USERID: 1 }, 
                    3: { ID: 3, CATEGORY: 'Car Service', CITY: 'Varna', ADDRESS: 'Some address in Varna', PUBLIC: 'YES', 
                    TOVISIT: 0, LATLNG: '43.2263393 , 27.8602098', NOTES: 'Some notes here...', PIC: 'https://tinyurl.com/ybpgm2n8', USERID: 1 }, 
                }, 
                _changed: {},
                _placesChanges: false,
                _saved: true,
            },
            deleted: '',
            error: '',
            common: {
                loggedIn: {},
            },
        };

        this.update          = this.update.bind( this );
        this.onInputChange   = this.onInputChange.bind( this );
        this.submitChanges   = this.submitChanges.bind( this );
        this.handleDelete    = this.handleDelete.bind( this );
        this.printError      = this.printError.bind( this );
        this.handleRegister  = this.handleRegister.bind( this );
        this.checkLoggedIn   = this.checkLoggedIn.bind( this );
        this.logout          = this.logout.bind( this );
    };

    update ( component, property, data ) {
        this.setState( prevState => {
            let state = this.state;
            state[ component ][ '_saved' ] = true;
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
                if ( component === 'places' ) {
                    state[ component ][ '_placesChanges' ] = true;
                }
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

    placesConfirmChanges = () => {
        this.setState( prevState => {
            let state = this.state;
            state[ 'places' ][ '_placesChanges' ] = false;;
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

    printError ( msg ) {
        msg = 'Error: ' + msg;
        this.setState( {
            error: msg,
        } );

        setTimeout( () => {
            this.setState( {
                error: '',
            } );
        }, 10000 );
    }

    handleRegister ( data, error, success ) {
        success( data );
        this.setState( prevState => {
            let state = this.state;
            state[ 'common' ][ 'loggedIn' ] = data;
            return state;
        } );
    }

    componentDidMount () {
        this.checkLoggedIn();
    }

    checkLoggedIn () {
        let uid    = localStorage.getItem( 'LOGGEDIN_ID'       );
        let uname  = localStorage.getItem( 'LOGGEDIN_NAME'     );
        let urole  = localStorage.getItem( 'LOGGEDIN_ROLE'    );
        let utoken = localStorage.getItem( 'LOGGEDIN_TOKEN'    );
        let uuname = localStorage.getItem( 'LOGGEDIN_USERNAME' );
        if ( !uid || !uname || !urole || !utoken || !uuname ) {
            return;
        }

        let user = {
            ID      : uid,
            USERNAME: uuname,
            NAME    : uname,
            ROLE    : urole,
            TOKEN   : utoken,
        };

        let user_json = JSON.stringify( user );

        let _this = this;
        $.ajax( {
            method: 'POST',
            url: 'http://localhost:5000/check/loggedin',
            data: { user: user_json },
            dataType: 'json',
            success: function ( data ) {
                if ( !data.STAT )  {
                    localStorage.clear();
                    _this.props.history.push('/'); 
                    return;
                }

                _this.setState( prevState => {
                    let state = _this.state;
                    state.common.loggedIn = user;

                    return state;
                });
            }
        });
    } 

    logout () {
        this.setState( prevState => {
            let state = this.state;
            state[ 'common' ][ 'loggedIn' ] = {};
            return state;
        } );
    }

    render() {
      return (
        <div className="App">
            <Header error={ this.state.error } deleted={ this.state.deleted } error={ this.state.error } 
                common={ this.state.common } />
            <Route path='/users/all' render={ 
                () => <AllUsers 
                    users={ this.state.users }  
                    update={ this.update } 
                    onInputChange={ this.onInputChange }
                    submitChanges = { this.submitChanges }
                    handleDelete={ this.handleDelete }
            /> } />
            <Route path='/users/register' render={
                () => <Register 
                    printError={ this.printError } 
                    loggedIn={ this.state.common.loggedIn }
                    handleRegister={ this.handleRegister } /> } />
            <Route path='/users/login' render={
                () => <Login 
                    printError={ this.printError } 
                    loggedIn={ this.state.common.loggedIn }
                    checkLoggedIn={ this.checkLoggedIn } /> } />
            <Route path='/logout' render={
                () => <Logout logout={ this.logout } /> } />
            <Route path='/myplaces' render={
                () => <AllPlaces 
                    common={ this.state.common } 
                    places={ this.state.places }
                    confirmChanges={ this.placesConfirmChanges }
                    placesChanges={ this.state.places._placesChanges }
                    onInputChange={ this.onInputChange } /> } />
        </div>
      );
    }
}

export default withRouter( App );
