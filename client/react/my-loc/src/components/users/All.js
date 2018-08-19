import React, { Component } from 'react';
import DataField from '../common/DataField.js';
import  '../../App.css';
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

    onInputChange ( id, name, value ) {
        this.props.onInputChange( 'users', '_users', id, name, value );
    }

    render () {
        let hash = this.props.users._users || {};
        var users = [];
        for ( var i in hash ) {
            users.push( hash[ i ] );
        }
        users = users.map( u => 
            <li key={ u.ID }>
                <DataField type="text" name="USERNAME" id={ u.ID } value={ u.USERNAME } onInputChange={ this.onInputChange } />
                <DataField type="text" name="PASSWORD" id={ u.ID } value={ u.PASSWORD } onInputChange={ this.onInputChange } />
                <DataField type="text" name="ROLE"     id={ u.ID } value={ u.ROLE     } onInputChange={ this.onInputChange } />
            </li> );
        return (
            <div>
                <h1>All Users</h1>
                <ul>
                    <div  className="closedDataField bold">USERNAME</div>
                    <div  className="closedDataField bold">PASSWORD</div>
                    <div  className="closedDataField bold">ROLE</div>
                    { users }
                </ul>
            </div>
        );
    }
}

export default AllUsers;
