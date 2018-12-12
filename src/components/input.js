import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
//import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class Input extends Component {
    render() {
        return (
             <div>
                <TextField
                    id="outlined-search"
                    label="Szukaj"
                    type="search"
                    //className={classes.textField}
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