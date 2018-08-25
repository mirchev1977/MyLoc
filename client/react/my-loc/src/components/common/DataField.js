import React, { Component } from 'react';
import '../../App.css';

class DataField extends Component {
    constructor ( props ) {
        super( props );

        this.state = {
            opened: false,
        };
        this.onInputChange   = this.onInputChange.bind(   this );
        this.closeInputField = this.closeInputField.bind( this );
        this.openInputField  = this.openInputField.bind(  this );
        this.handleKeypress  = this.handleKeypress.bind(  this );
        this.handleDelete    = this.handleDelete.bind(    this );
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
        if ( this.props.component === 'register' ) {
            this.props.handleCloseField( this.props.name );
        }
        this.setState( {
            opened: false,
        } );
    }

    openInputField ( event ) {
        if ( this.props.name === 'submit' ) {
            this.setState( {
                opened: false,
            } );

            if ( this.props.component === 'users' ) {
                this.props.submitChanges( 'users', '_changed', 'update' );
                this.props.submitChanges( 'users', '_delete', 'delete' );
            } else if ( this.props.component === 'register' ) {
                this.props.submitChanges();
            }
            return;
        }

        if ( this.props.component === 'register' ) {
            this.props.handleOnClick( this.props.name );
        }

        this.setState( {
            opened: true,
        } );
    }

    handleKeypress ( event ) {
        if ( event.key === 'Enter' ) {
            this.setState( {
                opened: false,
            } );
        }
    }

    handleDelete ( event ) {
        this.props.handleDelete( this.props.id );
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
                onKeyPress={ this.handleKeypress }
                autoFocus
            />;

            if ( this.props.type === 'select' ) {
                let arr = [
                    <option value='ADMIN' key="1">ADMIN</option>,
                    <option value='USER' key="2">USER</option>,
                ];
                field = <select className="select" 
                onChange={ this.onInputChange } onBlur={ this.closeInputField } value={ this.props.value }
                onKeyPress={ this.handleKeypress }
                    >
                    {arr}
                </select>
            }
        }  else if ( this.props.name === 'Delete'  ) {
            field = <div  className="del_btn" onClick={ this.handleDelete }>{ this.props.value }</div>
        }
        else {
            let classNm = "closedDataField";
            if ( this.props.id === 'NEW' ) {
                classNm += " new_item";
            }
            field = <div  className={ classNm } onClick={ this.openInputField }>{ this.props.value }</div>
        } 
        return (
            field
        );
    }
}

export default DataField;
