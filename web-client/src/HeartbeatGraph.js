import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const propTypes = {
};

const useStyles = makeStyles(theme => ({
}));


export default function HeartbeatGraph({ }) {
    const classes = useStyles();

    return (
        <div>
            HeartbeatGraph
        </div>
    );
}

HeartbeatGraph.propTypes = propTypes;