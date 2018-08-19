import React, { Component } from 'react';
import $ from 'jquery';

class AllUsers extends Component {
    constructor ( props ) {
        super( props );

        this.onInputChange = this.onInputChange.bind( this );
    }

    componentDidMount () {
        //this.setState( prevState => {
        //    return { common: this.props.common };
        //} );

        //this.props.callMe( 'catalog' );
        let _this = this;
        $.ajax( {
            method: 'GET',
            url: 'http://localhost:5000/users/all',
            dataType: 'json',
            success: function ( data ) {
                _this.props.update( 'users', '_users', data );
            }
        } );
    }

    onInputChange ( event ) {
        let target = event.target;
        let data = $(target).attr('data');
        this.props.onInputChange( 'users', '_users', data, target.name, target.value );
    }

    render () {
        let hash = this.props.users._users || {};
        var users = [];
        for ( var i in hash ) {
            users.push( hash[ i ] );
        }
        users = users.map( u => 
            <li key={ u.ID }>
                <input type="text" name="USERNAME" data={ u.ID } value={ u.USERNAME } onChange={ this.onInputChange } /> 
                <input type="text" name="PASSWORD" data={ u.ID } value={ u.PASSWORD } onChange={ this.onInputChange } /> 
                <input type="text" name="NAME" data={ u.ID } value={ u.NAME } onChange={ this.onInputChange } /> 
                <input type="text" name="ROLE" data={ u.ID } value={ u.ROLE } onChange={ this.onInputChange } /> 
            </li> );
        return (
            <div>
                <h1>All Users</h1>
                <ul>
                    { users }
                </ul>
            </div>
        );
    }
}

export default AllUsers;
