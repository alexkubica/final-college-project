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
    return Number.parseFloat(Math.random() * (max - min + 1) + min).toFixed(1); //The maximum is inclusive and the minimum is inclusive 
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

const USE_REAL_API = false;
const SECOND = 1000;

export async function getUVData() {
    // TODO change to real server api
    if (USE_REAL_API) {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    } else {
        // fake data: 100 uvs between 0% to 15% in 30 seconds intervals
        return delayedPromise(500, new Array(100)
            .fill()
            .map((x, i, arr) => {
                return {
                    timestamp: new Date(new Date().getTime() - i * 30 * SECOND),
                    value: getRandomFloatInclusive(0, 15)
                };
            })
            .sort(timestampCompare)
        );
    }
}

export async function getHeartbeatData() {
    // TODO change to real server api
    if (USE_REAL_API) {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    } else {
        // fake data: 100 heartbeats between 55 to 70 in 30 seconds intervals
        return delayedPromise(1000, new Array(100)
            .fill()
            .map((x, i, arr) => {
                return {
                    timestamp: new Date(new Date().getTime() - i * 30 * SECOND),
                    value: getRandomIntInclusive(55, 70)
                };
            })
            .sort(timestampCompare)
        );
    }
}

export async function getDistanceData() {
    // TODO change to real server api
    if (USE_REAL_API) {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    } else {
        // fake data: 100 distances between 0 to 10 in 30 seconds intervals
        return delayedPromise(1500, new Array(100)
            .fill()
            .map((x, i, arr) => {
                return {
                    timestamp: new Date(new Date().getTime() - i * 30 * SECOND),
                    value: getRandomFloatInclusive(0, 10)
                };
            })
            .sort(timestampCompare));
    }
}

export async function getTiltData() {
    // TODO change to real server api
    if (USE_REAL_API) {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    } else {
        // fake data: 100 tilts between 70 to 110 in 30 seconds intervals
        return delayedPromise(2000, new Array(100)
            .fill()
            .map((x, i, arr) => {
                return {
                    timestamp: new Date(new Date().getTime() - i * 30 * SECOND),
                    value: getRandomFloatInclusive(70, 110)
                };
            })
            .sort(timestampCompare)
        );
    }
}

export async function getBottleData() {
    // TODO change to real server api
    if (USE_REAL_API) {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await response.json();
    } else {
        // fake data: 100 bottles between 0 to 100 in 30 seconds intervals
        return delayedPromise(2500, new Array(100)
            .fill()
            .map((x, i, arr) => {
                return {
                    timestamp: new Date(new Date().getTime() - i * 30 * SECOND),
                    value: getRandomFloatInclusive(0, 100)
                };
            })
            .sort(timestampCompare)
        );
    }
}
