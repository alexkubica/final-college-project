import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  DataPropType,
  MINUTES_IN_MS,
  graphSubtitleText,
  GRAPH_DATE_FORMAT
} from "./utils";

const propTypes = {
  data: PropTypes.arrayOf(DataPropType)
};

export default function HeartRateGraph({ data }) {
  const options = {
    chart: {
      zoomType: "x",
      panning: true,
      panKey: "shift"
    },
    title: {
      text: "Heart rate over time"
    },
    subtitle: {
      text: graphSubtitleText()
    },
    xAxis: {
      type: "datetime"
      // minRange: 5 * MINUTES_IN_MS
    },
    yAxis: {
      title: {
        text: "Heart Rate"
      },
      labels: {
        format: "{value} BPM"
      }
    },
    tooltip: {
      xDateFormat: GRAPH_DATE_FORMAT,
      valueSuffix: " BPM"
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.Color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba")
            ]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    series: [
      {
        type: "area",
        name: "Heart Rate",
        data: data.map(obj => {
          return [moment(obj.timestamp).valueOf(), obj.value];
        })
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

HeartRateGraph.propTypes = propTypes;
