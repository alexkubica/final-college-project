import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider as PaperProvider } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './components/HomeScreen';
import GraphScreen from './components/GraphScreen';

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Graph: GraphScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const App = createAppContainer(MainNavigator);

export default Main = () => (
  <PaperProvider>
    <App />
  </PaperProvider>
);

registerRootComponent('main', () => Main);