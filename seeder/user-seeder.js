var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var Cart = require('../model/cart');
var Item = require('../model/item');
var Order = require('../model/order');
var Product = require('../model/product');
var User = require('../model/user');

var ObjectId = require('mongodb').ObjectID;
//protocol://address/db_name
var uri = 'mongodb+srv://'+process.env.mongoUser+':'+process.env.mongoPass+'@clustergame-safci.mongodb.net/funkoshop?retryWrites=true&w=majority';
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
        _id: new ObjectId("555555555555555555555555"),
        name: 'user',
        surname: 'surname',
        email: 'email@email.com',
        birth: new Date('10/10/1998'),
        address: 'Calle falsa 123',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
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
        var promises = [];
        var product = Product.findOne({});
        var item = new Item({
            order: 123456,
            qty: 1,
            price: 10,
            total: 20,
            orderItemProduct: /* product._id */undefined
        }).save()
        var order = new Order({
            number: 11111111,
            date: new Date('2/10/2019'),
            address: "aaa",
            subtotal: 20,
            tax: 0.2,
            total: 20,
            cardHolder: "22222",
            cardNumber: 3423424,
            user: null,
            orderItems: [/* item._id */]
        }).save();
        var cart = new Cart({
            subtotal: 0,
            tax: 0.21,
            total: 0,
            shoppingCartItems: [/* item */]
        }).save();
        var user = new User({
            name: 'user',
            surname: 'surname',
            email: 'email@email.com',
            birth: new Date('10/10/1998'),
            address: 'Calle falsa 123',
            password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
            shoppingCart: /* cart */undefined,
            userOrders: []
        }).save();
        promises.push(product);//0
        promises.push(item);//1
        promises.push(cart);//2
        promises.push(order);//3
        promises.push(user);//4
        return Promise.all(promises)    
        
    })
    .then(function () {
        return Promise.all([Product.findOne({}),Item.findOne({})])    
    })
    .then(function (promises) {
        //product inside Item
        promises[1].orderItemProduct = promises[0];
        return promises[1].save()
    })
    .then(function () {
        return Promise.all([Item.findOne({}),Cart.findOne({})])    
    })
    .then(function () {
        return Promise.all([Item.findOne({}),Order.findOne({})])    
    })
    .then(function (promises) {
        //item inside Order
        promises[1].orderItems.push(promises[0]);
        return promises[1].save()
    })
    .then(function () {
        return Promise.all([User.findOne({}),Cart.findOne({})])    
    })
    .then(function (promises) {
        //cart inside User
        promises[0].shoppingCart = promises[1];
        return promises[0].save()
    })
    .then(function () {
        return Promise.all([User.findOne({}).populate({path:"shoppingCart", populate:{path:"shoppingCartItems"}}).populate({path:"userOrders", populate:{path:"orderItems", populate:{path:"orderItemProduct"}}}),
        Order.findOne({}).populate({path:"orderItems", populate:{path:"orderItemProduct"}})])    
    })
    .then(function (promises) {
        promises[0].userOrders.push(promises[1]);
        return promises[0].save();
    })
    .then(function (user) {
        console.log(user);
        console.log('Password match', bcrypt.compareSync('password', user.password))
        console.log('Password does not match', bcrypt.compareSync('sample', user.password))
        console.log("--Cart--",user.shoppingCart)
        console.log("--Orders--",user.userOrders)
        mongoose.disconnect();
    })
    .catch(function (err) {
        console.error('Error', err.message);
    });