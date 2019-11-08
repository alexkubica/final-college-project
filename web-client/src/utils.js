import moment from 'moment';
import PropTypes from 'prop-types';

export const DataPropType = PropTypes.exact({
    timestamp: PropTypes.objectOf(Date),
    value: PropTypes.number
});

export function returnHome() {
    window.location.href = '/';
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
    return Number.parseFloat(Number.parseFloat(Math.random() * (max - min + 1) + min).toFixed(1)); //The maximum is inclusive and the minimum is inclusive 
}

function timestampCompare(a, b) {
    if (a.timestamp < b.timestamp) {
        return -1;
    }

    if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
}

const USE_REAL_API = true;
const DATA_SIZE = 20;
const SECOND_IN_MS = 1000;
const SERVER_URL = 'http://192.168.1.239:8080';

function fakeUVData() {
    // fake data: uvs between 0% to 15% in 30 seconds intervals
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: getRandomFloatInclusive(0, 15)
            };
        });
}

function fakeHeartbeatData() {
    // fake data: heartbeats between 55 to 70 in 30 seconds intervals
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: getRandomIntInclusive(55, 70)
            };
        });
}

function fakePostureData() {
    // fake data: postures between 0 to 360 in 30 seconds intervals
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: getRandomFloatInclusive(0, 360)
            }
        });
}

function fakeWeatherData() {
    // fake data: weathers' temparature between 0 to 50 in 30 seconds intervals
    // humidity between 0 to 100
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: {
                    temparature: getRandomFloatInclusive(0, 50),
                    humidity: getRandomFloatInclusive(0, 100)
                }
            }
        });
}

function fakeMovementData() {
    // fake data: movement durations between 0 to 29 in 30 seconds intervals
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: getRandomFloatInclusive(0, 29)
            };
        });
}

function fakeBottleVData() {
    // fake data: bottles between 0 to 100 in 30 seconds intervals
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: getRandomFloatInclusive(0, 100)
            };
        })
}

export async function getUVData() {
    if (USE_REAL_API) {
        let response = await fetch(`${SERVER_URL}/uv`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        return data.map(obj => {
            return {
                timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
                // TODO get value from server
                value: getRandomFloatInclusive(0, 100)
            };
        });
    } else {
        return delayedPromise(500, fakeUVData());
    }
}

export async function getHeartbeatData() {
    if (USE_REAL_API) {
        let response = await fetch(`${SERVER_URL}/heartbeat`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        return data.map(obj => {
            return {
                timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
                // TODO get value from server
                value: getRandomFloatInclusive(0, 100)
            };
        });
    } else {
        return delayedPromise(500, fakeHeartbeatData());
    }
}

export async function getPostureData() {
    if (USE_REAL_API) {
        let response = await fetch(`${SERVER_URL}/posture`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        return data.map(obj => {
            return {
                timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
                // TODO get value from server
                value: getRandomFloatInclusive(0, 100)
            };
        });
    } else {
        return delayedPromise(500, fakePostureData());
    }
}

export async function getWeatherData() {
    if (USE_REAL_API) {
        let response = await fetch(`${SERVER_URL}/weather`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        return data.map(obj => {
            return {
                timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
                // TODO get value from server
                value: getRandomFloatInclusive(0, 100)
            };
        });
    } else {
        return delayedPromise(500, fakeWeatherData());
    }
}

export async function getMovementData() {
    if (USE_REAL_API) {
        let response = await fetch(`${SERVER_URL}/movement`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        return data.map(obj => {
            return {
                timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
                // TODO get value from server
                value: getRandomFloatInclusive(0, 100)
            };
        });
    } else {
        return delayedPromise(500, fakeMovementData());
    }
}

export async function getBottleData() {
    if (USE_REAL_API) {
        let response = await fetch(`${SERVER_URL}/bottle`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
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
        return delayedPromise(500, fakeBottleVData());
    }
}