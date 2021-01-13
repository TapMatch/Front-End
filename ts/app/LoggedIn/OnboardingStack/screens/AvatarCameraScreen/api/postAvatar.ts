import axios, {AxiosRequestConfig} from 'axios';
import ImageResizer from 'react-native-image-resizer';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';

interface IpostAvatar {
  userToken: any;
  pictureURI: any;
}

export async function postAvatar({userToken, pictureURI}: IpostAvatar) {
  try {
    ImageResizer.createResizedImage(pictureURI, 300, 300, 'JPEG', 15)
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
            console.log(error);
            callAlert(undefined, `${error.toString()} ::: postAvatar`);
          });
      })
      .catch(err => {
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });
  } catch (error) {
    console.log(`${error} ::: postAvatar`);
    callAlert(undefined, `${error.toString()} ::: postAvatar`);
  }
}
