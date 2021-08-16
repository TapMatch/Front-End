import AsyncStorage from '@react-native-async-storage/async-storage';
export const setStorageData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    // saving error
  }
};

export const getStorageData = async (key: string) => {
  try {
    return await AsyncStorage.getItem(`@${key}`);
  } catch (e) {
    // error reading value
    return null;
  }
};
