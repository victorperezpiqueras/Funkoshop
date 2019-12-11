var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../config/passport');

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
router.get('/users/:uid/cart', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.getShoppingCart(req.user._id)
            .then(function (cart) {
                res.json(cart);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });
router.get('/users/:uid/cart/items', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.getShoppingCartItems(req.user._id)
            .then(function (cart) {
                res.json(cart);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });
router.get('/users/:uid/cart/counter', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.getShoppingCartCounter(req.user._id)
            .then(function (counter) {
                res.json(counter);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });
router.post('/users/:uid/cart/items/:pid', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.buy(req.user._id, req.params.pid)
            .then(function (cart) {
                res.json(cart);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });
router.delete('/users/:uid/cart/items/:pid', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.removeAllCartItem(req.user._id, req.params.pid)
            .then(function (cart) {
                res.json(cart);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });
router.delete('/users/:uid/cart/items/:pid/decrease', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.removeOneCartItem(req.user._id, req.params.pid)
            .then(function (cart) {
                res.json(cart);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });

/* USERS */
router.post('/users/signin', function (req, res, next) {
    return passport.authenticate('local', { session: false }, (err, user, info) => { /* Local refers to that in the database */
        if (err || !user) { return res.status(400).json(err); } /* If error or not user --> error */
        req.logIn(user, { session: false }, (err) => { /* If OK -> login user */
            if (err) { res.send(err); }
            var data = { id: user._id };
            const token = jwt.sign(data, passportConfig.secretKey, { expiresIn: 15 }); //seconds
            return res.json({ token }); /* Get the token */
        });
    })(req, res);

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
router.get('/users/:uid/profile', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.getUser(req.user._id)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });

/* ORDERS */
router.get('/users/:uid/orders', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.getUserOrders(req.user._id)
            .then(function (uid) {
                res.json(uid);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });
router.post('/users/:uid/orders', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        var order = req.body;
        model.postUserOrder(req.user._id, order)
            .then(function (uid) {
                res.json(uid);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });
router.get('/users/:uid/orders/:number', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.getUserOrderByNumber(req.user._id, req.params.number)
            .then(function (order) {
                res.json(order);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });
router.get('/users/:uid/orders/:number/items', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        model.getUserOrderItems(req.user._id, req.params.number)
            .then(function (order) {
                res.json(order);
            })
            .catch(function (err) {
                res.status(500).json(err);
            })
    });


/* To add an extra minute when this function is called */
router.get('/checkToken', passport.authenticate('jwt', { session: false }),
    function (req, res, next) {
        console.log('checktoken', req.user._id);
        var data = { id: req.user._id };
        const token = jwt.sign(data, passportConfig.secretKey, { /* Getting a new token */
            expiresIn: 15
        }); //seconds
        return res.json({ token });
    });


module.exports = router;
