import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataPropType, graphSubtitleText, GRAPH_DATE_FORMAT, HOURS_IN_MS } from './utils';

const propTypes = {
    data: PropTypes.arrayOf(DataPropType)
};

export default function MovementGraph({ data }) {
    const options = {
        chart: {
            type: 'bar',
            zoomType: 'y',
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
            visible: false
        },
        yAxis: {
            type: 'datetime',
            title: {
                text: ''
            }
        },
        tooltip: {
            xDateFormat: GRAPH_DATE_FORMAT,
            minRange: HOURS_IN_MS
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        // TODO generate serieses from data
        series: [{
            name: 'move',
            data: [5],
            color: 'blue'
        }, {
            name: 'no move',
            data: [2],
            color: 'gray'
        },
        {
            name: 'move',
            data: [5],
            color: 'blue'
        },
        {
            name: 'no move',
            data: [3],
            color: 'gray'
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

MovementGraph.propTypes = propTypes;