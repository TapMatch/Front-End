import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import logUserOut from '../services/logUserOut';

interface IupdateUserProfile {
    userProfile: [any, (x: any) => void];
    userToken: string;
    data: any;
    LoggedIn?: [boolean, (x: boolean) => void];
    user_has_passed_onboarding?: [boolean, (x: boolean) => void];

}

export async function updateUserProfile({
    userProfile,
    userToken,
    data,
    LoggedIn,
    user_has_passed_onboarding
}: IupdateUserProfile) {
    try {

        const options: AxiosRequestConfig = {
            method: 'PUT',
            url: `${tapMatchServerUrl}api/profile`,
            headers: {
                'X-Auth-Token': userToken,
                'Content-Type': 'application/json',
            },
            data
        };

        axios
            .request(options)
            .then(({data}: any) => {
                userProfile[1](data.data);
                const user_profile = JSON.stringify(data);
                AsyncStorage.setItem('@user_profile', user_profile);
            })
            .catch((error) => {

                if (DEV_MODE) {
                    console.log(`${error} ::: updateUserProfile`);
                    callAlert(undefined, `${error.toString()} ::: updateUserProfile`);
                }

                if (LoggedIn && userProfile && user_has_passed_onboarding) {
                    logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
                }
            });
    } catch (error) {
        if (DEV_MODE) {
            console.log(`${error} ::: updateUserProfile`);
            callAlert(undefined, `${error.toString()} ::: updateUserProfile`);
        }
    }
}
