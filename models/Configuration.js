const mongoose = require('mongoose');
const { Schema } = mongoose;

const configurationSchema = new Schema({
    FEE_ID: {
        type: String,
        required: true,
        maxlength: 8,
        minlength: 8
    },
    FEE_CURRENCY: {
        type: String,
        required: true,
        enum: ['*', 'NGN']
    },
    FEE_LOCALE: {
        type: String,
        required: true,
    },
    FEE_ENTITY: {
        type: String,
        required: true,
        enum: ['CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID'],
        uppercase: true
    },
    ENTITY_PROPERTY: {
        type: String,
        required: true
    },
    FEE_TYPE: {
        type: String,
        required: true,
        enum: ['FLAT', 'PERC', 'FLAT-PERC'],
        uppercase: true
    },
    FEE_VALUE: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('configuration', configurationSchema);