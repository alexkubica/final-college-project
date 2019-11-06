import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    }
}));

export default function SensorsList({ data }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {JSON.stringify(data)}
        </div>
    );
}

SensorsList.propTypes = {
    data: PropTypes.object.isRequired
};