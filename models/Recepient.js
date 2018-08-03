const {Schema} = require('mongoose');

const RecepientSchema = new Schema({
    email: String,
    responded: {
        type: Boolean,
        default: false
    }
});

module.exports = RecepientSchema;