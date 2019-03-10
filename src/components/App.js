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

// const HEROKUAPI = 'https://secret-atoll-12425.herokuapp.com'

const HEROKUAPI = 'http://localhost:3000'

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
            cableWords: []
        }
        this.handleChange = this
            .handleChange
            .bind(this)
        this.handleClick = this
            .handleClick
            .bind(this)
        this.handleReceived = this
            .handleReceived
            .bind(this)
        this.updateWords = this
            .updateWords
            .bind(this)
    }
    render() {

        
        return (

            <div>
                <NavBar/>
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
                                    <ButtonSearch handleClick={this.handleClick}/>
                                </FlexView>
                            </FlexView>
                        </Card>
                        <WordCard words={this.state.words}/>
                        <ActionCableConsumer channel="WordChannel" onReceived={this.handleReceived}>
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
    handleChange(e) {
        this.setState({word: e.target.value})
    }
    handleClick() {
        this.setState({loading: true})
        const word = this.state.word
        var variant
        axios
            .get(HEROKUAPI + '/word/check?word=' + word)
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
                    playable: resp.data,
                    words: [
                        ...this.state.words, {
                            word: word,
                            playable: resp.data
                        }
                    ]
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
    componentDidMount() {
        this.checkConnection()
    }
    handleReceived(data) {
        var {id, word, correct} = data.word
        var theWord = {id, word, correct}
        this.setState({cableWords: [...this.state.cableWords, theWord]})
        console.log(data)
        this.updateWords(theWord)
    }
    updateWords(theWord) {
        var {words} = this.state
        if (words.find(word => 
            word.id === theWord.id
        )) {
            return null
        }
        else{
            this.setState({ words: [...words, theWord] })
        } 
    }
}

export default withSnackbar(withStyles(styles)(App))
