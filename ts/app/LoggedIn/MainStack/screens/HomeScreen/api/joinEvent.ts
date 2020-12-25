import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';

interface IjoinEvent {
    userToken: string;
    communityId: string;
    eventMarkers: any;
    selectedMarkerData?: any;
}

export async function joinEvent({
    communityId,
    userToken,
    eventMarkers,
    selectedMarkerData
}: IjoinEvent) {
    console.log(communityId,
        userToken,
        eventMarkers[0],
        selectedMarkerData[0]);
    try {
        const options: AxiosRequestConfig = {
            method: 'POST',
            url: `${tapMatchServerUrl}api/communities/${communityId}/events/${selectedMarkerData[0].id}/join`,
            headers: {
                'X-Auth-Token': userToken,
                'Content-Type': 'application/json',
            },
        };
        axios
            .request(options)
            .then(({data}: any) => getEventMarkers({userToken, id: communityId, eventMarkers, selectedMarkerData: selectedMarkerData ? selectedMarkerData : null}))
            .catch((error) => {
                console.log(error);
                // callAlert(undefined, `${error.toString()} ::: joinEvent`);
            });
    } catch (error) {
        console.log(`${error} ::: joinEvent`);
        callAlert(undefined, `${error.toString()} ::: joinEvent`);
    }
}
