import AsyncStorage from "@react-native-async-storage/async-storage";
import {AxiosError} from "axios";
import {call} from "react-native-reanimated";
import callAlert from "ts/utils/callAlert";

export default function logUserOut(
    error: AxiosError,
    LoggedIn: [boolean, (x: boolean) => void],
    userProfile: [any, (x: any) => void],
    user_has_passed_onboarding: [boolean, (x: boolean) => void],
) {
    if (error.response) {
        const {data, status} = error.response;
        if (status === 401) {
            if (data.hasOwnProperty('message')) {
                if (data.message.toLowerCase().includes('invalid token')) {
                    if (LoggedIn && userProfile && user_has_passed_onboarding) {

                        if (LoggedIn[0] && userProfile[0] !== null && user_has_passed_onboarding[0]) {
                            callAlert(undefined, 'User token has expired, please sign in again.');
                        }

                        LoggedIn[1](false);
                        userProfile[1](null);
                        user_has_passed_onboarding[1](false);
                        AsyncStorage.removeItem('@user_token');
                        AsyncStorage.removeItem('@user_has_passed_onboarding');


                    }
                }
            }
        }
    }
}