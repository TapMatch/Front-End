import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import callAlert from '../../utils/callAlert';

let confirmation: FirebaseAuthTypes.ConfirmationResult;

export const signInWithPhoneNumber = async (phoneNumber: string) => {
  try {
    auth().settings.appVerificationDisabledForTesting = true;
    confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    return true;
  } catch (error) {
    console.log('error: =================', error.code, error.message);
    if (
      error.code === 'auth/invalid-phone-number' ||
      error.code === 'auth/missing-phone-number'
    ) {
      callAlert(undefined, 'Invalid phone number');
    } else if (error.code === 'auth/user-disabled') {
      callAlert(undefined, 'The account is disabled');
    } else {
      callAlert(undefined, 'Please try again later');
    }
    return false;
  }
};

export const confirmCode = async (code: string) => {
  try {
    await confirmation.confirm(code);
    return true;
  } catch (error) {
    console.log('Error: ======= ', error.code);
    callAlert(undefined, 'Invalid verification code');
    return false;
  }
};
