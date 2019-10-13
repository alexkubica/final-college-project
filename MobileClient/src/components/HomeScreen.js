import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import CardData from './CardData';
import { getUVData, getHeartbeatData, getDistanceData, getTiltData, getBottleData } from '../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 10
    }
});

function getCards(data, navigation) {
    return [
        <CardData
            onOpen={() => navigation.navigate('Graph', {
                title: 'Ultraviolet Graph',
                data: data.uvData
            })}
            key={1}
            title="Ultraviolet"
            data={data.uvData.length > 0 ?
                `${data.uvData[data.uvData.length - 1].value}%`
                : 'No data'}
        />,
        <CardData
            onOpen={() => navigation.navigate('Graph', {
                title: 'Heart Rate Graph',
                data: data.heartbeatData
            })}
            key={2}
            title="Heart rate"
            data={data.heartbeatData.length > 0 ?
                `${data.heartbeatData[data.heartbeatData.length - 1].value} BPM`
                : 'No data'}
        />,
        <CardData
            onOpen={() => navigation.navigate('Graph', {
                title: 'Distance Graph',
                data: data.distanceData
            })}
            key={3}
            title="Distance"
            data={data.distanceData.length > 0 ?
                `${data.distanceData[data.distanceData.length - 1].value}m`
                : 'No data'}
        />,
        <CardData
            onOpen={() => navigation.navigate('Graph', {
                title: 'Tilt Graph',
                data: data.tiltData
            })}
            key={4}
            title="Tilt"
            data={data.tiltData.length > 0 ?
                `${data.tiltData[data.tiltData.length - 1].value}°`
                : 'No data'}
        />,
        <CardData
            onOpen={() => navigation.navigate('Graph', {
                title: 'Bottle Graph',
                data: data.bottleData
            })}
            key={5}
            title="Bottle"
            data={data.bottleData.length > 0 ?
                `${data.bottleData[data.bottleData.length - 1].value}% water`
                : 'No data'}
        />
    ];
}

export default function HomeScreen({ navigation }) {
    const [error, setErr] = useState();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        uvData: [],
        heartbeatData: [],
        distanceData: [],
        tiltData: [],
        bottleData: []
    });

    function loadData() {
        setLoading(true);
        Promise.all([
            getUVData(),
            getHeartbeatData(),
            getDistanceData(),
            getTiltData(),
            getBottleData()
        ])
            .then(([uvData, heartbeatData, distanceData, tiltData, bottleData]) => {
                setData({
                    uvData,
                    heartbeatData,
                    distanceData,
                    tiltData,
                    bottleData
                });
            })
            .catch(error => {
                console.error(error.message)
                setErr("Failed to load some sensors' data from server.")
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadData();
        navigation.setParams({
            loadData
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ActivityIndicator
                    animating={loading}
                />
                {!loading ?
                    getCards(data, navigation)
                    : null}
                <Snackbar
                    visible={error}
                    onDismiss={() => { }}
                >
                    {error}
                </Snackbar>
            </View>
        </View>
    );
}

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        title: 'Jarvis Mate!',
        headerRight: (
            <Button icon="refresh" onPress={navigation.getParam('loadData')}>
                Refresh
            </Button>
        )
    }
};