import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header.js';
import AllUsers from './components/users/All.js';

class App extends Component {
    constructor ( props )  {
        super( props );
        this.state = {
            users: { _users: { } },
        };

        this.update        = this.update.bind( this );
        this.onInputChange = this.onInputChange.bind( this );
    };

    update ( component, property, data ) {
        this.setState( prevState => {
            let state = {};
            state[ component ] = {};
            state[ component ][ property ] = data;
            return state;
        } );
    }

    onInputChange ( component, property, id, name, data ) {
        this.setState( prevState => {
            let hash = this.state[ component ][ property ];
            hash[ id ][ name ] = data;
            let state = {};
            state[ component ] = {};
            state[ component ][ property ] = hash;
            return state;
        } );
    }

    render() {
      return (
        <div className="App">
            <Header />
            <Route path='/users/all' render={ 
                () => <AllUsers 
                    users={ this.state.users }  
                    update={ this.update } 
                    onInputChange={ this.onInputChange }
            /> } />
        </div>
      );
    }
}

export default App;
