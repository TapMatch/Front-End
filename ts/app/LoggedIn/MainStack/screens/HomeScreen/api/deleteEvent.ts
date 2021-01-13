import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import {getEventMarkers} from 'ts/app/common/api/getEventMarkers';

interface IdeleteEvent {
    userToken: string;
    selectedCommunityData: any;
    eventMarkers: any;
    selectedMarkerData?: any;
    currentUserIsOrganizer: boolean;
    eventDetailsModalVisible: [boolean, (x: boolean) => void];
}

export async function deleteEvent({
    selectedCommunityData,
    userToken,
    eventMarkers,
    eventDetailsModalVisible,
    selectedMarkerData,
    currentUserIsOrganizer
}: IdeleteEvent) {

    try {
        if (currentUserIsOrganizer) {
            const options: AxiosRequestConfig = {
                method: 'DELETE',
                url: `${tapMatchServerUrl}api/communities/${selectedCommunityData[0].id}/events/${selectedMarkerData[0].id}`,
                headers: {
                    'X-Auth-Token': userToken,
                    'Content-Type': 'application/json',
                },
            };
            axios
                .request(options)
                .then(() => {
                    eventDetailsModalVisible[1](false);
                    const ind = eventMarkers[0].findIndex((el: any) => el.id === selectedMarkerData[0].id);
                    if (ind > -1) {
                        let newEventMarkersArr = [...eventMarkers[0]];
                        newEventMarkersArr.splice(ind, 1);
                        eventMarkers[1](newEventMarkersArr);
                    }
                })
                .then(({data}: any) => getEventMarkers({userToken, id: selectedCommunityData[0].id, eventMarkers, selectedMarkerData: selectedMarkerData ? selectedMarkerData : null}))
                .catch((error) => {
                    console.log(error);
                    // callAlert(undefined, `${error.toString()} ::: deleteEvent`);
                });
        } else {
            console.log('ONLY ORGANIZER CAN DELETE EVENT');
        }
    } catch (error) {
        console.log(`${error} ::: deleteEvent`);
        callAlert(undefined, `${error.toString()} ::: deleteEvent`);
    }
}
