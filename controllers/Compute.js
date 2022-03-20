const keys = require('../configs/keys');
const jwt = require('jsonwebtoken');
const Configuration = require('../models/Configuration');
const useConfiguration = require('../utils')

module.exports.ComputeTransactionFee = async(req, res, next) => {
    try {
        const {token} = req.session;
        if(!token) throw ('There is no fee configuration spec indexed, please do the indexing before using this route')
        const { Amount, Customer: { BearsFee }, CurrencyCountry, Currency,
         PaymentEntity } = req.body;
    
        jwt.verify(token, keys.SECRETKEY, (err, { data }) => {
            if(err){
                return res.status(403).json({"messaage": "Auth failed"})
            }
    
            let mostSpecific;
            try {
                mostSpecific = useConfiguration(data, CurrencyCountry, PaymentEntity, Currency);
            } catch(e){
                return res.status(403).json({"error": e});
            }
            
    
            if(mostSpecific.length){
                const FEE_TYPE_VALUE = mostSpecific.slice(mostSpecific.indexOf('APPLY ')).split(' ');
                const FEE_TYPE = FEE_TYPE_VALUE[1];
                const FEE_VALUE = FEE_TYPE_VALUE[2];
                let AppliedFeeValue;
                let AppliedFeeID = mostSpecific.split(' ')[0];
    
                switch(FEE_TYPE){
                    case 'PERC':
                        AppliedFeeValue = Math.ceil((Number(FEE_VALUE) / 100) * Amount);
                        break;
                    case 'FLAT':
                        AppliedFeeValue = Number(FEE_VALUE);
                        break;
                    case 'FLAT_PERC':
                        const flat_perc = FEE_VALUE.split(':');
                        AppliedFeeValue = Math.ceil(Number(flat_perc[0]) + ((Number(flat_perc[1]) / 100) * Amount));
                        break;
                    default: return res.status(403).json({"error": `The FEE_VALUE ${mostSpecific.slice(mostSpecific.indexOf('APPLY'))} is incorrect or wrongly formatted`});
                }
        
                const ChargeAmount = BearsFee ? Amount + AppliedFeeValue : Amount
                const SettlementAmount = ChargeAmount - AppliedFeeValue;
        
                res.status(200).json({ AppliedFeeID, AppliedFeeValue, ChargeAmount, SettlementAmount });
            }
         
        })
    } catch(e){
        next(e)
    }
}

