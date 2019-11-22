import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import RefreshIcon from "@material-ui/icons/Refresh";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  appBar: {
    marginBottom: "1em"
  },
  returnButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function Title({ onReturn, title, onRefresh }) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {onReturn && (
          <IconButton
            edge="start"
            onClick={onReturn}
            className={classes.returnButton}
            color="inherit"
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {onRefresh && (
          <Button
            onClick={onRefresh}
            color="inherit"
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

Title.propTypes = {
  onReturn: PropTypes.func,
  title: PropTypes.string.isRequired,
  onRefresh: PropTypes.func
};
