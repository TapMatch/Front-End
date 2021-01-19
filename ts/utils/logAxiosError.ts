import {AxiosError} from "axios";

export default function (error: AxiosError, cameFrom: string) {
    if (error.response) {
        // Request made and server responded
        console.log(`${cameFrom}-data-----`, error.response.data, `-----data-${cameFrom}`);
        console.log(`${cameFrom}-status-----`, error.response.status, `-----status-${cameFrom}`);
        console.log(`${cameFrom}-headers-----`, error.response.headers, `-----headers-${cameFrom}`);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(`${cameFrom}-request-----`, error.request, `-----request-${cameFrom}`);
        console.log(`${cameFrom}-request-----`, error.request, `-----request-${cameFrom}`);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log(`${cameFrom}-message-----`, error.message, `-----message-${cameFrom}`);
    }
}