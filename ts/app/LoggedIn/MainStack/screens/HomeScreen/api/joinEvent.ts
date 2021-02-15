import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';
import {getUserProfile} from 'ts/app/common/api/getUserProfile';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import logUserOut from 'ts/app/common/services/logUserOut';

interface IjoinEvent {
    userToken: string;
    communityId: string;
    eventMarkers: any;
    selectedMarkerData?: any;
    userProfile: any;
    eventDetailsModalVisible: [boolean, (x: boolean) => void];
    joinRequestInprogress: [boolean, (x: boolean) => void];
    LoggedIn?: [boolean, (x: boolean) => void];
    user_has_passed_onboarding?: [boolean, (x: boolean) => void];

}

export async function joinEvent({
    communityId,
    userToken,
    eventMarkers,
    selectedMarkerData,
    userProfile,
    eventDetailsModalVisible,
    joinRequestInprogress,
    LoggedIn,
    user_has_passed_onboarding

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
                if (DEV_MODE) {
                    console.log(`${error} ::: joinEvent`);

                    callAlert(undefined, `${error.toString()} ::: joinEvent`);
                }

                if (LoggedIn && userProfile && user_has_passed_onboarding) {
                    logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
                }

                getEventMarkers({
                    userToken, id: communityId,
                    eventMarkers,
                    selectedMarkerData: selectedMarkerData ? selectedMarkerData : null
                })
                    .then(() => getUserProfile({userProfile, userToken}))
                    .then(() => joinRequestInprogress[1](false));
            });
    } catch (error) {
        console.log(`${error} ::: joinEvent`);

        if (DEV_MODE) {
            callAlert(undefined, `${error.toString()} ::: joinEvent`);
        }
    }
}
