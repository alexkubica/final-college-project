import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import RefreshIcon from '@material-ui/icons/Refresh';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
    appBar: {
        marginBottom: '1em'
    }
}));

export default function Title({ onRefresh }) {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Jarvis Mate!
          </Typography>
                <Button
                    onClick={onRefresh}
                    color="inherit"
                    startIcon={<RefreshIcon />}
                >
                    Refresh
                </Button>
            </Toolbar>
        </AppBar>
    );
}

Title.propTypes = {
    onRefresh: PropTypes.func.isRequired
};