import {AxiosError} from "axios";

export default function (error: AxiosError, LoggedIn: [boolean, (x: boolean) => void], cameFrom: string) {
    if (error.response) {
        // Request made and server responded
        console.log(`${cameFrom}-data-----`, error.response.data, `-----data-${cameFrom}`);
        console.log(`${cameFrom}-status-----`, error.response.status, `-----status-${cameFrom}`);
        console.log(`${cameFrom}-headers-----`, error.response.headers, `-----headers-${cameFrom}`);
        if (error.response.status === 401) {
            if (error.response.data === '{"message": "Invalid Token"}') {
                LoggedIn[1](false);
            }
        }

    }
}