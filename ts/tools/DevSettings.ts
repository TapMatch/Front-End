import {DevSettings, YellowBox} from 'react-native';

export default function extendDevSettingsAndMenu() {
  // YellowBox.ignoreWarnings(['Require cycle:']);
  // console.disableYellowBox = true;

  DevSettings.addMenuItem('-- LOg Something --', () => {
    console.log('123123123');
  });
}
