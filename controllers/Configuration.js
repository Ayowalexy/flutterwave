const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');


module.exports.CreateNewConfiguration = async (req, res) => {
    const { FeeConfigurationSpec } = req.body;
    const configs = FeeConfigurationSpec.split('\n')

    const token = jwt.sign({data: configs,}, keys.SECRETKEY);
    req.session.token = token;

    res.status(200).json({"status": "Ok"})

}
