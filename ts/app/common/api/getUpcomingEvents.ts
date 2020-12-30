import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IgetUpcomingEvents {
    userToken: string;
    communityId: string;
    upcomingEvents: any;
}

export async function getUpcomingEvents({
    communityId,
    userToken,
    upcomingEvents
}: IgetUpcomingEvents) {
    console.log('UIIUIUIUIUIUIUIUIUIUIUIUIUIIIUIUIUI', communityId);
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
                console.log(data.data, 'UPCOMING EVENTS!!!');
            })
            .catch((error) => {
                console.log(error);
                // callAlert(undefined, `${error.toString()} ::: getUpcomingEvents`);
            });
    } catch (error) {
        console.log(`${error} ::: getUpcomingEvents`);
        callAlert(undefined, `${error.toString()} ::: getUpcomingEvents`);
    }
}