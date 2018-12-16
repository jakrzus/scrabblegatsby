import React, { Component } from 'react'
import {SnackbarProvider} from 'notistack';
import App from './App'

export default class Wrapper extends Component {
  render() {
    return (
      <div>
        <SnackbarProvider><App></App></SnackbarProvider>
      </div>
    )
  }
}
