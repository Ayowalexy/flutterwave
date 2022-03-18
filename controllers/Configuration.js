const Configuration = require('../models/Configuration');
const jwt = require('jsonwebtoken');
const useConfiguration = require('../utils');
const keys = require('../configs/keys');


module.exports.CreateNewConfiguration = async (req, res) => {
    // const token = jwt.sign()
    const { FeeConfigurationSpec } = req.body;
    const configs = FeeConfigurationSpec.split('\n');

    // const mostSpecificConfig = useConfiguration(configs).split(' ');
    // const newConfiguration = new Configuration({
    //     FEE_ID: mostSpecificConfig[0],
    //     FEE_CURRENCY: mostSpecificConfig[1],
    //     FEE_LOCALE: mostSpecificConfig[2],
    //     FEE_ENTITY: mostSpecificConfig[3].slice(0, mostSpecificConfig[3].indexOf('(')),
    //     ENTITY_PROPERTY: mostSpecificConfig[3].slice((mostSpecificConfig[3].indexOf('(') + 1), mostSpecificConfig[3].indexOf(')')),
    //     FEE_TYPE: mostSpecificConfig[6],
    //     FEE_VALUE: mostSpecificConfig[7]
    // })

    // await newConfiguration.save();

    const token = jwt.sign({data: configs,}, keys.SECRETKEY);
    req.session.token = token;


    res.status(200).json({"status": "Ok"})

}
