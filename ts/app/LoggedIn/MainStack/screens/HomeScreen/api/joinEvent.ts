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
    joinRequestInprogress: [boolean, (x: boolean) => void];
}

export async function joinEvent({
    communityId,
    userToken,
    eventMarkers,
    selectedMarkerData,
    userProfile,
    eventDetailsModalVisible,
    joinRequestInprogress
}: IjoinEvent) {
    try {
        joinRequestInprogress[1](true);
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
            .then(() => {
                const {avatar, name, id} = userProfile[0];
                const user = {
                    ...selectedMarkerData[0],
                    members: [
                        ...selectedMarkerData[0].members,
                        {
                            avatar,
                            name,
                            id
                        }]

                };
                selectedMarkerData[1](user);
            })
            .then(() => getUserProfile({userProfile, userToken}))
            .then(() => {
                getEventMarkers({userToken, id: communityId, eventMarkers, selectedMarkerData: selectedMarkerData ? selectedMarkerData : null})
                    .then(() => joinRequestInprogress[1](false));
            })

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
                getEventMarkers({
                    userToken, id: communityId,
                    eventMarkers,
                    selectedMarkerData: selectedMarkerData ? selectedMarkerData : null
                })
                    .then(() => joinRequestInprogress[1](false));
            });
    } catch (error) {
        console.log(`${error} ::: joinEvent`);
        callAlert(undefined, `${error.toString()} ::: joinEvent`);
    }
}
