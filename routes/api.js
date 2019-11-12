var express = require('express');
var router = express.Router();

var model = require('../model/model');

/* GET products */
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

/* GET shopping cart */
router.get('/users/:uid/cart', function (req, res, next) {
    //Model.getShoppingCart
});
router.get('/users/:uid/cart/items', function (req, res, next) {
    //Model.getShoppingCart.items
});
router.post('/users/:uid/cart/items/:pid', function (req, res, next) {
});
router.delete('/users/:uid/cart/items/:pid', function (req, res, next) {
});
router.delete('/users/:uid/cart/items/:pid/decrease', function (req, res, next) {
});

/* GET users */

router.post('/users/signin', function (req, res, next) { //FUNCIONA - P3
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
router.get('/users/:uid/profile', function (req, res, next) { //Hay que añadir el :uid -> Fallo pdf // FUNCIONA P3
    model.getUser(req.params.uid)
        .then(function (user) {
            // console.log(user);
            res.json(user);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});

/* GET orders */
router.get('/users/:uid/orders', function (req, res, next) {
});
router.post('/users/:uid/orders', function (req, res, next) {
});
router.get('/users/:uid/orders/:number', function (req, res, next) {
});
router.get('/users/:uid/orders/:number/items', function (req, res, next) {
});




/* 

router.post('/books/:id/:comments', function (req, res, next) {
    var comment = req.body;
    model.addCommentToBook(req.params.id, comment)
        .then(function (book) {
            res.json(book);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.delete('/books', function (req, res, next) {
    model.removeAll()
        .then(function (books) {
            res.json(books);
        })
        .catch(function (err) {
            res.status(500).json(err);
        })
});
router.delete('/books/:id', function (req, res, next) {
    model.removeBook(req.params.id)
        .then(function (result) { res.json(result); })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        })
});
router.put('/books', function (req, res, next) {
    model.updateAllBooks(req.body)
        .then(function (books) { res.json(books); })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        })
});
router.put('/books/:id', function (req, res, next) {
    model.updateBook(req.params.id, req.body)
        .then(function (result) { res.json(result); })
        .catch(function (err) {
            console.error(err);
            res.status(500).json(err);
        })
}); */

module.exports = router;
