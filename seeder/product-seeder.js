var mongoose = require('mongoose');

var Product = require('../model/product');

//protocol://address/db_name
var uri = 'mongodb+srv://victorperezpiqueras:quieroquefuncione@clustergame-safci.mongodb.net/funkoshop?retryWrites=true&w=majority';
//standard promise library
mongoose.Promise = global.Promise;

var products = [
    {
        name: "Goku",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/goku.jpg"
    },
    {
        name: "Naruto",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/naruto.jpg"
    },
    {
        name: "Krillin",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/krillin.jpg"
    },
    {
        name: "Batman",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/batman.jpg"
    },
    {
        name: "Charmander",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/charmander.jpg"
    },
    {
        name: "Harry Potter",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/harrypotter.jpg"
    },
    {
        name: "Captain America",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/capitanamerica.jpg"
    },
    {
        name: "Timón",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/timon.jpg"
    },
    {
        name: "Groot",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/groot.jpg"
    },
    {
        name: "Toothless",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/toothless.jpg"
    },
    {
        name: "Logan",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/logan.jpg"
    },
    {
        name: "Ironspider",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/ironspider.jpg"
    }
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
    .then(function () {
        //delete all products
        return Product.deleteMany();
    })
    .then(function () {
        var promises = [];
        //create all products
        for (var product of products) {
            promises.push(new Product(product).save());
        }
        return Promise.all(promises);
    })
    .then(function () {
        //get the products
        return Product.find();
    })
    .then(function (products) {
        //print the products
        console.log(products);
    })
    .then(function () {
        mongoose.disconnect();
    })
    .catch(function (err) {
        console.error('Error', err.message);
    });