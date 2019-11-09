import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    onOpen: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: '0.5em'
    },
    card: {
        width: '95%',
        margin: '1em'
    }
}));


export default function CardData({ title, content, onOpen }) {
    const classes = useStyles();

    return (
        <Card className={classes.card} onClick={onOpen}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="div">
                        {content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

CardData.propTypes = propTypes;