import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor ( props ) {
        super( props );
    }
    render() {
        let common = this.props.common;

        let deletedMessage = <h1 className="deletedMsg">{ this.props.deleted }</h1>
        let errorMessage = <h1 className="deletedMsg">{ this.props.error }</h1>
        let helloMessage;
        let registerLink;
        let loginLink;
        let logoutLink;
        let listAllUsersLink;
        let myPlaces;
        if ( common.loggedIn[ 'ID' ] || localStorage.getItem( 'LOGGEDIN_ID' ) ) {
            let userName = common.loggedIn.USERNAME || localStorage.getItem( 'LOGGEDIN_USERNAME' );
            let role = common.loggedIn.ROLE || localStorage.getItem( 'LOGGEDIN_ROLE' );
            helloMessage = <h1>Hello, { userName }( { role } )</h1>;
            logoutLink = <Link to='/logout' className="header_link">Logout</Link>;
            if ( common.loggedIn[ 'ROLE' ] === 'ADMIN' || localStorage.getItem( 'LOGGEDIN_ROLE' ) === 'ADMIN') {
                listAllUsersLink = <Link to='/users/all' className="header_link">List All Users</Link>
            }
            myPlaces = <Link to='/myplaces' className="header_link">My Places</Link>;
        } else {
            registerLink = <Link to='/users/register' className="header_link">Register</Link>;
            loginLink    = <Link to='/users/login' className="header_link">Log In</Link>;
        }
        return(
            <div className="header">
                <h1>Welcome to MyLoc</h1>
                <h5>Keep all your places of interest here!</h5>
                <Link to='/' className="header_link">Home</Link>
                { myPlaces }
                { listAllUsersLink }
                { registerLink }
                { loginLink }
                { logoutLink }
                { deletedMessage }
                { errorMessage }
                { helloMessage }
            </div>
        );
    }
}

export default Header;
