import moment from 'moment';

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

function fakeUVData() {
    // fake data: 100 uvs between 0% to 15% in 30 seconds intervals
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
    // fake data: 100 heartbeats between 55 to 70 in 30 seconds intervals
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: getRandomIntInclusive(55, 70)
            };
        });
}

function fakeDistanceData() {
    // fake data: 100 distances between 0 to 10 in 30 seconds intervals
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: getRandomFloatInclusive(0, 10)
            }
        });
}

function fakeTiltData() {
    // fake data: 100 tilts between 70 to 110 in 30 seconds intervals
    return new Array(DATA_SIZE)
        .fill()
        .map((x, i, arr) => {
            return {
                timestamp: new Date(new Date().getTime() - i * 30 * SECOND_IN_MS),
                value: getRandomFloatInclusive(70, 110)
            };
        });
}

function fakeBottleVData() {
    // fake data: 100 bottles between 0 to 100 in 30 seconds intervals
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
    // TODO change to real server api
    if (USE_REAL_API) {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts');
            return await response.json();
        } catch (e) {
            console.error('failed to get uv data, using fake data instead', e)
            return fakeUVData();
        }
    } else {
        return delayedPromise(500, fakeUVData());
    }
}

export async function getHeartbeatData() {
    // TODO change to real server api
    if (USE_REAL_API) {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts');
            return await response.json();
        } catch (e) {
            console.error('failed to get heartbeat data, using fake data instead', e)
            return fakeHeartbeatData();
        }
    } else {
        return delayedPromise(500, fakeHeartbeatData());
    }
}

export async function getDistanceData() {
    // TODO change to real server api
    if (USE_REAL_API) {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts');
            return await response.json();
        } catch (e) {
            console.error('failed to get distance data, using fake data instead', e)
            return fakeDistanceData();
        }
    } else {
        return delayedPromise(500, fakeDistanceData());
    }
}

export async function getTiltData() {
    if (USE_REAL_API) {
        try {
            let response = await fetch('http://localhost:8080/tilt', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const tiltData = await response.json();

            return tiltData.map(obj => {
                return {
                    timestamp: moment(obj.dateReceived, "DD/MM/YYYY HH:mm:ss").toDate(),
                    // TODO get duration value from server
                    value: getRandomFloatInclusive(70, 110)
                };
            });
        } catch (e) {
            console.error('failed to get tilt data, using fake data instead', e)
            return fakeTiltData();
        }
    } else {
        return delayedPromise(500, fakeTiltData());
    }
}

export async function getBottleData() {
    // TODO change to real server api
    if (USE_REAL_API) {
        try {
            let response = await fetch('https://jsonplaceholder.typicode.com/posts');
            return await response.json();
        } catch (e) {
            console.error('failed to get bottle data, using fake data instead', e)
            return fakeBottleVData();
        }
    } else {
        return delayedPromise(500, fakeBottleVData());
    }
}