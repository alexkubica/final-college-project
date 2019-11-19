import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import xrange from 'highcharts/modules/xrange';
import { DataPropType, graphSubtitleText, GRAPH_DATE_FORMAT, SECONDS_IN_MS, MINUTES_IN_MS } from './utils';

(xrange)(Highcharts);

const propTypes = {
    data: PropTypes.arrayOf(DataPropType)
};

export default function MovementGraph({ data }) {
    const options = {
        chart: {
            type: 'xrange',
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
        },
        title: {
            text: 'Movement over time'
        },
        subtitle: {
            text: graphSubtitleText()
        },
        xAxis: {
            type: 'datetime',
            minRange: 1 * MINUTES_IN_MS
        },
        yAxis: {
            visible: false
        },
        tooltip: {
            xDateFormat: GRAPH_DATE_FORMAT,
            pointFormat: `Moved for <b>{point.value}</b> seconds.`
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Movement',
            borderColor: 'blue',
            pointWidth: 30,
            data: data.map(m => {
                return {
                    x: moment(m.timestamp).valueOf() - m.value * SECONDS_IN_MS,
                    x2: moment(m.timestamp).valueOf(),
                    y: 0,
                    value: m.value
                };
            }),
            dataLabels: {
                enabled: true
            }
        }]

    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

MovementGraph.propTypes = propTypes;