import React, { Component } from 'react';
import axios from 'axios';
import Input from './input';
import ButtonSearch from './buttonsearch';
import Nav from './Nav';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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
      <div className="App">
        <Grid container spacing={24}>
          <Grid item xs={12}>
      <Card>
      <Nav/>
       <Input word={this.state.word} handleChange={this.handleChange}/>
        <p> {this.state.word} </p>
        <span>{this.state.word2}</span>
        <ButtonSearch handleClick={this.handleClick} />
        </Card>
        </Grid>
        </Grid>
      </div>
    );
  }
  handleChange(e) {
    this.setState({ word: e.target.value})
  }
  handleClick() {
   
    const word = this.state.word
    axios.get('http://localhost:3000/word/check?word=' + word)
    .then(function(resp) {
      console.log(resp.data);
       playable = resp.data
       console.log(playable)
    })
    .catch(function (error) {
      console.log(error)
    })
    console.log(playable)
    this.setState({playable: playable})
    
    this.setState({word: "" });
  }

}


export default withStyles(styles)(App);
