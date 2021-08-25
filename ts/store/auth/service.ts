import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import logAxiosError from 'ts/utils/logAxiosError';

let confirmation: FirebaseAuthTypes.ConfirmationResult;

export const signInWithPhoneNumber = async (phoneNumber: string) => {
  try {
    confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return true;
  } catch (error) {
    console.log('Error: ======= ', error);
    return false;
  }
};

export const confirmCode = async (code: string) => {
  try {
    const response = await confirmation.confirm(code);
    console.log('Confirm response: =======', response);
    return true;
  } catch (error) {
    console.log('Error: ======= ', error.message);
    return false;
  }
};
