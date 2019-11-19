var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
    number: { type: Number, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    cardHolder: { type: String, required: true },
    cardNumber: { type: Number, required: true },

    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

module.exports = mongoose.model('Order', schema);