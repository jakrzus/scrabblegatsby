import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Input extends Component {
    render() {
        return (
             <div>
                <TextField
                    id="outlined-search"
                    label="Szukaj"
                    type="search"
                    margin="normal"
                    variant="outlined"
                    value={this.props.word} 
                    onChange={this.props.handleChange}
                />
        </div>
        );
    }
}

export default Input;