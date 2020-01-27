import moment from "moment";
import PropTypes from "prop-types";

export const DataPropType = PropTypes.exact({
  timestamp: PropTypes.objectOf(Date),
  value: PropTypes.any
});

export function returnHome() {
  window.location.href = "/";
}

// helper function
// used as: delayedPromise(1000, "hey")
// will return a promise that will resolve with "hey" in 1000ms.
function delayedPromise(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getRandomFloatInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Number.parseFloat(
    Number.parseFloat(Math.random() * (max - min + 1) + min).toFixed(1)
  ); //The maximum is inclusive and the minimum is inclusive
}

export function graphSubtitleText() {
  return document.ontouchstart === undefined
    ? "Click and drag to zoom in. Hold down shift key to pan."
    : "Pinch the chart to zoom in. Touch and hold with two fingers to pan.";
}

export const GRAPH_DATE_FORMAT = "%d/%m/%Y %H:%M:%S";

const USE_REAL_API = true;
const DATA_SIZE = 100;
export const SECONDS_IN_MS = 1000;
export const MINUTES_IN_MS = 60 * SECONDS_IN_MS;
export const HOURS_IN_MS = 60 * MINUTES_IN_MS;
export const DAYS_IN_MS = 24 * HOURS_IN_MS;
const SERVER_URL = "http://localhost:8080";

function fakeUVData() {
  return [
    {
      timestamp: Date.UTC(2020, 1, 25, -2),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, -1),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 0),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 1),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 2),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 3),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 4),
      value: 0.5
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 5),
      value: 1
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 6),
      value: 1.7
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 7),
      value: 2
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 8),
      value: 2.3
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 9),
      value: 3.5
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 10),
      value: 3.7
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 11),
      value: 3.2
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 12),
      value: 3
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 13),
      value: 2.6
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 14),
      value: 1.9
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 15),
      value: 1.3
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 16),
      value: 1
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 17),
      value: 0.8
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 18),
      value: 0.7
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 19),
      value: 0.3
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 20),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 21),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 22),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 23),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 24),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 25),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 26),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 27),
      value: 0
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 28),
      value: 0.3
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 29),
      value: 0.7
    },
    {
      timestamp: Date.UTC(2020, 1, 25, 30),
      value: 1.1
    }
  ];
  return new Array(100).fill().map((x, i, arr) => {
    return {
      timestamp: new Date(new Date().getTime() - i * HOURS_IN_MS),
      value: getRandomFloatInclusive(0, 2)
    };
  });
}

function fakeHeartRateData() {
  return [
    {
      timestamp: new Date(new Date().getTime() - 0 * MINUTES_IN_MS),
      value: 70
    },
    {
      timestamp: new Date(new Date().getTime() - 1 * MINUTES_IN_MS),
      value: 73
    },
    {
      timestamp: new Date(new Date().getTime() - 2 * MINUTES_IN_MS),
      value: 74
    },
    {
      timestamp: new Date(new Date().getTime() - 3 * MINUTES_IN_MS),
      value: 72
    },
    {
      timestamp: new Date(new Date().getTime() - 4 * MINUTES_IN_MS),
      value: 73
    },
    {
      timestamp: new Date(new Date().getTime() - 5 * MINUTES_IN_MS),
      value: 77
    },
    {
      timestamp: new Date(new Date().getTime() - 6 * MINUTES_IN_MS),
      value: 80
    },
    {
      timestamp: new Date(new Date().getTime() - 7 * MINUTES_IN_MS),
      value: 87
    },
    {
      timestamp: new Date(new Date().getTime() - 8 * MINUTES_IN_MS),
      value: 90
    },
    {
      timestamp: new Date(new Date().getTime() - 9 * MINUTES_IN_MS),
      value: 99
    },
    {
      timestamp: new Date(new Date().getTime() - 10 * MINUTES_IN_MS),
      value: 111
    },
    {
      timestamp: new Date(new Date().getTime() - 11 * MINUTES_IN_MS),
      value: 125
    },
    {
      timestamp: new Date(new Date().getTime() - 12 * MINUTES_IN_MS),
      value: 123
    },
    {
      timestamp: new Date(new Date().getTime() - 13 * MINUTES_IN_MS),
      value: 110
    },
    {
      timestamp: new Date(new Date().getTime() - 14 * MINUTES_IN_MS),
      value: 94
    },
    {
      timestamp: new Date(new Date().getTime() - 15 * MINUTES_IN_MS),
      value: 72
    },
    {
      timestamp: new Date(new Date().getTime() - 16 * MINUTES_IN_MS),
      value: 70
    }
  ];

  return new Array(DATA_SIZE).fill().map((x, i, arr) => {
    return {
      timestamp: new Date(new Date().getTime() - i * 30 * SECONDS_IN_MS),
      value: getRandomIntInclusive(60, 70)
    };
  });
}

