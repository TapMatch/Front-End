/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './ts/TopAppWrapper';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
