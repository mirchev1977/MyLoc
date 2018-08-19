import React, { Component } from 'react';

class DataField extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            opened: false,
        };
        this.onInputChange = this.onInputChange.bind( this );
    }

    onInputChange ( event ) {
        this.props.onInputChange( this.props.id, this.props.name, event.target.value );
    }

    render () {
        let field = <input 
            type={ this.props.type }
            name={ this.props.name }
            id={ this.props.id }
            value={ this.props.value } 
            onChange={ this.onInputChange } 
        />;
        return (
            field
        );
    }
}

export default DataField;
