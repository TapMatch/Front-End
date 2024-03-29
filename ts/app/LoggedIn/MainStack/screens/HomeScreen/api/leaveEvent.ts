import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import logUserOut from 'ts/app/common/services/logUserOut';

interface IleaveEvent {
	userToken: string;
	selectedCommunityData: any;
	eventMarkers: any;
	selectedMarkerData?: any;
	userProfile: any;
	eventDetailsModalVisible: [boolean, (x: boolean) => void];
	LoggedIn?: [boolean, (x: boolean) => void];
	user_has_passed_onboarding?: [boolean, (x: boolean) => void];

}

export async function leaveEvent({
	selectedCommunityData,
	userToken,
	eventMarkers,
	selectedMarkerData,
	userProfile,
	eventDetailsModalVisible,
	LoggedIn,
	user_has_passed_onboarding

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
			// .then(() => {
			// 	const arr = selectedMarkerData[0].members.filter((el: any) => el.id !== userProfile[0].id);
			// 	selectedMarkerData[1]({
			// 		...selectedMarkerData[1],
			// 		...arr
			// 	});
			// })
			.then(() => selectedMarkerData[1]({}))
			.then(() => eventDetailsModalVisible[1](false))
			.then(() => getUserProfile({userProfile, userToken}))
			.then(({data}: any) => getEventMarkers({userToken, id: selectedCommunityData[0].id, eventMarkers, selectedMarkerData: selectedMarkerData ? selectedMarkerData : null}))
			.catch((error) => {
				if (error.response) {
					if (error.response.request) {
						if (error.response.request._response) {
							if (error.response.request._response === `{"error":"event with this id does not exist"}`) {
								const btns = [
									{
										text: 'Ok',
										onPress: () => {
											eventDetailsModalVisible[1](false);
											const ind = eventMarkers[0].findIndex((el: any) => el.id === selectedMarkerData[0].id);
											let newArr = [...eventMarkers[0]];
											newArr.splice(ind, 1);
											eventMarkers[1](newArr);
										},
									},
								];
								callAlert(undefined, 'This event was removed by the host.', btns);
							}
						}
					}
				}

				if (LoggedIn && userProfile && user_has_passed_onboarding) {
					logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
				}

				if (DEV_MODE) {
					console.log(error, '::: leaveEvent');
					callAlert(undefined, `${error.toString()} ::: leaveEvent`);
				}
				getEventMarkers({userToken, id: selectedCommunityData[0].id, eventMarkers, selectedMarkerData: selectedMarkerData ? selectedMarkerData : null});
			});
	} catch (error) {
		console.log(`${error} ::: leaveEvent`);

		if (DEV_MODE) {
			callAlert(undefined, `${error.toString()} ::: leaveEvent`);
		}
	}
}