function fakePostureData() {
  let x = new Array(30).fill().map((x, i, arr) => {
    return {
      timestamp: new Date(new Date().getTime() - i * 1 * MINUTES_IN_MS),
      value: getRandomFloatInclusive(85, 95)
    };
  });

  x[20].value = 163;

  x[10].value = 5;
  x[11].value = 3;

  x[25].value = 110;
  x[26].value = 112;
  x[27].value = 113;
  x[28].value = 113;

  return x;
}

function fakeWeatherData() {
  return [
    {
      timestamp: new Date(new Date().getTime() - 0 * DAYS_IN_MS),
      value: 5
    },
    {
      timestamp: new Date(new Date().getTime() - 1 * DAYS_IN_MS),
      value: 6
    },
    {
      timestamp: new Date(new Date().getTime() - 2 * DAYS_IN_MS),
      value: 7
    },
    {
      timestamp: new Date(new Date().getTime() - 3 * DAYS_IN_MS),
      value: 6
    },
    {
      timestamp: new Date(new Date().getTime() - 4 * DAYS_IN_MS),
      value: 9
    },
    {
      timestamp: new Date(new Date().getTime() - 5 * DAYS_IN_MS),
      value: 10
    },
    {
      timestamp: new Date(new Date().getTime() - 6 * DAYS_IN_MS),
      value: 10
    }
  ];
  return new Array(DATA_SIZE).fill().map((x, i, arr) => {
    return {
      timestamp: new Date(new Date().getTime() - (i * DAYS_IN_MS) / 2),
      value: getRandomFloatInclusive(5, 10)
    };
  });
}

function fakeMovementData() {
  return new Array(DATA_SIZE).fill().map((x, i, arr) => {
    return {
      timestamp: new Date(new Date().getTime() - i * 30 * SECONDS_IN_MS),
      value: getRandomFloatInclusive(0, 29)
    };
  });
}

function fakeBottleVData() {
  return new Array(DATA_SIZE).fill().map((x, i, arr) => {
    return {
      timestamp: new Date(new Date().getTime() - i * 1 * HOURS_IN_MS),
      value: getRandomFloatInclusive(0, 1500)
    };
  });
}

export async function getUVData() {
  if (USE_REAL_API) {
    let response = await fetch(`${SERVER_URL}/uv`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    return data.map(obj => {
      return {
        timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
        value: obj.data
      };
    });
  } else {
    return delayedPromise(500, fakeUVData());
  }
}

export async function getHeartRateData() {
  if (USE_REAL_API) {
    let response = await fetch(`${SERVER_URL}/heart`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    return data.map(obj => {
      return {
        timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
        value: obj.data
      };
    });
  } else {
    return delayedPromise(500, fakeHeartRateData());
  }
}

export async function getPostureData() {
  if (USE_REAL_API) {
    let response = await fetch(`${SERVER_URL}/post`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    return data.map(obj => {
      return {
        timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
        value: obj.data
      };
    });
  } else {
    return delayedPromise(500, fakePostureData());
  }
}

export async function getWeatherData() {
  if (USE_REAL_API) {
    let response = await fetch(`${SERVER_URL}/weather`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    return data.map(obj => {
      return {
        timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
        value: obj.data
      };
    });
  } else {
    return delayedPromise(500, fakeWeatherData());
  }
}

export async function getMovementData() {
  if (USE_REAL_API) {
    let response = await fetch(`${SERVER_URL}/movement`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    return data.map(obj => {
      return {
        timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
        value: obj.data
      };
    });
  } else {
    return delayedPromise(500, fakeMovementData());
  }
}

export async function getBottleData() {
  if (USE_REAL_API) {
    let response = await fetch(`${SERVER_URL}/bottle`, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();

    return data.map(obj => {
      return {
        timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
        value: (obj.data / 100) * 800
      };
    });
  } else {
    return delayedPromise(500, fakeBottleVData());
  }
}
