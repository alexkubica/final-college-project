import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import solidgauge from 'highcharts/modules/solid-gauge';
import HighchartsReact from 'highcharts-react-official';
import { DataPropType, MINUTES_IN_MS, graphSubtitleText, GRAPH_DATE_FORMAT } from './utils';

highchartsMore(Highcharts);
solidgauge(Highcharts);

const propTypes = {
	data: PropTypes.arrayOf(DataPropType),
};

export default function BottleGraph({ data }) {
	const lineOptions = {
		chart: {
			zoomType: 'x',
			panning: true,
			panKey: 'shift',
		},
		title: {
			text: 'Water consumption over time',
		},
		subtitle: {
			text: graphSubtitleText(),
		},
		xAxis: {
			type: 'datetime',
			minRange: 5 * MINUTES_IN_MS,
		},
		yAxis: {
			title: {
				text: 'Bottle water capacity',
			},
			labels: {
				format: '{value}%',
			},
			min: 0,
			max: 100,
		},
		tooltip: {
			xDateFormat: GRAPH_DATE_FORMAT,
			valueSuffix: '%',
		},
		legend: {
			enabled: false,
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1,
					},
					stops: [
						[0, Highcharts.getOptions().colors[0]],
						[
							1,
							Highcharts.Color(Highcharts.getOptions().colors[0])
								.setOpacity(0)
								.get('rgba'),
						],
					],
				},
				marker: {
					radius: 2,
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1,
					},
				},
				threshold: null,
			},
		},
		series: [
			{
				type: 'spline',
				name: 'Bottle',
				data: data.map(obj => {
					return [moment(obj.timestamp).valueOf(), obj.value];
				}),
			},
		],
	};
	const gaugeOptions = {
		chart: {
			type: 'solidgauge',
		},

		pane: {
			center: ['50%', '85%'],
			size: '140%',
			startAngle: -90,
			endAngle: 90,
			background: {
				backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
				innerRadius: '60%',
				outerRadius: '100%',
				shape: 'arc',
			},
		},

		tooltip: {
			enabled: false,
		},

		// the value axis
		yAxis: {
			stops: [
				[0.1, '#55BF3B'], // green
				[0.5, '#DDDF0D'], // yellow
				[0.9, '#DF5353'], // red
			],
			lineWidth: 0,
			minorTickInterval: null,
			tickAmount: 2,
			labels: {
				y: 16,
			},
			min: 0,
			max: 200,
			title: {
				y: -70,
				text: 'Bottle ',
			},
		},

		plotOptions: {
			solidgauge: {
				dataLabels: {
					y: 5,
					borderWidth: 0,
					useHTML: true,
				},
			},
		},

		credits: {
			enabled: false,
		},

		series: [
			{
				name: 'Speed',
				data: [80],
				dataLabels: {
					format:
						'<div style="text-align:center">' +
						'<span style="font-size:25px">{y}</span><br/>' +
						'<span style="font-size:12px;opacity:0.4">km/h</span>' +
						'</div>',
				},
				tooltip: {
					valueSuffix: ' km/h',
				},
			},
		],
	};

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={lineOptions} />
			<HighchartsReact highcharts={Highcharts} options={gaugeOptions} />
		</div>
	);
}

BottleGraph.propTypes = propTypes;
