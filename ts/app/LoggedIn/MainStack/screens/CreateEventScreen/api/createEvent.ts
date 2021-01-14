import axios, {AxiosRequestConfig} from 'axios';
import {LatLng} from 'react-native-maps';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import moment from 'moment';
import {getUpcomingEvents} from 'ts/app/common/api/getUpcomingEvents';

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
    selectedMarkerData
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
                join_limit
            }
        };

        return axios
            .request(options)
            .then(({data}: any) => {
                getEventMarkers({userToken, id: communityId, eventMarkers});
                getUpcomingEvents({userToken, communityId, upcomingEvents});
                return data;
            })
            .then((data) => {
                selectedMarkerData[1](data);
                eventDetailsModalVisible[1](true);
            })
            .catch((error) => {
                console.log(error);
                // callAlert(undefined, `${error.toString()} ::: createEvent`);
            });
    } catch (error) {
        console.log(`${error} ::: createEvent`);
        callAlert(undefined, `${error.toString()} ::: createEvent`);
        return;
    }
}
