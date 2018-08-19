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
        this.props.onInputChange( this.props.id, this.props.name, event.target.value );
    }

    closeInputField () {
        this.setState( {
            opened: false,
        } );
    }

    openInputField ( event ) {
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
        } else {
            field = <div  className="closedDataField" onClick={ this.openInputField }>{ this.props.value }</div>
        }
        return (
            field
        );
    }
}

export default DataField;
