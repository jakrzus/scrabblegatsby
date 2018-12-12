import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ButtonSearch extends Component {
    render() {
        return (

      <div>
        < Button variant = "contained"
        color = "primary"
        onClick = {
          this.props.handleClick
        } > Sprawdź Słowo < /Button>
      </div>
    )
  }
}
        

export default ButtonSearch;