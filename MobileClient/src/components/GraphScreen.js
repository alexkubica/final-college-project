import React from 'react';
import { ScrollView } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryZoomContainer } from 'victory-native';
import moment from 'moment';
import Dimensions from 'Dimensions';

export default function GraphScreen({ navigation }) {
    const data = navigation.getParam('data', []);
    const valueLabelUnit = navigation.getParam('valueLabelUnit', undefined);

    return (
        <ScrollView>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                animate={{
                    duration: 500,
                    onLoad: { duration: 500 }
                }}
                height={Dimensions.get('window').height - 100}
                padding={{ left: 50, right: 50, top: 50, bottom: 100 }}
            >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            angle: 45,
                            padding: 40
                        }
                    }}
                    label="Time (HH:mm:ss)"
                    tickFormat={(x) => {
                        return moment(x).format('HH:mm:ss');
                    }}
                />

                <VictoryAxis
                    style={{
                        tickLabels: {
                            padding: 20
                        }
                    }}
                    labe
                    dependentAxis
                    label={`Value${valueLabelUnit ? ` (${valueLabelUnit})` : ''}`}
                    tickFormat={(y) => {
                        return y;
                    }}
                />
                <VictoryBar
                    data={data}
                    x="timestamp"
                    y="value"
                />
            </VictoryChart>
        </ScrollView >
    );
}

GraphScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('title', 'Graph'),
    };
};