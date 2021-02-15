import axios, {AxiosRequestConfig} from 'axios';
import {Platform} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import logUserOut from 'ts/app/common/services/logUserOut';
import {tapMatchServerUrl} from 'ts/constants/constants';
import {DEV_MODE} from 'ts/tools/devModeTrigger';
import callAlert from 'ts/utils/callAlert';
import logAxiosError from 'ts/utils/logAxiosError';

interface IpostAvatar {
  userToken: any;
  pictureURI: any;
  LoggedIn?: [boolean, (x: boolean) => void];
  userProfile?: [any, (x: any) => void];
  user_has_passed_onboarding?: [boolean, (x: boolean) => void];

}

export async function postAvatar({
  userToken,
  pictureURI,
  LoggedIn,
  userProfile,
  user_has_passed_onboarding
}: IpostAvatar) {
  try {
    const quality = Platform.OS === 'ios' ? 2 : 10;
    ImageResizer.createResizedImage(pictureURI, 300, 300, 'JPEG', quality)
      .then(response => {
        const form = new FormData();
        form.append('photo', {
          uri: response.uri,
          name: `user_avatar_${userToken}.jpg`,
          filename: `user_avatar.jpg`,
          type: 'image/jpg',
        });

        const options: AxiosRequestConfig = {
          method: 'POST',
          url: `${tapMatchServerUrl}api/profile/avatar`,
          headers: {
            Accept: 'application/json',
            'X-Auth-Token': userToken,
            'content-type': `multipart/form-data;`,
          },
          data: form,
        };

        axios
          .request(options)
          .then(function (response) {
            console.log('SUCCESS!!!');
          })
          .catch(function (error) {
            logAxiosError(error, `postAvatar`);


            if (LoggedIn && userProfile && user_has_passed_onboarding) {
              logUserOut(error, LoggedIn, userProfile, user_has_passed_onboarding);
            }
          });
      })
      .catch(error => {

        if (DEV_MODE) {
          callAlert(undefined, `${error.toString()} ::: postAvatar`);
          console.log(error);
        }
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });
  } catch (error) {

    if (DEV_MODE) {
      console.log(`${error} ::: postAvatar`);
      callAlert(undefined, `${error.toString()} ::: postAvatar`);
    }
  }
}
