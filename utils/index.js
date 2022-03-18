const useConfiguration = (data, CurrencyCountry, PaymentEntity, Currency) => {

        const LOCALITY = `${CurrencyCountry === PaymentEntity.Country ? 'LOCL': 'INTL'}`;
        const OTHERLOCALITY = LOCALITY === 'LOCL' ? 'INTL' : 'LOCL';
                
        const obj = {};
        let specificScore = 0;
        data.map(config => {
           let dataConfig = config.split(' ');
           switch(dataConfig[1]){
               case Currency:
                    specificScore+=20;
                    break;
                case '*':
                    specificScore+=15;
                    break;


                default: throw (`No fee configuration for ${Currency} transactions.`)
           }

           switch(dataConfig[2]){
                case LOCALITY:
                    specificScore+=20;
                    break;
                case '*':
                    specificScore+=15;
                    break;
                case OTHERLOCALITY:
                    specificScore=0;
                    break;
                default: specificScore=0;
                
           }

           const FEE_ENTITY = dataConfig[3].slice(0, dataConfig[3].indexOf('('));


           const ENITIES = ["CREDIT-CARD", "DEBIT-CARD", "BANK-ACCOUNT", "USSD", "WALLET-ID"]

           if((FEE_ENTITY === PaymentEntity.Type) && (ENITIES.includes(PaymentEntity.Type))){
               specificScore+=20;
           }else if(FEE_ENTITY === '*') {
                specificScore+=15;
           }else if(ENITIES.includes(PaymentEntity.Type)){
               specificScore=0;
           } else {
               specificScore=0;
               throw (`${PaymentEntity.Type} is not supported`)
           }


           
           if(FEE_ENTITY.includes(PaymentEntity.Type)){
                switch(dataConfig[3].slice((dataConfig[3].indexOf('(') + 1), dataConfig[3].indexOf(')'))){
                    case PaymentEntity.Brand:
                        specificScore+=20;
                        break;
                    case PaymentEntity.Issuer:
                        specificScore+=20;
                        break;
                    case PaymentEntity.Number:
                        specificScore+=20;
                        break;
                    case PaymentEntity.ID:
                        specificScore+=20;
                        break;
                    case PaymentEntity.SixID:
                        specificScore+=20;
                        break;
                    case "*":
                        specificScore+=15;
                        break;
                    default: specificScore=0;
                    
                }
           }

          
           
           obj[config] = specificScore;
           specificScore = 0;
        })
            
        let highestSpecificScore = Math.max.apply(null, Object.values(obj));

        return (() => {
                for(let objValue in obj){
                if(obj[objValue] === highestSpecificScore){
                    return objValue
                }
            }
        })()

}


module.exports = useConfiguration;
