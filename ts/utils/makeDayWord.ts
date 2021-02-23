import moment from "moment";

export default function makeDayWord(d: Date) {
    const date = moment(d);
    const today = moment();
    const tomorrow = moment().add(1, 'day');

    if (date.isSame(tomorrow, 'day')) {
        return 'Tomorrow';
    }

    if (date.isSame(today, 'day')) {
        return 'Today';
    }

    return date.format('DD.MM.YY');
} 