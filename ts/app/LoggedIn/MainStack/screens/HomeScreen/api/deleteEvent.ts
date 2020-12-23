import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';

interface IdeleteEvent {
    userToken: string;
    communityId: string;
    eventId: string;
    eventMarkers: any;

}

export async function deleteEvent({
    communityId,
    eventId,
    userToken,
    eventMarkers
}: IdeleteEvent) {
    try {
        const options: AxiosRequestConfig = {
            method: 'DELETE',
            url: `${tapMatchServerUrl}api/communities/${communityId}/events/${eventId}`,
            headers: {
                'X-Auth-Token': userToken,
                'Content-Type': 'application/json',
            },
        };
        axios
            .request(options)
            .then(({data}: any) => getEventMarkers({userToken, id: communityId, eventMarkers}))
            .catch((error) => {
                console.log(error);
                // callAlert(undefined, `${error.toString()} ::: deleteEvent`);
            });
    } catch (error) {
        console.log(`${error} ::: deleteEvent`);
        callAlert(undefined, `${error.toString()} ::: deleteEvent`);
    }
}