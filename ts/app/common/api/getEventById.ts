import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import callAlert from 'ts/utils/callAlert';
import logAxiosError from 'ts/utils/logAxiosError';
import logUserOut from '../services/logUserOut';

interface IgetEventById {
    userToken: string;
    event_id: string;
    community_id: string;
    selectedMarkerData?: any;
    eventDetailsModalVisible: [boolean, (x: boolean) => void];
    requestingEventDetailsInProcess: [boolean, (x: boolean) => void];
    LoggedIn: [boolean, (x: boolean) => void];
    userProfile?: [any, (x: any) => void];
    user_has_passed_onboarding?: [boolean, (x: boolean) => void];

}

export async function getEventById({
    event_id,
    community_id,
    userToken,
    selectedMarkerData,
    eventDetailsModalVisible,
    requestingEventDetailsInProcess,
    LoggedIn,
    userProfile,
    user_has_passed_onboarding

}: IgetEventById) {
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `${tapMatchServerUrl}api/communities/${community_id}/events/${event_id}`,
            headers: {
                'X-Auth-Token': userToken[0],
                'Content-Type': 'application/json',
            },
            withCredentials: false
        };
        requestingEventDetailsInProcess[1](true);
        eventDetailsModalVisible[1](true);
        axios
            .request(options)
            .then(({data}: any) => {
                requestingEventDetailsInProcess[1](false);
                selectedMarkerData[1](data);
                eventDetailsModalVisible[1](true);
            })
            .catch((error) => {
                requestingEventDetailsInProcess[1](false);
                logAxiosError(error, 'getEventById');

                if (LoggedIn && userProfile && user_has_passed_onboarding) {
                    logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
                }
            });
    } catch (error) {

        if (DEV_MODE) {
            console.log(`${error} ::: getEventById`);
            callAlert(undefined, `${error.toString()} ::: getEventById`);
        }
    }
}
