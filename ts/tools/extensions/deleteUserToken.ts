import AsyncStorage from '@react-native-async-storage/async-storage';

export default function deleteUserToken() {
  AsyncStorage.removeItem('@user_token');
  console.log(
    'Done. Now turn the app off and on agan(I cannot access app conext from here yet.',
  );
}
