import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from './Title';
import SensorsList from './SensorsList';
import ErrorSnackbar from './ErrorSnackbar';
import { getUVData, getHeartbeatData, getDistanceData, getTiltData, getBottleData } from './utils';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
}));

function App() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    uvData: [],
    heartbeatData: [],
    distanceData: [],
    tiltData: [],
    bottleData: []
  });

  async function loadData() {
    setLoading(true);
    try {
      const [uvData, heartbeatData, distanceData, tiltData, bottleData] = await Promise.all([
        getUVData(),
        getHeartbeatData(),
        getDistanceData(),
        getTiltData(),
        getBottleData()
      ]);
      setData({
        uvData,
        heartbeatData,
        distanceData,
        tiltData,
        bottleData
      });
    }
    catch (e) {
      const errorMsg = "Failed to load some sensors' data from server";
      console.error(errorMsg, e);
      setError(errorMsg);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title
        onRefresh={loadData}
      />
      {loading ?
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
        :
        <SensorsList data={data} />
      }
      {error &&
        <ErrorSnackbar
          error={error}
          onDismiss={() => {
            setError(undefined);
          }}
        />
      }
    </div>
  );
}

export default App;
