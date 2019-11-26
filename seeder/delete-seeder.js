var mongoose = require('mongoose');

var Cart = require('../model/cart');
var Item = require('../model/item');
var Order = require('../model/order');
var Product = require('../model/product');
var User = require('../model/user');

//protocol://address/db_name
var uri = 'mongodb://localhost/funkoshop';
//standard promise library
mongoose.Promise = global.Promise;
var cart = {
    subtotal: 0,
    tax: 0.21,
    total: 0,
    shoppingCartItems: []
};
var users = [
    {
        name: 'user',
        surname: 'surname',
        email: 'email@email.com',
        birth: new Date('10/10/1998'),
        address: 'Calle falsa 123',
        password: 'password',
        shoppingCart: {},
        userOrders: [
            {
                date: new Date('31/10/2019'),
                number: 11111111,
                address: "aaa",
                subtotal: 20,
                tax: 0.2,
                total: 20,
                cardHolder: 22222,
                cardNumber: 3423424,
                orderItems: [{
                    qty: 1,
                    price: 10,
                    total: 20,
                    orderItemProduct: {
                        id: 1,
                        name: "Goku",
                        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
                        price: 10,
                        url: "/images/goku.jpg"
                    }
                }]
            }
        ]
    },


];

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
    .then(function () { return Item.deleteMany(); })
    .then(function () { return Order.deleteMany(); })
    .then(function () { return Cart.deleteMany(); })
    .then(function () { return User.deleteMany(); })
    .then(function () {
        mongoose.disconnect();
    })
    .catch(function (err) {
        console.error('Error', err.message);
    });