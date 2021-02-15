import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import * as RNLocalize from "react-native-localize";
import logAxiosError from 'ts/utils/logAxiosError';
import logUserOut from '../services/logUserOut';
import {DEV_MODE} from 'ts/tools/devModeTrigger';

interface IpatchUserTimeZone {
    userToken: [string, (x: string) => void];
    LoggedIn?: [boolean, (x: boolean) => void];
    userProfile?: [any, (x: any) => void];
    user_has_passed_onboarding?: [boolean, (x: boolean) => void];
}

export async function patchUserTimeZone({
    userToken,
    LoggedIn,
    userProfile,
    user_has_passed_onboarding
}: IpatchUserTimeZone) {
    try {
        const options: AxiosRequestConfig = {
            method: 'PATCH',
            url: `${tapMatchServerUrl}api/profile/timezone`,
            headers: {
                'X-Auth-Token': userToken[0],
                'Content-Type': 'application/json',
            },
            data: {
                timezone: RNLocalize.getTimeZone(),
            },
            withCredentials: false
        };
        axios
            .request(options)
            .then(({data}: any) => {
                console.log('Successfuly updated user timezone!');
            })
            .catch((error) => {
                logAxiosError(error, 'patchUserTimeZone');

                if (LoggedIn && userProfile && user_has_passed_onboarding) {
                    logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
                }
            });
    } catch (error) {

        if (DEV_MODE) {
            console.log(`${error} ::: patchUserTimeZone`);
        }
    }
}
