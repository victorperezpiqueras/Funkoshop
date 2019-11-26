var express = require('express');
var router = express.Router();

var model = require('../model/model');

/* PRODUCTS */
router.get('/products', function (req, res, next) {
    model.getProducts()
        .then(function (products) {
            res.json(products);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.get('/products/:id', function (req, res, next) {
    model.getProduct(req.params.id)
        .then(function (product) {
            res.json(product);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

/* CART */
router.get('/users/:uid/cart', function (req, res, next) {
    model.getShoppingCart(req.params.uid)
        .then(function (cart) {
            res.json(cart);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.get('/users/:uid/cart/items', function (req, res, next) {
    model.getShoppingCartItems(req.params.uid)
        .then(function (cart) {
            res.json(cart);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.post('/users/:uid/cart/items/:pid', function (req, res, next) {
    model.buy(req.params.uid, req.params.pid)
        .then(function (cart) {
            res.json(cart);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.delete('/users/:uid/cart/items/:pid', function (req, res, next) {
    model.removeAllCartItem(req.params.uid, req.params.pid)
        .then(function (cart) {
            res.json(cart);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.delete('/users/:uid/cart/items/:pid/decrease', function (req, res, next) {
    model.removeOneCartItem(req.params.uid, req.params.pid)
        .then(function (cart) {
            console.log("api",cart)
            res.json(cart);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

/* USERS */
router.post('/users/signin', function (req, res, next) {
    var emailf = req.body.email;
    var passwordf = req.body.password;
    model.signin(emailf, passwordf)
        .then(function (userf) {
            res.json(userf);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.post('/users/signup', function (req, res, next) {
    var newUser = req.body;
    model.signup(newUser)
        .then(function (user) {
            res.json(user);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.get('/users/:uid/profile', function (req, res, next) {
    model.getUser(req.params.uid)
        .then(function (user) {
            res.json(user);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

/* ORDERS */
router.get('/users/:uid/orders', function (req, res, next) {
    model.getUserOrders(req.params.uid)
        .then(function (uid) {
            res.json(uid);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.post('/users/:uid/orders', function (req, res, next) {
    var order = req.body;
    console.log(order);
    model.postUserOrder(req.params.uid, order)
        .then(function (uid) {
            res.json(uid);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.get('/users/:uid/orders/:number', function (req, res, next) {
    model.getUserOrderByNumber(req.params.uid, req.params.number)
        .then(function (order) {
            res.json(order);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.get('/users/:uid/orders/:number/items', function (req, res, next) {
    model.getUserOrderItems(req.params.uid, req.params.number)
        .then(function (order) {
            res.json(order);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.get('/users/:uid/cart/counter', function (req, res, next) {
    model.getShoppingCartCounter(req.params.uid)
        .then(function (counter) {
            res.json(counter);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});


module.exports = router;
