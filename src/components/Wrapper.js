import React, { Component } from 'react'
import {SnackbarProvider} from 'notistack'
import App from './App'
import ActionCable from 'actioncable'
import ActionCableProvider from 'react-actioncable-provider'


const HEROKU_CABLE = 'https://secret-atoll-12425.herokuapp.com/cable'
const LOCAL_CABLE = 'ws://localhost:3000/cable'
const cable = ActionCable.createConsumer(HEROKU_CABLE) 
export default class Wrapper extends Component {
    render() {
        return (
            <div>
                <SnackbarProvider>
                    <ActionCableProvider cable={cable}>
                        <App></App>
                    </ActionCableProvider> 
                </SnackbarProvider>
            </div>
        )
    }
}
