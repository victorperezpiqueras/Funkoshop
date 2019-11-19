var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    birth: { type: Date, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },

    shoppingCart: { type: Schema.Types.ObjectId, ref: 'Cart' },
    userOrders: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

module.exports = mongoose.model('User', schema);