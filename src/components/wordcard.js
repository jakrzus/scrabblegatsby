import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip'

 class WordCard extends Component {
  render() {
    return (
      <div>
            <Card className="words-card"> {this.props.words.map((word) => <WordChip word={word} />)}</Card>
      </div>
    )
  }
}

class WordChip extends Component {
    
    render() {
        const playable = this.props.word.playable;
        var color;
        playable ? color = 'primary' : color = 'secondary';
      return (
        <div>
            
         <Chip key={this.props.word}color={color} label={this.props.word.word} />
        </div>
      )
    }
}

export default WordCard;