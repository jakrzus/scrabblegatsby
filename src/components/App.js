import axios from 'axios'
import React, {Component} from 'react'
import Input from './input'
import ButtonSearch from './buttonsearch'
import Nav from './Nav'
import Card from '@material-ui/core/Card'
import {withStyles} from '@material-ui/core/styles'
import FlexView from 'react-flexview'
import './layout.css'
import NavBar from './appbar'
import WordCard from './wordcard'
import {withSnackbar} from 'notistack'
import {ActionCableConsumer} from 'react-actioncable-provider'

const HEROKUAPI = 'https://secret-atoll-12425.herokuapp.com'

const LOCALAPI = 'http://localhost:3000'

const styles = {
    card: {
        minWidth: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    avatar: {
        marginTop: 'auto',
        overflow: 'visible'
    }
}
class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            word: '',
            words: [],
            loading: false,
            connected: false,
            cableWord: {},
            game_sessions: [],
            game_session: ''
        }
        this.handleChange = this
            .handleChange
            .bind(this)
        this.handleWordClick = this
            .handleWordClick
            .bind(this)
        this.handleReceived = this
            .handleReceived
            .bind(this)
        this.updateWords = this
            .updateWords
            .bind(this)
        this.fetchGameSessions = this
            .fetchGameSessions
            .bind(this)
        this.setGameSession = this
            .setGameSession.bind(this)
        this.fetchWords = this
            .fetchWords
            .bind(this)
        this.createGameSession= this
            .createGameSession
            .bind(this)
    }
    render() {

        
        return (

            <div>
                <NavBar gameSessions={this.state.game_sessions} setGameSession={this.setGameSession} game_session={this.state.game_session} fetchWords={this.state.fetchWords} createGameSession={this.createGameSession}/>
                <div className="App center">
                    {this.state.loading && <div className={'loader'}>Sprawdzam...</div>}
                    <FlexView column hAlignContent="center">
                        <Card >
                            <FlexView column hAlignContent="center">
                                <Nav className="paper" connected={this.state.connected}/>
                                <Input word={this.state.word} handleChange={this.handleChange}/>
                                <p>
                                    {this.state.word}
                                </p>
                                <FlexView vAlignContent="center">
                                    <ButtonSearch handleClick={this.handleWordClick}/>
                                </FlexView>
                            </FlexView>
                        </Card>
                        <WordCard words={this.state.words}/>
                        <ActionCableConsumer 
                            channel={{ 
                                channel: 'GameSessionChannel', 
                                id: this.state.game_session }} 
                            onReceived={this.handleReceived}>
                        </ActionCableConsumer>
                        
                    </FlexView>
                </div>
            </div>
        )
    }
    checkConnection() {
        axios
            .get(HEROKUAPI)
            .then((resp) => {
                if (resp.status === 200) {
                    this.setState({connected: true})
                }
                console.log(resp.status)
            })
            .catch(function (error) {
                console.log(error)
            })

    }
    setGameSession(id){
      
        this.setState({game_session: id})
        this.fetchWords(id)
    }
    fetchWords(game_session_id){
        axios.get(HEROKUAPI + '/game_sessions/open',
            {params:{id: game_session_id}})
            .then(resp => {
                this.setState({words: resp.data})
            })
    }
    handleChange(e) {
        this.setState({word: e.target.value})
    }
    handleWordClick() {
        this.setState({loading: true})
        const word = this.state.word
        const game_session_id = this.state.game_session
        var variant
        axios
            .get(HEROKUAPI + '/word/check', {params:{
                word: word,
                game_session_id: game_session_id
            }})
            .then((resp) => {
                console.log(resp.data)
                resp.data
                    ? variant = {
                        text: 'Słowo jest dozwolone w grach',
                        variant: {
                            variant: 'success'
                        }
                    }
                    : variant = {
                        text: 'Słowo jest niedozwolone w grach',
                        variant: {
                            variant: 'error'
                        }
                    }
                this.setState({
                    loading: true,
                    correct: resp.data
                    // ,
                    // words: [
                    //     ...this.state.words, {
                    //         word: word,
                    //         correct: resp.data
                    //     }
                    // ]
                })
            })
            .then(() => {
                this
                    .props
                    .enqueueSnackbar(variant.text, variant.variant)
                this.setState({loading: false, word: ''})
            })
            .catch(function (error) {
                console.log(error)
            })

    }
    fetchGameSessions(){
        axios.get(HEROKUAPI + '/game_sessions/index')
            .then(resp => {
                console.table(resp.data)
                this.setState({game_sessions: resp.data})})
            .then(() => {
                var { game_sessions } = this.state
                var id = game_sessions[game_sessions.length - 1].id
                this.setGameSession(id)})
            .catch(error => {console.log(error)})
    }
    createGameSession(){
        axios.get(HEROKUAPI + '/game_sessions/create')
            .then((resp) => {this.fetchGameSessions()
                console.log(resp)}
            )
            .catch(error => {console.log(error)})
    }
    componentDidMount() {
        this.checkConnection()
        this.fetchGameSessions()
        
    }
    handleReceived(data) {
        var {word} = data
        this.setState({cableWord: word})
        console.log(data)
        this.updateWords(word)
    }
    updateWords(word) {
        // var {words} = this.state
        // if (words.find(word => 
        //     word.id === theWord.id
        // )) {
        //     return null
        // }
        // else{
        //     this.setState({ words: [...words, theWord] })
        // } 
        //TODO Fix it
        this.setState({words: [...this.state.words, word ]})
    }
}

export default withSnackbar(withStyles(styles)(App))
