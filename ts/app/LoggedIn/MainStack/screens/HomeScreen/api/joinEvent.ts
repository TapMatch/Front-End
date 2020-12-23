import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';

interface IjoinEvetn {
    userToken: string;
    communityId: string;
    eventId: string;
    eventMarkers: any;

}

export async function joinEvetn({
    communityId,
    eventId,
    userToken,
    eventMarkers
}: IjoinEvetn) {
    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `${tapMatchServerUrl}api/communities/${communityId}/events/${eventId}/join`,
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
                // callAlert(undefined, `${error.toString()} ::: joinEvetn`);
            });
    } catch (error) {
        console.log(`${error} ::: joinEvetn`);
        callAlert(undefined, `${error.toString()} ::: joinEvetn`);
    }
}
