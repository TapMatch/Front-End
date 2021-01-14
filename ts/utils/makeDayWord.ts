import moment from "moment";

export default function makeDayWord(d: Date) {
    const date = moment(d);
    if (moment().diff(date, 'days') >= 1) {
        return date.fromNow();
    }
    return date.format('MM.DD.YY');
} 