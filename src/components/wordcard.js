import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip'
import PropTypes from 'prop-types'
import {Mood, MoodBad} from '@material-ui/icons'

const styles = {
    chip: {
        margin: '0.4rem 0.2rem 0.2rem 0.4rem'
    },
    chipwin: {
        background: 'green',
        margin: '0.4rem 0.2rem 0.2rem 0.4rem',
        textcolor: '#000'
    },
    chiploose: {
        background: 'red',
        margin: '0.4rem 0.2rem 0.2rem 0.4rem'
    }
};
class WordCard extends Component {
    render() {
        return (
            <div>
                <Card className="words-card">
                    {this
                        .props
                        .words
                        .map((word) => <div>
                            {(word.playable || word.playable === false) && <WordChip key={word} word={word}/>}

                        </div>)
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
        playable
            ? color = styles.chipwin
            : color = styles.chiploose;
        playable
            ? icon = <Mood/>
            : icon = <MoodBad/>

        return (
            <div>

                <Chip
                    style={color}
                    clickable={true}
                    onDelete={() => {}}
                    key={this.props.word}
                    icon={icon}
                    label={this.props.word.word}/>
            </div>
        )
    }

}
WordChip.propTypes = {
    word: PropTypes.shape({word: PropTypes.text, playable: PropTypes.bool.isRequired})
}
export default WordCard;