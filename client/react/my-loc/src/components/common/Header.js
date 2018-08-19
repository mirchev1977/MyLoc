import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return(
            <div>
                <h1>Header</h1>
                <Link to='/'>Home</Link>
                <br />
                <Link to='/users/all'>List All Users</Link>
                <br />
                <Link to='/about'>About</Link>
                <br />
                <Link to='/logout'>Logout</Link>
                <br />
            </div>
        );
    }
}

export default Header;
