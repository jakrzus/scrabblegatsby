import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './layout.css'


class ButtonSearch extends Component {
  
    render() {
        return (
      <div className="button-search"> 
        <Button variant = "contained" color = "primary" onClick ={this.props.handleClick}> Sprawdź Słowo 
        </Button>
      </div>
    )
  }
}
        

export default ButtonSearch;