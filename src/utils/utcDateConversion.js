import moment from 'moment';
export const utcDate = (oldData) => {
    let data = new Date(oldData);
    data = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds()));
    const month = data.getMonth() + 1;
    return `${data.getFullYear()}-${month}-${data.getDate()}  ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
}

export const showDate = (oldDate, req) => {
    if (!oldDate) return null;

    const date = moment.utc(oldDate); // parse in UTC
    if (!date.isValid()) return 'Invalid Date';

    return req === "DATE"
        ? date.format("DD/MM/YYYY")
        : date.format("HH:mm:ss");
};
