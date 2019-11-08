import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from './Title';
import SensorsList from './SensorsList';
import ErrorSnackbar from './ErrorSnackbar';
import UVGraph from './UVGraph';
import WeatherGraph from './WeatherGraph';
import PostureGraph from './PostureGraph';
import MovementGraph from './MovementGraph';
import BottleGraph from './BottleGraph';
import HeartbeatGraph from './HeartbeatGraph';
import { returnHome, getUVData, getHeartbeatData, getPostureData, getWeatherData, getMovementData, getBottleData } from './utils';
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
    height: '80%',
  }
}));

function App() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    uvData: [],
    heartbeatData: [],
    distanceData: [],
    movementData: [],
    bottleData: []
  });

  async function fetchAllData() {
    await load(async () => {
      await handleError(async () => {
        const [uvData, weatherData, heartbeatData, postureData, movementData, bottleData] = await Promise.all([
          getUVData(),
          getWeatherData(),
          getHeartbeatData(),
          getPostureData(),
          getMovementData(),
          getBottleData()
        ]);
        setData({
          uvData,
          weatherData,
          heartbeatData,
          postureData,
          movementData,
          bottleData
        });
      }, "Failed to load some sensors' data from server");
    });
  }

  async function fetchUVData() {
    await load(async () => {
      await handleError(async () => {
        setData({
          ...data,
          uvData: await getUVData()
        });
      }, "Failed to load uv data from server");
    });
  }

  async function fetchWeatherData() {
    await load(async () => {
      await handleError(async () => {
        setData({
          ...data,
          weatherData: await getWeatherData()
        });
      }, "Failed to load weather data from server");
    });
  }

  async function fetchHeartbeatData() {
    await load(async () => {
      await handleError(async () => {
        setData({
          ...data,
          heartbeatData: await getHeartbeatData()
        });
      }, "Failed to load heartbeat data from server");
    });
  }

  async function fetchPostureData() {
    await load(async () => {
      await handleError(async () => {
        setData({
          ...data,
          postureData: await getPostureData()
        });
      }, "Failed to load posture data from server");
    });
  }

  async function fetchMovementData() {
    await load(async () => {
      await handleError(async () => {
        setData({
          ...data,
          movementData: await getMovementData()
        });
      }, "Failed to load movement data from server");
    });
  }

  async function fetchBottleData() {
    await load(async () => {
      await handleError(async () => {
        setData({
          ...data,
          bottleData: await getBottleData()
        });
      }, "Failed to load bottle data from server");
    });
  }

  async function handleError(asyncCallback, errorMsg) {
    try {
      await asyncCallback();
    }
    catch (e) {
      console.error(errorMsg, e);
      setError(errorMsg);
    }
  }

  async function load(asyncCallback, errorMsg) {
    setLoading(true);
    await handleError(asyncCallback, errorMsg);
    setLoading(false);
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Title
              title='Jarvis Mate!'
              onRefresh={fetchAllData}
            />
            {
              loading ?
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
                :
                <SensorsList data={data} />
            }
          </Route>
          <Route path="/uv">
            <Title
              title='Ultraviolet Graph'
              onReturn={returnHome}
              onRefresh={fetchUVData}
            />
            {
              loading ?
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
                :
                <UVGraph />
            }
          </Route>
          <Route path="/weather">
            <Title
              title='Weather Graph'
              onReturn={returnHome}
              onRefresh={fetchWeatherData}
            />
            {
              loading ?
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
                :
                <WeatherGraph />
            }
          </Route>
          <Route path="/heartbeat">
            <Title
              title='Heartbeat Graph'
              onReturn={returnHome}
              onRefresh={fetchHeartbeatData}
            />
            {
              loading ?
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
                :
                <HeartbeatGraph />
            }
          </Route>
          <Route path="/posture">
            <Title
              title='Posture Graph'
              onReturn={returnHome}
              onRefresh={fetchPostureData}
            />
            {
              loading ?
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
                :
                <PostureGraph />
            }
          </Route>
          <Route path="/movement">
            <Title
              title='Movement Graph'
              onReturn={returnHome}
              onRefresh={fetchMovementData}
            />
            {
              loading ?
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
                :
                <MovementGraph />
            }
          </Route>
          <Route path="/bottle">
            <Title
              title='Bottle Graph'
              onReturn={returnHome}
              onRefresh={fetchBottleData}
            />
            {
              loading ?
                <div className={classes.loadingContainer}>
                  <CircularProgress />
                </div>
                :
                <BottleGraph />
            }
          </Route>
        </Switch>
      </Router>

      {
        error &&
        <ErrorSnackbar
          error={error}
          onDismiss={() => {
            setError(undefined);
          }}
        />
      }
    </div >
  );
}

export default App;
