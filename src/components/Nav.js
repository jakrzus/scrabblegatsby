import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LoadingCircle from './loadingcircle'
const styles = theme => ({
    root: {
        ...theme
            .mixins
            .gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
})

class Nav extends Component {

    render() {
        const {classes} = this.props
        return (
            <div>
                <Paper className={classes.root} elevation={1} >
                    <Typography variant="h5" component="h3" align="center">
                        Scrabble {this.props.connected
                            ? null
                            : (
                                <span><LoadingCircle /></span>
                            )
                        }
                    </Typography>
                    <Typography component="p">
                        Wyszukaj słowo w słowniku języka polskiego
                    </Typography>
                </Paper>

            </div>
        )
    }
}

export default withStyles(styles)(Nav)
