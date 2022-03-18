const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');

const Parser = (data) => {
    const parsedData = data.split('\n');
    const token = jwt.sign({data: parsedData}, keys.SECRETKEY);
    return token
}

module.exports = Parser