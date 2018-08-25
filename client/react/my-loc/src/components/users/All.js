import React, { Component } from 'react';
import DataField from '../common/DataField.js';
import  '../../App.css';
import $ from 'jquery';

class AllUsers extends Component {
    constructor ( props ) {
        super( props );

        this.onInputChange = this.onInputChange.bind( this );
        this.submitChanges = this.submitChanges.bind( this );
        this.handleDelete  = this.handleDelete.bind(  this );
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
        if ( id === 'NEW' ) {
            this.props.onInputChange( 'users', '_new', id, name, value );
        } else {
            this.props.onInputChange( 'users', '_users', id, name, value );
        }
    }

    submitChanges ( component, property, method ) {
        this.props.submitChanges( component, property, method, updated => {
        } );
    }

    handleDelete ( id ) {
        this.props.handleDelete( 'users', '_users', id );
    }

    render () {
        let hash = this.props.users._users || {};
        let nu = this.props.users._new.NEW || {};
        var users = [];
        for ( var i in hash ) {
            users.push( hash[ i ] );
        }
        users = users.map( u => 
            <li key={ u.ID }>
                <DataField type="text"   
                    name="USERNAME" 
                    id={ u.ID } 
                    value={ u.USERNAME } 
                    onInputChange={ this.onInputChange } 
                    component="users"
                />
                <DataField type="text"   
                    name="PASSWORD" 
                    id={ u.ID } 
                    value={ u.PASSWORD } 
                    onInputChange={ this.onInputChange } 
                    component="users"
                />
                <DataField type="text"   
                    name="NAME"     
                    id={ u.ID } 
                    value={ u.NAME     } 
                    onInputChange={ this.onInputChange } 
                    component="users"
                />
                <DataField type="select" 
                    name="ROLE"     
                    id={ u.ID } 
                    value={ u.ROLE     } 
                    onInputChange={ this.onInputChange } 
                    component="users"
                />
                <DataField type="text"   
                    name="Delete" 
                    id={ u.ID } 
                    value="Delete" handleDelete={ this.handleDelete } 
                    component="users"
                /> </li> );

        let submButton = "submitButton";
        let submButtonName;
        if ( !this.props.users[ '_saved' ] ) {
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
                    <div  className="closedDataField bold">NAME</div>
                    <div  className="closedDataField bold">ROLE</div>
                    <li>
                    <DataField 
                        type="text"   
                        name="USERNAME" 
                        id={ nu.ID } 
                        value={ nu.USERNAME } 
                        onInputChange={ this.onInputChange } 
                        component="users"
                    />
                    <DataField 
                        type="text"   
                        name="PASSWORD" 
                        id={ nu.ID } 
                        value={ nu.PASSWORD } 
                        onInputChange={ this.onInputChange } 
                        component="users"
                    />
                    <DataField 
                        type="text"   
                        name="NAME"     
                        id={ nu.ID } 
                        value={ nu.NAME     } 
                        onInputChange={ this.onInputChange } 
                        component="users"
                    />
                    <DataField 
                        type="select" 
                        name="ROLE"     
                        id={ nu.ID } 
                        value={ nu.ROLE     } 
                        onInputChange={ this.onInputChange } 
                        component="users"
                    />
                    </li>
                    { users }
                </ul>
                <span className={ submButton }><DataField type="submit" 
                    name="submit" 
                    value={ submButtonName } 
                    submitChanges={ this.submitChanges } 
                    component="users"
                /></span>
            </div>
        );
    }
}

export default AllUsers;
