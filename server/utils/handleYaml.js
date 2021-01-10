const fs = require('fs');
const yaml = require('js-yaml');

let data

try {
    let fileContents = fs.readFileSync('./config.yaml', 'utf8');
    data = yaml.load(fileContents);
} catch (e) {
    console.log(e);
}

module.exports = data
