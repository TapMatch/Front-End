import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IgetEventMarkers {
  userToken: string;
  id: string;
  eventMarkers: any;
}

export async function getEventMarkers({
  id,
  userToken,
  eventMarkers
}: IgetEventMarkers) {
  console.log(id,
    userToken,
    eventMarkers, 'GGGGGGGGGGGGGGGGGGGGGGG');
  try {
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: `${tapMatchServerUrl}api/communities/${id}/events`,
      headers: {
        'X-Auth-Token': userToken,
        'Content-Type': 'application/json',
      },
    };
    axios
      .request(options)
      .then(({data}: any) => {
        console.log(data, '-0-0-0-0-0-0-0-0-0-0-0-');
        eventMarkers[1](data);
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
