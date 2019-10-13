import React from 'react';
import { ScrollView, Text } from 'react-native';
import { VictoryBar, VictoryChart } from 'victory-native';

export default function GraphScreen({ navigation }) {
    const data = navigation.getParam('data', []);

    return (
        <ScrollView>
            <VictoryChart>
                <VictoryBar
                    data={data}
                    x="timestamp"
                    y="value"
                />
            </VictoryChart>
        </ScrollView>
    );
}

GraphScreen.navigationOptions = ({ navigation }) => {
    return {
        title: navigation.getParam('title', 'Graph'),
    };
};