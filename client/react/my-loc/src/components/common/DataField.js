import React, { Component } from 'react';
import '../../App.css';

class DataField extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            opened: false,
        };
        this.onInputChange = this.onInputChange.bind( this );
        this.closeInputField = this.closeInputField.bind( this );
        this.openInputField = this.openInputField.bind( this );
    }

    onInputChange ( event ) {
        var val;
        if ( event.target.options ) {
            var selectedIndex = event.target.options.selectedIndex;
            val = event.target.options[ selectedIndex ].value;
            this.setState( {
                opened: false,
            } );
        } else {
            val = event.target.value;
        }
        this.props.onInputChange( this.props.id, this.props.name, val );
    }

    closeInputField ( event ) {
        this.setState( {
            opened: false,
        } );
    }

    openInputField ( event ) {
        if ( this.props.name === 'submit' ) {
            this.setState( {
                opened: false,
            } );

            this.props.submitChanges( 'users', '_changed' );
            return;
        }
        this.setState( {
            opened: true,
        } );
    }

    render () {
        let field = "";
        if ( this.state.opened ) {
            field = <input 
                className="openedDataField"
                type={ this.props.type }
                name={ this.props.name }
                id={ this.props.id }
                value={ this.props.value } 
                onChange={ this.onInputChange } 
                onBlur={ this.closeInputField }
                autoFocus
            />;

            if ( this.props.type === 'select' ) {
                let arr = [
                    <option value='ADMIN' key="1">ADMIN</option>,
                    <option value='USER' key="2">USER</option>,
                ];
                field = <select onChange={ this.onInputChange } onBlur={ this.closeInputField } value={ this.props.value }>
                    {arr}
                </select>
            }
        } else {
            field = <div  className="closedDataField" onClick={ this.openInputField }>{ this.props.value }</div>
        } 
        return (
            field
        );
    }
}

export default DataField;
