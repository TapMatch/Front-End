import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';

interface IjoinEvent {
    userToken: string;
    communityId: string;
    eventMarkers: any;
    selectedMarkerData?: any;
    userProfile: any;
    eventDetailsModalVisible: [boolean, (x: boolean) => void];
}

export async function joinEvent({
    communityId,
    userToken,
    eventMarkers,
    selectedMarkerData,
    userProfile,
    eventDetailsModalVisible
}: IjoinEvent) {
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
            .then(() => getUserProfile({userProfile, userToken}))
            .then(({data}: any) => getEventMarkers({userToken, id: communityId, eventMarkers, selectedMarkerData: selectedMarkerData ? selectedMarkerData : null}))
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
                            console.log(error.response.request._response, 'error.response.request._response ::: joinEvent');
                        }
                    }
                }
                console.log(error);
                // callAlert(undefined, `${error.toString()} ::: joinEvent`);
            });
    } catch (error) {
        console.log(`${error} ::: joinEvent`);
        callAlert(undefined, `${error.toString()} ::: joinEvent`);
    }
}
