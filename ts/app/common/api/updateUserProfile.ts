import axios, {AxiosRequestConfig} from 'axios';
import {tapMatchServerUrl} from 'ts/constants/constants';
import callAlert from 'ts/utils/callAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IupdateUserProfile {
    userProfile: [any, (x: any) => void];
    userToken: string;
    data: any;
}

export async function updateUserProfile({
    userProfile,
    userToken,
    data,
}: IupdateUserProfile) {
    try {
        console.log('rtrtrtrtrtrtr!!!!!234!!!!!trtrtrtrtrtrtrr');

        const options: AxiosRequestConfig = {
            method: 'PUT',
            url: `${tapMatchServerUrl}api/profile`,
            headers: {
                'X-Auth-Token': userToken,
                'Content-Type': 'application/json',
            },
            data
        };

        axios
            .request(options)
            .then(({data}: any) => {
                userProfile[1](data.data);
                // console.log('YYYYYYYYYYYY54355YYYYYYYYY', data.data);
                const user_profile = JSON.stringify(data);
                AsyncStorage.setItem('@user_profile', user_profile);
            })
            .catch((error) => {
                console.log(error);
                callAlert(undefined, `${error.toString()} ::: updateUserProfile`);
            });
    } catch (error) {
        console.log(`${error} ::: updateUserProfile`);
        callAlert(undefined, `${error.toString()} ::: updateUserProfile`);
    }
}
