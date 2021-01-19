import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import handleLogoutCase from 'ts/utils/handleLogoutCase';
import logAxiosError from 'ts/utils/logAxiosError';

interface IgetEventById {
    userToken: string;
    event_id: string;
    community_id: string;
    selectedMarkerData?: any;
    eventDetailsModalVisible: [boolean, (x: boolean) => void];
    requestingEventDetailsInProcess: [boolean, (x: boolean) => void];
    LoggedIn: [boolean, (x: boolean) => void];
}

export async function getEventById({
    event_id,
    LoggedIn,
    community_id,
    userToken,
    selectedMarkerData,
    eventDetailsModalVisible,
    requestingEventDetailsInProcess
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
                handleLogoutCase(error, LoggedIn, 'getEventById');
            });
    } catch (error) {
        console.log(`${error} ::: getEventById`);
        callAlert(undefined, `${error.toString()} ::: getEventById`);
    }
}
