import React, { Component } from 'react';
import DataField from '../common/DataField.js';
import  '../../App.css';
import $ from 'jquery';

class AllUsers extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            changed: false,
        };

        this.onInputChange = this.onInputChange.bind( this );
        this.submitChanges = this.submitChanges.bind( this );
    }

    componentDidMount () {
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
        this.setState( {
            changed: true,
        } );
        this.props.onInputChange( 'users', '_users', id, name, value );
    }

    submitChanges ( component, property ) {
        this.props.submitChanges( component, property, updated => {
            if ( updated ) {
                this.setState( {
                    changed: false,
                } );
            }
        } );
    }

    render () {
        let hash = this.props.users._users || {};
        var users = [];
        for ( var i in hash ) {
            users.push( hash[ i ] );
        }
        users = users.map( u => 
            <li key={ u.ID }>
                <DataField type="text"   name="USERNAME" id={ u.ID } value={ u.USERNAME } onInputChange={ this.onInputChange } />
                <DataField type="text"   name="PASSWORD" id={ u.ID } value={ u.PASSWORD } onInputChange={ this.onInputChange } />
                <DataField type="select" name="ROLE"     id={ u.ID } value={ u.ROLE     } onInputChange={ this.onInputChange } />
            </li> );

        let submButton = "submitButton";
        let submButtonName;
        if ( this.state.changed ) {
            submButton += ' changedRed';
            submButtonName = "Unsaved...";
        } else {
            submButton += ' unchangedGreen';
            submButtonName = "Saved...";
        }

        return (
            <div className="All">
                <h1>All Users</h1>
                <ul>
                    <div  className="closedDataField bold">USERNAME</div>
                    <div  className="closedDataField bold">PASSWORD</div>
                    <div  className="closedDataField bold">ROLE</div>
                    { users }
                </ul>
                <span className={ submButton }><DataField type="submit" name="submit" value={ submButtonName } 
                    submitChanges={ this.submitChanges } /></span>
            </div>
        );
    }
}

export default AllUsers;
