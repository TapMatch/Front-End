import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IgetEventMarkers {
  userToken: string;
  id: string;
  eventMarkers: any;
  selectedMarkerData?: any;
}

export async function getEventMarkers({
  id,
  userToken,
  eventMarkers,
  selectedMarkerData
}: IgetEventMarkers) {
  console.log(
    id,
    userToken,
    eventMarkers[0],
    '>>>>>>getEventMarkers<<<<<<');
  try {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `${tapMatchServerUrl}api/communities/${id}/events`,
      headers: {
        'X-Auth-Token': userToken,
        'Content-Type': 'application/json',
      },
      withCredentials: false
    };
    axios
      .request(options)
      .then(({data}: any) => {
        eventMarkers[1](data);
        if (selectedMarkerData) {
          const id = selectedMarkerData[0].id;
          const element = eventMarkers[0].find((el: any) => el.id === id);
          if (element) {
            selectedMarkerData[1](element);
          } else {
            console.log('CAN NOT RELOAD SELECTED MARKER DATA');
          }
        }
      })
      .catch((error) => {
        console.log(error);
        // callAlert(undefined, `${error.toString()} ::: getEventMarkers`);
      });
  } catch (error) {
    console.log(`${error} ::: getEventMarkers`);
    callAlert(undefined, `${error.toString()} ::: getEventMarkers`);
  }
}
