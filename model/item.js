var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
    order: { type: Number/* , required: true */ },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },

    orderItemProduct: { type: Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('Item', schema);