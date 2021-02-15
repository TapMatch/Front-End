import AsyncStorage from '@react-native-async-storage/async-storage';

export default function deleteUserToken() {
  AsyncStorage.removeItem('@user_token');
}
