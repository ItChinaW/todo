function parseTime() {
    let sd = require('silly-datetime');
    let time = sd.format(new Date(), 'HH:mm:ss');
    return time
}

export default parseTime
