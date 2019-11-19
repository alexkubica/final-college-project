import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';
import { DataPropType, graphSubtitleText, GRAPH_DATE_FORMAT } from './utils';

(heatmap)(Highcharts);

const propTypes = {
    data: PropTypes.arrayOf(DataPropType)
};

export default function UVGraph({ data }) {
    const options = {

        chart: {
            type: 'heatmap',
            margin: [60, 10, 80, 50],
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
        },

        boost: {
            useGPUTranslations: true
        },

        title: {
            text: 'UV Index over time (2019)'
        },

        subtitle: {
            text: graphSubtitleText()
        },

        xAxis: {
            type: 'datetime',
            min: Date.UTC(2019, 10, 1),
            max: Date.UTC(2019, 11, 31, 23, 59, 59),
            labels: {
                align: 'left',
                x: 5,
                y: 14,
                format: '{value:%d/%m}'
            },
            showLastLabel: false,
        },

        yAxis: {
            type: 'datetime',
            title: {
                text: null
            },
            labels: {
                format: '{value}:00'
            },
            minPadding: 0,
            maxPadding: 0,
            startOnTick: false,
            endOnTick: false,
            tickPositions: [0, 6, 12, 18, 24],
            tickWidth: 1,
            min: 0,
            max: 23,
            reversed: true
        },

        colorAxis: {
            stops: [
                [0, '#3060cf'],
                [0.5, '#fffbbc'],
                [0.9, '#c4463a'],
                [1, '#c4463a']
            ],
            min: 0,
            max: 15,
            startOnTick: false,
            endOnTick: false,
            labels: {
                format: '{value} UV'
            }
        },

        series: [{
            boostThreshold: 100,
            borderWidth: 0,
            nullColor: '#EFEFEF',
            colsize: 24 * 36e5, // one day
            tooltip: {
                headerFormat: 'UV Index<br/>',
                xDateFormat: GRAPH_DATE_FORMAT,
                pointFormat: '{point.x:%d/%m/%Y} {point.y}:00: <b>{point.value} UV</b>'
            },
            turboThreshold: Number.MAX_VALUE, // #3404, remove after 4.0.5 release
            data: data.map(obj => {
                const d = moment(obj.timestamp);
                return [
                    d.valueOf(),
                    d.hour(),
                    obj.value
                ];
            })
        }]
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

UVGraph.propTypes = propTypes;