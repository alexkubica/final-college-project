import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import RefreshIcon from '@material-ui/icons/Refresh';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './App.css';

const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: '1em'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Jarvis Mate!
          </Typography>
          <Button
            color="inherit"
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
        </Toolbar>
      </AppBar>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

export default App;
