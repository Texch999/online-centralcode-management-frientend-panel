const utcDate = (oldData) => {
    let data = new Date(oldData);
    data = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate(), data.getHours(), data.getMinutes(), data.getSeconds()));
    const month = data.getMonth() + 1;
    return `${data.getFullYear()}-${month}-${data.getDate()}  ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
}
module.exports = utcDate;