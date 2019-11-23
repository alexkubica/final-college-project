import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Title from "./Title";
import SensorsList from "./SensorsList";
import ErrorSnackbar from "./ErrorSnackbar";
import UVGraph from "./UVGraph";
import WeatherGraph from "./WeatherGraph";
import PostureGraph from "./PostureGraph";
import MovementGraph from "./MovementGraph";
import BottleGraph from "./BottleGraph";
import HeartRateGraph from "./HeartRateGraph";
import {
  returnHome,
  getUVData,
  getHeartRateData,
  getPostureData,
  getWeatherData,
  getMovementData,
  getBottleData,
  MINUTES_IN_MS
} from "./utils";
import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%"
  }
}));

function App() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    uvData: [],
    heartRateData: [],
    distanceData: [],
    movementData: [],
    bottleData: []
  });

  function fetchAllData() {
    return handleError(async () => {
      const [
        uvData,
        weatherData,
        heartRateData,
        postureData,
        movementData,
        bottleData
      ] = await Promise.all([
        getUVData(),
        getWeatherData(),
        getHeartRateData(),
        getPostureData(),
        getMovementData(),
        getBottleData()
      ]);
      setData({
        uvData,
        weatherData,
        heartRateData,
        postureData,
        movementData,
        bottleData
      });
    }, "Failed to load some sensors' data from server");
  }

  function fetchUVData() {
    return handleError(async () => {
      setData({
        ...data,
        uvData: await getUVData()
      });
    }, "Failed to load uv data from server");
  }

  function fetchWeatherData() {
    return handleError(async () => {
      setData({
        ...data,
        weatherData: await getWeatherData()
      });
    }, "Failed to load weather data from server");
  }

  function fetchHeartRateData() {
    return handleError(async () => {
      setData({
        ...data,
        heartRateData: await getHeartRateData()
      });
    }, "Failed to load heart rate data from server");
  }

  function fetchPostureData() {
    return handleError(async () => {
      setData({
        ...data,
        postureData: await getPostureData()
      });
    }, "Failed to load posture data from server");
  }

  function fetchMovementData() {
    return handleError(async () => {
      setData({
        ...data,
        movementData: await getMovementData()
      });
    }, "Failed to load movement data from server");
  }

  function fetchBottleData() {
    return handleError(async () => {
      setData({
        ...data,
        bottleData: await getBottleData()
      });
    }, "Failed to load bottle data from server");
  }

  async function handleError(asyncCallback, errorMsg) {
    try {
      await asyncCallback();
    } catch (e) {
      console.error(errorMsg, e);
      setError(errorMsg);
    }
  }

  async function load(asyncCallback) {
    setLoading(true);
    await asyncCallback();
    setLoading(false);
  }

  useEffect(() => {
    load(fetchAllData);
    const interval = setInterval(() => {
      fetchAllData();
    }, 1 * MINUTES_IN_MS);
    return () => clearInterval(interval);
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Title
              title="Jarvis Mate!"
              onRefresh={() => {
                load(fetchAllData);
              }}
            />
            {loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
            ) : (
              <SensorsList data={data} />
            )}
          </Route>
          <Route path="/uv">
            <Title
              title="Ultraviolet Graph"
              onReturn={returnHome}
              onRefresh={fetchUVData}
            />
            {loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
            ) : (
              <UVGraph data={data.uvData} />
            )}
          </Route>
          <Route path="/weather">
            <Title
              title="Weather Graph"
              onReturn={returnHome}
              onRefresh={fetchWeatherData}
            />
            {loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
            ) : (
              <WeatherGraph data={data.weatherData} />
            )}
          </Route>
          <Route path="/heartrate">
            <Title
              title="Heart Rate Graph"
              onReturn={returnHome}
              onRefresh={fetchHeartRateData}
            />
            {loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
            ) : (
              <HeartRateGraph data={data.heartRateData} />
            )}
          </Route>
          <Route path="/posture">
            <Title
              title="Posture Graph"
              onReturn={returnHome}
              onRefresh={fetchPostureData}
            />
            {loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
            ) : (
              <PostureGraph data={data.postureData} />
            )}
          </Route>
          <Route path="/movement">
            <Title
              title="Movement Graph"
              onReturn={returnHome}
              onRefresh={fetchMovementData}
            />
            {loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
            ) : (
              <MovementGraph data={data.movementData} />
            )}
          </Route>
          <Route path="/bottle">
            <Title
              title="Bottle Graph"
              onReturn={returnHome}
              onRefresh={fetchBottleData}
            />
            {loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress />
              </div>
            ) : (
              <BottleGraph data={data.bottleData} />
            )}
          </Route>
        </Switch>
      </Router>

      {error && (
        <ErrorSnackbar
          error={error}
          onDismiss={() => {
            setError(undefined);
          }}
        />
      )}
    </div>
  );
}

export default App;
