import axios, {AxiosRequestConfig} from 'axios';
import {LatLng} from 'react-native-maps';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import moment from 'moment';
import {getUpcomingEvents} from 'ts/app/common/api/getUpcomingEvents';
import logAxiosError from 'ts/utils/logAxiosError';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';

interface IcreateEvent {
    userToken: string;
    communityId: string;
    eventMarkers: any;
    upcomingEvents: any;
    name: string;
    description: string;
    date: Date;
    address: string;
    coordinates: LatLng;
    join_limit: number;
    selectedMarkerData: any;
    eventDetailsModalVisible: any;
    goBack: any;
    userProfile: [any, (x: any) => void];
}

export async function createEvent({
    communityId,
    eventMarkers,
    userToken,
    name,
    eventDetailsModalVisible,
    description,
    date,
    address,
    coordinates,
    join_limit,
    upcomingEvents,
    selectedMarkerData,
    goBack,
    userProfile
}: IcreateEvent) {
    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `${tapMatchServerUrl}api/communities/${communityId}/events`,
            headers: {
                'X-Auth-Token': userToken,
                'Content-Type': 'application/json',
            },
            data: {
                name,
                description,
                date: moment(date).format('YYYY-DD-MM HH:mm'),
                coordinates: coordinates,
                address,
                join_limit: join_limit + 1
            }
        };
        goBack();

        return axios
            .request(options)
            .then(({data}: any) => {
                getEventMarkers({userToken, id: communityId, eventMarkers});
                getUserProfile({userToken, userProfile});
                getUpcomingEvents({userToken, communityId, upcomingEvents});
                return data;
            })
            .then((data) => {
                selectedMarkerData[1](data);
                eventDetailsModalVisible[1](true);
            })
            .catch((error) => {
                const err = logAxiosError(error, 'createEvent');

                if (err.hasOwnProperty('error_data')) {
                    callAlert('Event Time', err.error_data.error.date);
                }

            });
    } catch (error) {
        console.log(`${error} ::: createEvent`);
        callAlert(undefined, `${error.toString()} ::: createEvent`);
        return;
    }
}
