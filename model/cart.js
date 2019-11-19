var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },

    shoppingCartItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

module.exports = mongoose.model('Cart', schema);