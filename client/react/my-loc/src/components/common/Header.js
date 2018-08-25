import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor ( props ) {
        super( props );
    }
    render() {
        let deletedMessage = <h1 className="deletedMsg">{ this.props.deleted }</h1>
        let errorMessage = <h1 className="deletedMsg">{ this.props.error }</h1>
        let common = this.props.common;
        let userName = '';
        if ( common.loggedIn ) {
            userName = common.loggedIn.USERNAME;
        }
        let helloMessage = userName ? <h1>Hello, { userName }</h1> : '';
        return(
            <div className="header">
                <h1>Welcome to MyLoc</h1>
                <h5>Keep all your places of interest here!</h5>
                <Link to='/' className="header_link">Home</Link>
                <Link to='/users/all' className="header_link">List All Users</Link>
                <Link to='/users/register' className="header_link">Register</Link>
                <Link to='/logout' className="header_link">Logout</Link>
                { deletedMessage }
                { errorMessage }
                { helloMessage }
            </div>
        );
    }
}

export default Header;
