import * as React from 'react';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';

export default function Main() {
    return (
        <PaperProvider>
            <App />
        </PaperProvider>
    );
}

registerRootComponent(Main);
AppRegistry.registerComponent('main', () => Main);