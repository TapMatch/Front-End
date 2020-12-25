import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';

interface IleaveEvent {
	userToken: string;
	selectedCommunityData: any;
	eventMarkers: any;
	selectedMarkerData?: any;
	userProfile: any;
	eventDetailsModalVisible: [boolean, (x: boolean) => void];
}

export async function leaveEvent({
	selectedCommunityData,
	userToken,
	eventMarkers,
	selectedMarkerData,
	userProfile,
	eventDetailsModalVisible
}: IleaveEvent) {
	try {
		const options: AxiosRequestConfig = {
			method: 'DELETE',
			url: `${tapMatchServerUrl}api/communities/${selectedCommunityData[0].id}/events/${selectedMarkerData[0].id}/leave`,
			headers: {
				'X-Auth-Token': userToken,
				'Content-Type': 'application/json',
			},
		};
		axios
			.request(options)
			.then(() => {
				eventDetailsModalVisible[1](false);
			})
			.then(() => getUserProfile({userProfile, userToken}))
			.then(({data}: any) => getEventMarkers({userToken, id: selectedCommunityData[0].id, eventMarkers, selectedMarkerData: selectedMarkerData ? selectedMarkerData : null}))
			.catch((error) => {
				console.log(error);
				// callAlert(undefined, `${error.toString()} ::: leaveEvent`);
			});
	} catch (error) {
		console.log(`${error} ::: leaveEvent`);
		callAlert(undefined, `${error.toString()} ::: leaveEvent`);
	}
}
