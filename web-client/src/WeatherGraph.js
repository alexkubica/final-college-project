import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataPropType, graphSubtitleText, GRAPH_DATE_FORMAT, HOURS_IN_MS } from './utils';

const propTypes = {
    data: PropTypes.arrayOf(DataPropType)
};

export default function WeatherGraph({ data }) {
    const options = {
        chart: {
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: 'Weather over time'
        },
        subtitle: {
            text: graphSubtitleText()
        },
        xAxis: {
            type: 'datetime',
            minRange: 6 * HOURS_IN_MS
        },
        yAxis: [
            {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    format: '{value}°C'
                }
            },
            {
                title: {
                    text: 'Humidity'
                },
                opposite: true,
                labels: {
                    format: '{value}%'
                }
            }
        ],
        tooltip: {
            xDateFormat: GRAPH_DATE_FORMAT,
            shared: true
        },
        legend: {
            enabled: false
        },
        series: [
            {
                name: 'Temperature',
                data: data.map(obj => {
                    return [
                        moment(obj.timestamp).valueOf(),
                        obj.value.temperature
                    ];
                }),
                tooltip: {
                    valueSuffix: '°C'
                }
            },
            {
                name: 'Humidity',
                data: data.map(obj => {
                    return [
                        moment(obj.timestamp).valueOf(),
                        obj.value.humidity
                    ];
                }),
                tooltip: {
                    valueSuffix: '%'
                },
                yAxis: 1
            }
        ]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

WeatherGraph.propTypes = propTypes;