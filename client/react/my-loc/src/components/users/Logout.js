import React, { Component } from 'react';
import { withRouter } from 'react-router';
import $ from 'jquery';

class Logout extends Component {
    componentDidMount () {
        let token = localStorage.getItem( 'LOGGEDIN_TOKEN' );
        let _this = this;
        $.ajax( {
            method: 'POST',
            url: 'http://localhost:5000/logout',
            data: { token: token },
            dataType: 'json',
            success: function ( data ) {
                if ( data[ 'STAT' ] === 'OK' ) {
                    localStorage.clear();
                    _this.props.logout();
                    _this.props.history.push( '/' );
                }
            }
        } );
    }

    render () {
        return ( <h1>Logging out...</h1> );
    }
}

export default withRouter( Logout );
