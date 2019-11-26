var mongoose = require('mongoose');

var Product = require('../model/product');

var Model = require('../model/model');

//protocol://address/db_name
var uri = 'mongodb://localhost/funkoshop';
//standard promise library
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('connecting', function () {
    console.log('Connecting to ', uri);
});
db.on('connected', function () {
    console.log('Connected to ', uri);
});
db.on('disconnecting', function () {
    console.log('Disconnecting from ', uri);
});
db.on('disconnected', function () {
    console.log('Disconnected from ', uri);
});
db.on('error', function (err) {
    console.error('Error', err.message);
});

mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(function () {
        return Model.getUserOrders("5dd9586a1dfa5010084aed63");
    })
    .then(function (orders) {
        console.log(orders);
    })
    .then(function () {
        mongoose.disconnect();
    })
    .catch(function (err) {
        console.error('Error', err.message);
    });