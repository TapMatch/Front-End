import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IgetEventDetails {
    userToken: string;
    communityId: string;
    eventId: string;
    selectedMarkerData: any;

}

export async function getEventDetails({
    communityId,
    eventId,
    userToken,
    selectedMarkerData
}: IgetEventDetails) {
    try {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: `${tapMatchServerUrl}api/communities/${communityId}/events/${eventId}`,
            headers: {
                'X-Auth-Token': userToken,
                'Content-Type': 'application/json',
            },
        };
        axios
            .request(options)
            .then(({data}: any) => selectedMarkerData[1](data))
            .catch((error) => {
                console.log(error);
                // callAlert(undefined, `${error.toString()} ::: getEventDetails`);
            });
    } catch (error) {
        console.log(`${error} ::: getEventDetails`);
        callAlert(undefined, `${error.toString()} ::: getEventDetails`);
    }
}
