import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Appbar, ActivityIndicator, Snackbar } from 'react-native-paper';
import CardData from './components/CardData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

async function getUVData() {
  // TODO change to real server api
  let response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json();
}

export default function App() {
  const [error, setErr] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    uv: '',
    heartbeat: '',
    distance: '',
    tilt: '',
    bottle: ''
  });

  useEffect(() => {
    // TODO call the rest sensors' routes
    Promise.all([getUVData()])
      .then(([uvData]) => {
        setData({
          uv: '90%',
          heartbeat: '71 BPM',
          distance: '1.5m',
          tilt: '87°',
          bottle: 'water capacity 53%'
        });
      })
      .catch(error => {
        console.error(error.message)
        setErr("Failed to load some sensors' data from server.")
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Jarvis Mate!" />
      </Appbar.Header>
      <ActivityIndicator animating={loading} />
      {!loading ?
        [
          <CardData
            key={1}
            title="Ultraviolet"
            data={data.uv}
          />,
          <CardData
            key={2}
            title="Heart rate"
            data={data.heartbeat}
          />,
          <CardData
            key={3}
            title="Distance"
            data={data.distance}
          />,
          <CardData
            key={4}
            title="Tilt"
            data={data.tilt}
          />,
          <CardData
            key={5}
            title="Bottle"
            data={data.bottle}
          />
        ]
        : null}
      <Snackbar
        visible={error}
        onDismiss={() => { }}
      >
        {error}
      </Snackbar>
    </ScrollView>
  );
}
