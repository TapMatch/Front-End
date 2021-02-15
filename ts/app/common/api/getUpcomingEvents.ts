import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import callAlert from 'ts/utils/callAlert';
import logUserOut from '../services/logUserOut';

interface IgetUpcomingEvents {
    userToken: string;
    communityId: string;
    upcomingEvents: any;
    LoggedIn?: [boolean, (x: boolean) => void];
    userProfile?: [any, (x: any) => void];
    user_has_passed_onboarding?: [boolean, (x: boolean) => void];
}

export async function getUpcomingEvents({
    communityId,
    userToken,
    upcomingEvents,
    LoggedIn,
    user_has_passed_onboarding,
    userProfile
}: IgetUpcomingEvents) {
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `${tapMatchServerUrl}api/communities/${communityId}/upcoming-events`,
            headers: {
                'X-Auth-Token': userToken,
                'Content-Type': 'application/json',
            },
        };
        axios
            .request(options)
            .then(({data}: any) => {
                upcomingEvents[1](data.data);
            })
            .catch((error) => {
                if (LoggedIn && userProfile && user_has_passed_onboarding) {
                    logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
                }

                if (DEV_MODE) {
                    console.log(error);
                    callAlert(undefined, `${error.toString()} ::: getUpcomingEvents`);
                }
            });
    } catch (error) {
        console.log(`${error} ::: getUpcomingEvents`);
        if (DEV_MODE) {
            callAlert(undefined, `${error.toString()} ::: getUpcomingEvents`);
        }
    }
}
