import moment from "moment";

export default function makeDayWord(d: Date) {
    console.log(d, 'makeDayWord');
    const date = moment(d);
    if (moment().diff(date, 'days') >= 1) {
        return date.fromNow(); // '2 days ago' etc.
    }
    return date.calendar().split(' ')[0];
} 