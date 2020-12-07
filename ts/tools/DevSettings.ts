import {DevSettings} from 'react-native';
import deleteUserToken from './extensions/deleteUserToken';
import restartOnboarding from './extensions/restartOnboarding';

export default function extendDevSettingsAndMenu() {
  // YellowBox.ignoreWarnings(['Require cycle:']);
  // console.disableYellowBox = true;

  DevSettings.addMenuItem('-- Remove User Token --', deleteUserToken);
  DevSettings.addMenuItem('-- Restart Onboarding --', restartOnboarding);
}
