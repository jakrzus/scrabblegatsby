import React, { Component } from 'react'
import {SnackbarProvider} from 'notistack'
import App from './App'
import ActionCable from 'actioncable'
import ActionCableProvider from 'react-actioncable-provider'


const cable = ActionCable.createConsumer('ws://localhost:3000/cable') 
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
