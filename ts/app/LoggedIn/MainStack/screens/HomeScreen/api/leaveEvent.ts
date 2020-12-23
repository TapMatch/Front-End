import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';

interface IleaveEvent {
	userToken: string;
	communityId: string;
	eventId: string;
	eventMarkers: any;

}

export async function leaveEvent({
	communityId,
	eventId,
	userToken,
	eventMarkers
}: IleaveEvent) {
	try {
		const options: AxiosRequestConfig = {
			method: 'DELETE',
			url: `${tapMatchServerUrl}api/communities/${communityId}/events/${eventId}/leave`,
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
				// callAlert(undefined, `${error.toString()} ::: leaveEvent`);
			});
	} catch (error) {
		console.log(`${error} ::: leaveEvent`);
		callAlert(undefined, `${error.toString()} ::: leaveEvent`);
	}
}
