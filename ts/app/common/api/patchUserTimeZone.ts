import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import * as RNLocalize from "react-native-localize";
import logAxiosError from 'ts/utils/logAxiosError';

interface IpatchUserTimeZone {
    //   LoggedIn: [boolean, (x: boolean) => void];
    userToken: [string, (x: string) => void];
}

export async function patchUserTimeZone({
    //   LoggedIn,
    userToken,
}: IpatchUserTimeZone) {
    try {
        const options: AxiosRequestConfig = {
            method: 'PATCH',
            url: `${tapMatchServerUrl}api/profile/timezone`,
            headers: {
                'X-Auth-Token': userToken[0],
                'Content-Type': 'application/json',
            },
            data: {
                timezone: RNLocalize.getTimeZone(),
            },
            withCredentials: false
        };
        axios
            .request(options)
            .then(({data}: any) => {
                console.log('Successfuly updated user timezone!');
            })
            .catch((error) => {
                logAxiosError(error, 'patchUserTimeZone');
            });
    } catch (error) {
        console.log(`${error} ::: patchUserTimeZone`);
    }
}
