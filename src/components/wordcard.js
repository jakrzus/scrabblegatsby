import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip'
import PropTypes from 'prop-types'
import {Mood, MoodBad} from '@material-ui/icons'

 class WordCard extends Component {
  render() {
    return (
      <div>
            <Card className = "words-card"> {
              this.props.words.map((word) => 

            <div>
                  {(word.playable || word.playable === false ) && <WordChip word={word} />}
   
                </div>
                
                  )
            }</Card >
      </div>
    )
  }
}

class WordChip extends Component {
    
    render() {
        const playable = this.props.word.playable;
        var color;
        var icon;
        playable ? color = 'primary' : color = 'secondary';
        playable ? icon = <Mood /> : icon = <MoodBad />
        
      return (
        <div>   
          
         <Chip key={this.props.word} color={color} icon = {icon}
         label={this.props.word.word} />
        </div>
      )
    }
    
}
WordChip.propTypes = {
  word: PropTypes.shape({
    word: PropTypes.text,
    playable: PropTypes.bool.isRequired
  })
}
export default WordCard;