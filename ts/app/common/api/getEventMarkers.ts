import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import callAlert from 'ts/utils/callAlert';
import logUserOut from '../services/logUserOut';

interface IgetEventMarkers {
  userToken: string;
  id: string;
  eventMarkers: any;
  selectedMarkerData?: any;
  LoggedIn?: [boolean, (x: boolean) => void];
  userProfile?: [any, (x: any) => void];
  user_has_passed_onboarding?: [boolean, (x: boolean) => void];
}

export async function getEventMarkers({
  id,
  userToken,
  eventMarkers,
  selectedMarkerData,
  LoggedIn,
  userProfile,
  user_has_passed_onboarding
}: IgetEventMarkers) {

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
        // if (selectedMarkerData) {
        //   const id = selectedMarkerData[0].id;
        //   const element = eventMarkers[0].find((el: any) => el.id === id);
        //   if (element) {
        //     selectedMarkerData[1](element);
        //   } else {
        //     console.log('CAN NOT RELOAD SELECTED MARKER DATA');
        //   }
        // }
      })
      .catch((error) => {

        if (DEV_MODE) {
          console.log(error, '::: getEventMarkers');
          callAlert(undefined, `${error.toString()} ::: getEventMarkers`);
        }

        if (LoggedIn && userProfile && user_has_passed_onboarding) {
          logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
        }

      });
  } catch (error) {

    if (DEV_MODE) {
      console.log(`${error} ::: getEventMarkers`);

      callAlert(undefined, `${error.toString()} ::: getEventMarkers`);
    }
  }
}
