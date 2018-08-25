import React, { Component } from 'react';
import { withRouter } from 'react-router';
import DataField from '../common/DataField.js';
import  '../../App.css';
import $ from 'jquery';


class Register extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            USERNAME: 'Enter here USERNAME',
            _USERNAME: 'Enter here USERNAME',
            PASSWORD: 'Enter here PASSWORD',
            _PASSWORD: 'Enter here PASSWORD',
            REPEATPW: 'Repeat here the PASSWОRD',
            _REPEATPW: 'Repeat here the PASSWОRD',
            NAME    : 'Enter here your NAМE',
            _NAME    : 'Enter here your NAМE',
        };

        this.onInputChange     = this.onInputChange.bind( this );
        this.handleOnClick     = this.handleOnClick.bind(  this );
        this.handleCloseField  = this.handleCloseField.bind(  this );
        this.submitChanges = this.submitChanges.bind( this );
        //this.handleDelete  = this.handleDelete.bind(  this );
    }

    onInputChange ( id, name, value ) {
        this.setState( prevState => {
            let state = this.state;
            state[ name ] = '';
            state[ name ] = value;
            return state;
        } );
    }

    handleOnClick ( name ) {
        this.setState( { [name]: '' } );
    }

    handleCloseField ( name ) {
        if ( !this.state[ name ] ) {
            this.setState( { [name]: this.state[ '_' + name ] } );
        }
    }

    submitChanges () {
        let state = this.state;
        let empty = false;
        for ( var i in state  ) {
            let field = state[ i ].trim();
            let toRemove = i.toString().match( /^_/ );

            if ( toRemove ) {
                delete state[ i ];
                continue;
            }

            if ( field.match( 'Enter here' ) ) { 
                let msg = 'You have unfilled fields';
                this.props.printError ( msg );
                return;
            }
        }

        if ( state[ 'PASSWORD' ] !== state[ 'REPEATPW' ] ) {
            let msg = 'PASSWORD AND REPEATPW don\'t match';
            this.props.printError ( msg );
            return;
        }

        let json = JSON.stringify( state );

        let _this = this;
        $.ajax( {
            method: 'POST',
            url: 'http://localhost:5000/' + 'users' + '/' + 'register',
            data: { user: json },
            dataType: 'json',
            success: function ( data ) {
                let registered = data[ 'REGISTERED' ];

                if ( registered ) {
                    _this.props.handleRegister( registered, 
                        function ( err ) {
                            if ( err ) {
                                _this.props.printError ( 'System error' );
                            }
                        }, 
                        function ( data ) {
                            localStorage.setItem( 'LOGGEDIN_ID',       data[ 'ID' ] );
                            localStorage.setItem( 'LOGGEDIN_NAME',     data[ 'NAME' ] );
                            localStorage.setItem( 'LOGGEDIN_USERNAME', data[ 'USERNAME' ] );
                            localStorage.setItem( 'LOGGEDIN_ROLE',     data[ 'ROLE' ] );
                            _this.props.setCookie( data[ 'SESS' ] );
                            _this.props.history.push('/'); 
                    } );
                }
            }
        } );
    }

    render () {
        return (
            <div className="register">
                <h1>Register</h1>
                <DataField type="text"   
                    name="USERNAME" 
                    id={ 'NEW' } 
                    value={ this.state.USERNAME } 
                    onInputChange={ this.onInputChange } 
                    handleOnClick={ this.handleOnClick }
                    handleCloseField={ this.handleCloseField }
                    component="register"
                 />
                <br />
                <DataField type="text"   
                    name="PASSWORD" 
                    id={ 'NEW' } 
                    value={ this.state.PASSWORD } 
                    onInputChange={ this.onInputChange } 
                    handleOnClick={ this.handleOnClick }
                    handleCloseField={ this.handleCloseField }
                    component="register"
                />
                <br />
                <DataField type="text"   
                    name="REPEATPW" id={ 'NEW' } 
                    value={ this.state.REPEATPW } 
                    onInputChange={ this.onInputChange } 
                    handleOnClick={ this.handleOnClick }
                    handleCloseField={ this.handleCloseField }
                    component="register"
                />
                <br />
                <DataField type="text"   
                    name="NAME"     
                    id={ 'NEW' } 
                    value={ this.state.NAME     } 
                    onInputChange={ this.onInputChange } 
                    handleOnClick={ this.handleOnClick }
                    handleCloseField={ this.handleCloseField }
                    component="register"
                />
            <br />
                <span className="submRegister">
                    <DataField type="submit" 
                        name="submit" 
                        value="Submit" 
                        submitChanges={ this.submitChanges } 
                        component="register"
                /></span>

            </div>
        );
    }
}

export default withRouter( Register ) ;
