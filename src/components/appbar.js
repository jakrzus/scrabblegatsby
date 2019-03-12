import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Toolbar from '@material-ui/core/Toolbar'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import avat from '../images/gatsby-icon.png'
import './layout.css'

export default class NavBar extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    render() {
        const {gameSessions, game_session, setGameSession, fetchGameSessions, createGameSession} = this.props
        return (
            <div>
                <AppBar className="navbar">
                    <Toolbar>
                        <div className="avatar">
                            <Avatar className="avatar" 
                                alt="Avatar" src={avat} />
                        </div>
                        <Fab color="primary" aria-label="Add" onClick={createGameSession}>
                            <AddIcon />
                        </Fab>
                        
                        <Select value={game_session} onChange={this.handleChange}>asdsad
                            {gameSessions.map((session) => 
                                <MenuItem key={session.id} value={session.id}>
                                    {session.created_at}
                                </MenuItem>
                            )}
                        </Select>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
    handleChange(e){
        this.props.setGameSession(e.target.value)
    }
}    
AppBar.propTypes = {
    game_session: PropTypes.object
}