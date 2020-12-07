import AsyncStorage from '@react-native-async-storage/async-storage';

export default function restartOnboarding() {
  AsyncStorage.removeItem('@user_has_passed_onboarding');
  console.log(
    'Done. Now turn the app off and on agan(I cannot access app conext from here yet.',
  );
}
