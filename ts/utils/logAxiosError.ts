import {AxiosError} from "axios";
import {DEV_MODE} from "ts/tools/devModeTrigger";

export default function logAxiosError(error: AxiosError, cameFrom: string) {
    if (DEV_MODE) {
        if (error.response) {
            // Request made and server responded
            const {data, status, headers} = error.response;

            console.log(`${cameFrom}-data-----`, data, `-----data-${cameFrom}`);
            console.log(`${cameFrom}-status-----`, status, `-----status-${cameFrom}`);
            console.log(`${cameFrom}-headers-----`, headers, `-----headers-${cameFrom}`);

            return {
                error_data: data,
                status,
                headers
            };

        } else if (error.request) {
            // The request was made but no response was received

            console.log(`${cameFrom}-request-----`, error.request, `-----request-${cameFrom}`);
            console.log(`${cameFrom}-request-----`, error.request, `-----request-${cameFrom}`);

            return error.request;

        } else {
            // Something happened in setting up the request that triggered an Error
            console.log(`${cameFrom}-message-----`, error.message, `-----message-${cameFrom}`);

            return error.message;
        }
    }
}