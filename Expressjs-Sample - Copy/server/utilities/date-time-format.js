function formattedDate(date) {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        d = new Date(date || Date.now()),
        month = months[d.getMonth()],
        day = '' + d.getDate().toString(),
        hours = d.getHours().toString(),
        minutes= d.getMinutes().toString(),
        seconds = d.getSeconds().toString();

    if (day.length < 2) day = '0' + day;

    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return [day, month].join(' ') + ' ' + [hours,minutes,seconds].join(':');
}

module.exports = {
    formattedDate: formattedDate
};
