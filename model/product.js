var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    url: { type: String, required: true }
});

module.exports = mongoose.model('Product', schema);