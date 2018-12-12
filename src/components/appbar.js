import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import avat from '../images/gatsby-icon.png';
import './layout.css'

export default class NavBar extends Component {
  render() {
    return (
      <div>
            <AppBar className="navbar" position="fixed"><Toolbar><div className="avatar"><Avatar className="avatar" alt="Avatar" src={avat} /></div></Toolbar></AppBar>
      </div>
    )
  }
}
