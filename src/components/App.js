import React, { Component } from 'react';
import axios from 'axios';
import Input from './input';
import ButtonSearch from './buttonsearch';
import Nav from './Nav';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import FlexView from 'react-flexview';
import './layout.css';
import NavBar from './appbar';
import WordCard from './wordcard'


 var playable;
const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    marginTop: 'auto',
    overflow: 'visible'
  }
};
class App extends Component {

  constructor(props){
    super(props);
  
    this.state={
      word: "",
      words: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
   
    return (
     <div>
        <NavBar />
      <div className="App center">
          
      <FlexView column hAlignContent="center">
        <Card >
        <FlexView  column hAlignContent="center">
      <Nav className="paper"/>  
       <Input word={this.state.word} handleChange={this.handleChange}/>
        <p> {this.state.word} </p>
        <FlexView vAlignContent="center">
          <ButtonSearch  handleClick={this.handleClick} />
              </FlexView>
            </FlexView>
          </Card>
          <WordCard  words={this.state.words}/>
        </FlexView>
      </div>
      </div>
    );
  }
  handleChange(e) {
    this.setState({ word: e.target.value,
    })
  }
  handleClick() {
    this.setState({loading: true})
    const word = this.state.word
    // async function getJSONAsync(){

    //   let json = axios.get('https://secret-atoll-12425.herokuapp.com/word/check?word=' + word)
    //     return json;
    //   };
    //   let json = getJSONAsync();
    //   console.log(json)
    //   playable = json.data


     axios.get('https://secret-atoll-12425.herokuapp.com/word/check?word=' + word)
     .then((resp) =>{
       console.log(resp.data);
       this.setState({
         loading: true,
         playable: resp.data,
         words: [...this.state.words, {
           word: word,
           playable: resp.data
         }]
       });
     })
     .then(() => this.setState({
       loading: false,
       word: ""
     }))
     .catch(function (error) {
       console.log(error)
     })
    
    
   // this.setState(prevState => {prevState.words.push({word: word, playable: playable})})

   
  }

}


export default withStyles(styles)(App);
