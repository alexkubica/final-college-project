import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import CardData from './CardData';
import { DataPropType } from './utils';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginRight: '0.5em'
    },
    card: {
        width: '100%',
        margin: '1em'
    },
    weatherConent: {
        display: 'flex',
        flexDirection: 'column'
    }
}));

function parseIntOrZero(x) {
    const parsed = parseInt(x);
    return isNaN(parsed) ? 0 : parsed;
}

function averageData(data) {
    return data.reduce((a, b) => {
        return parseIntOrZero(a) + parseIntOrZero(b);
    }, 0) / data.length;
}

function getCards(data, classes) {
    return [
        <CardData
            onOpen={() => {
                window.location.href = '/uv';
            }}
            key={1}
            title={
                <Fragment>
                    <WbSunnyIcon className={classes.icon} />
                    Ultraviolet
                </Fragment>
            }
            content={
                data.uvData.length > 0
                    ?
                    <div>
                        <div>
                            Last recorded UV Index: {data.uvData[data.uvData.length - 1].value}
                        </div>
                        <div>
                            Average UV Index: {averageData(data.uvData.map(x => x.value))}
                        </div>
                    </div>
                    :
                    'No data'
            }
        />,
        <CardData
            onOpen={() => {
                window.location.href = '/weather';
            }}
            key={2}
            title={
                <Fragment>
                    <AcUnitIcon className={classes.icon} />
                    Weather
                </Fragment>
            }
            content={
                data.weatherData.length > 0
                    ?
                    <div className={classes.weatherConent}>
                        <span>
                            Temperature: {data.weatherData[data.weatherData.length - 1].value.temperature}°C
                        </span>
                        <span>
                            Humidity: {data.weatherData[data.weatherData.length - 1].value.humidity}%
                        </span>
                    </div>
                    :
                    'No data'
            }
        />,
        <CardData
            onOpen={() => {
                window.location.href = '/heartrate';
            }}
            key={3}
            title={
                <Fragment>
                    <FavoriteIcon className={classes.icon} />
                    Heart Rate
                </Fragment>
            }
            content={
                data.heartRateData.length > 0
                    ?
                    <div>
                        <div>
                            Last recorded heart rate: {data.heartRateData[data.heartRateData.length - 1].value} BPM
                        </div>
                        <div>
                            Average heart rate: {averageData(data.heartRateData.map(x => x.value))} BPM
                        </div>
                    </div>
                    :
                    'No data'
            }
        />,
        <CardData
            onOpen={() => {
                window.location.href = '/posture';
            }}
            key={4}
            title={
                <Fragment>
                    <AirlineSeatReclineExtraIcon className={classes.icon} />
                    Posture
                </Fragment>
            }
            content={
                data.postureData.length > 0
                    ?
                    `${data.postureData[data.postureData.length - 1].value}°`
                    :
                    'No data'
            }
        />,
        <CardData
            onOpen={() => {
                window.location.href = '/movement';
            }}
            key={5}
            title={
                <Fragment>
                    <DirectionsRunIcon className={classes.icon} />
                    Movement
                </Fragment>
            }
            content={
                data.movementData.length > 0
                    ?
                    `Moved for ${data.movementData[data.movementData.length - 1].value} minutes straight last time `
                    :
                    'No data'
            }
        />,
        <CardData
            onOpen={() => {
                window.location.href = '/bottle';
            }}
            key={6}
            title={
                <Fragment>
                    <LocalDrinkIcon className={classes.icon} />
                    Bottle
                </Fragment>
            }
            content={
                data.bottleData.length > 0
                    ?
                    `${data.bottleData[data.bottleData.length - 1].value}%`
                    :
                    'No data'
            }
        />
    ];
}

export default function SensorsList({ data }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {getCards(data, classes)}
        </div>
    );
}

SensorsList.propTypes = {
    data: PropTypes.exact({
        uvData: PropTypes.arrayOf(DataPropType),
        weatherData: PropTypes.arrayOf(DataPropType),
        heartRateData: PropTypes.arrayOf(DataPropType),
        postureData: PropTypes.arrayOf(DataPropType),
        movementData: PropTypes.arrayOf(DataPropType),
        bottleData: PropTypes.arrayOf(DataPropType)
    })
};