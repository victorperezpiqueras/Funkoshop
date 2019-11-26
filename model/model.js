var Model = {};
var ObjectId = require('mongodb').ObjectID;
//Mongo schema models:
var Cart = require('../model/cart');
var Item = require('../model/item');
var Order = require('../model/order');
var Product = require('../model/product');
var User = require('../model/user');


/* AUXILIAR METHODS */
Model.resetCart = function () {
    var cart = {
        subtotal: 0,
        tax: 0.2,
        total: 0,
        shoppingCartItems: []
    }
    return cart;
};
Model.recalculateCart = function (cart) {
    console.log("Carro: ", cart)

    return new Promise(function (resolve, reject) {

        var subtotal = 0;
        cart.shoppingCartItems.forEach(item => {
            console.log("item", item.total)
            subtotal += (item.total);
        });

        cart.subtotal = subtotal;
        cart.total = subtotal + (subtotal * cart.tax);
        ////
        resolve(cart);
    });

};

/* PRODUCT METHODS */
Model.getProducts = function () {
    return Product.find();
};
Model.getProduct = function (pid) {
    return Product.findById(pid);
};

/* USER METHODS */
Model.getUser = function (uid) {
    return User.findById(uid).populate([{ path: 'shoppingCart' }, { path: 'userOrders' }]);
};

Model.signin = function (emailf, passwordf) {
    return Model.findUser(emailf, passwordf)
        .then(function (userf) {
            return new Promise(function (resolve, reject) {
                resolve({ _id: userf._id });
            })
        })
};
Model.findUser = function (emailf, passwordf) {
    try {
        return User.findOne({ email: emailf })/* .populate([{ path: 'Cart' }, { path: 'Order' }]) */
            .then(function (user) {
                return new Promise(function (resolve, reject) {
                    if (user.password == passwordf) {
                        resolve(user);
                    }
                    else {
                        reject('Password not correct');
                    }
                })
            })
    } catch {
        reject('Email not found');
    }
};

Model.signup = function (newUser) {
    return new Promise(function (resolve, reject) {
        var ok = newUser.name.length && newUser.surname.length && newUser.address.length && newUser.birth != null &&
            newUser.email.length && newUser.password.length && newUser.confirmpassword.length;
        if (ok) {
            if (newUser.password == newUser.confirmpassword) {
                User.findOne({ email: newUser.email })
                    .then(function (user) {
                        console.log(user);
                        if (user) {
                            reject({ error: "Email already used" })
                        }
                        else {
                            // console.log(newUser);
                            var cart = {
                                subtotal: 0,
                                tax: 0.21,
                                total: 0,
                                shoppingCartItems: []
                            }
                            return new Cart(cart).save()
                                .then(function (cart) {
                                    newUser.shoppingCart = cart;
                                    new User(newUser).save();
                                    resolve(newUser);
                                })
                        }
                    })
                    .catch((error) => {
                        reject({ error: "Email already used" });
                    })
            } else {
                reject({ error: "Passwords do not match" });
            }
        }
        else {
            reject({ error: "Some field is empty" });
        }
    })
};

/* CART METHODS */
Model.getShoppingCart = function (userId) {
    /* return new Promise(function (resolve, reject) {
        Model.getUser(userId)
            .then((user) => {
                resolve(user.shoppingCart);
            });
    }); */
    return new Promise(function (resolve, reject) {
        return User.findById(userId).populate({ path: "shoppingCart", populate: { path: "shoppingCartItems", populate: { path: "orderItemProduct" } } })
            .then(function (user) {
                resolve(user.shoppingCart);
            })
    });
};
Model.getShoppingCartCounter = function (userId) {
    return new Promise(function (resolve, reject) {
        return User.findById(userId).populate({ path: "shoppingCart", populate: { path: "shoppingCartItems" } })
            .then(function (user) {
                var counter = 0;
                console.log(user.shoppingCart)
                for (var item of user.shoppingCart.shoppingCartItems) {
                    counter += item.qty;
                    console.log(item)
                }
                resolve(counter);
            })
    });
};
Model.getShoppingCartItems = function (userId) {
    /* return new Promise(function (resolve, reject) {
        Model.getUser(userId)
            .then((user) => {
                resolve(user.shoppingCart.shoppingCartItems);
            });
    }); */
    return new Promise(function (resolve, reject) {
        return User.findById(userId).populate({ path: "shoppingCart", populate: { path: "shoppingCartItems" } })
            .then(function (user) {
                resolve(user.shoppingCart.shoppingCartItems);
            })
    });
};
Model.buy = function (userId, pid) {
    return new Promise(function (resolve, reject) {
        //obtain the cart of the user
        Model.getShoppingCart(userId)
            .then((cart) => {
                console.log(cart)
                //search for an item that contains the product
                var newItem = cart.shoppingCartItems.find(function (item) {
                    return item.orderItemProduct._id == pid;
                });
                Model.getProduct(pid)
                    .then((product) => {
                        //if not found-->add a new item with a reference to the product
                        if (newItem == null) {
                            newItem = {
                                order: undefined,
                                qty: 1,
                                price: product.price,
                                total: (product.price * 1),
                                orderItemProduct: product//////////////////////////////////ERROR AQUI
                            };
                            //new Item(..,..,..,..).save()-->promise.all/o solo then->then->push
                            return new Item(newItem).save()
                                .then(function (item) {
                                    cart.shoppingCartItems.push(item);
                                    return cart.save().then(function (item) {
                                        return Model.getShoppingCart(userId);
                                    })
                                })

                        }
                        else {
                            newItem.qty++;
                            newItem.total = (newItem.price * newItem.qty);
                            return newItem.save()
                                .then(function (item) {

                                    return Model.getShoppingCart(userId);
                                })
                        }
                        //console.log(cart.shoppingCartItems)

                    })
                    .then((cart) => {
                        //recalculate shopping cart
                        console.log("carro anterior", cart)
                        Model.recalculateCart(cart)
                            .then(function (cart) {
                                cart.save().then(function () {
                                    resolve(cart);
                                })

                                //return cart.save();
                            });
                    });
            });

    });
};
Model.removeOneCartItem = function (userId, pid) {
    return Model.getShoppingCart(userId)
        .then((cart) => {
            var i = 0;
            while (i < cart.shoppingCartItems.length && cart.shoppingCartItems[i].orderItemProduct._id != pid) i++;
            var item = cart.shoppingCartItems[i];
            item.qty--;
            item.total -= item.price;
            if (item.qty == 0) {
                var index = cart.shoppingCartItems.indexOf(item);
                if (index > -1) {
                    cart.shoppingCartItems.splice(index, 1);
                }
                return Model.recalculateCart(cart)
                    .then(function (cart) { return cart.save() })
            } else {
                return item.save()
                    .then(function () {
                        return Model.getShoppingCart(userId)
                    })
                    .then(function (cart) {
                        console.log('C', cart)
                        return Model.recalculateCart(cart)
                    })
                    .then(function (cart) { return cart.save() })
            }



            /* cart.shoppingCartItems.forEach((item) => {

                if (item.orderItemProduct._id.toString() == pid) { //.toString()
                    item.qty--;
                    item.total -= item.price;
                    var p = Promise.resolve();
                    if (item.qty == 0) {
                        var index = cart.shoppingCartItems.indexOf(item);
                        if (index > -1) {
                            cart.shoppingCartItems.splice(index, 1);
                        }

                    } else p = item.save();

                    return p.then(function () {
                        return Model.recalculateCart(cart)
                            .then((cart) => {
                                //resolve(cart);
                                return cart.save();
                            });
                    })
                }
            }); */

        });
};
Model.removeAllCartItem = function (userId, pid) {
    return Model.getShoppingCart(userId)
        .then((cart) => {
            cart.shoppingCartItems.forEach((item) => {
                if (item.orderItemProduct._id.toString() == pid) { //.toString()
                    var index = cart.shoppingCartItems.indexOf(item);
                    if (index > -1) {
                        cart.shoppingCartItems.splice(index, 1);
                    }
                }
            });
            return Model.recalculateCart(cart)
                .then((cart) => {
                    //resolve(cart);
                    return cart.save();
                });
        });
};

/* ORDER METHODS */
Model.getUserOrders = function (uid) {
    /*  return User.findById(uid).populate({ path: "userOrders" })
         .then(function (user) {
             return user.userOrders.find().populate({ path: "orderItems" });
         }); */
    return new Promise(function (resolve, reject) {
        return User.findById(uid).populate({ path: "userOrders", populate: { path: "orderItems" } })
            .then(function (user) {
                resolve(user.userOrders);
            })
    });
};
Model.postUserOrder = function (uid, orderData) {
    return new Promise(function (resolve, reject) {


        Model.getShoppingCart(uid)
            .then((cart) => {
                //create order:
                var order = {
                    number: Date.now(),
                    date: new Date(orderData.date),
                    address: orderData.address,
                    cardHolder: orderData.cardHolder,
                    cardNumber: orderData.cardNumber,
                    subtotal: cart.subtotal,
                    tax: cart.tax,
                    total: cart.total,
                    user: uid,
                    orderItems: cart.shoppingCartItems
                }
                return new Order(order).save()
            })
            .then(function (order) {
                console.log(order);
                Model.getUser(uid)
                    .then((user) => {
                        //add order and reset cart in user:
                        return new Cart(Model.resetCart()).save()
                            .then(function (cart) {
                                user.shoppingCart = cart;
                                user.userOrders.push(order);
                                //resolve(order);
                                console.log(user)
                                //resolve(user.save());
                                user.save().then((user) => { resolve(user) });
                            })

                    });
            })


    });
};
Model.getUserOrderByNumber = function (uid, number) {
    return new Promise(function (resolve, reject) {
        return User.findById(uid).populate({ path: "userOrders", populate: { path: "orderItems" } })
            .then(function (user) {
                for (var order of user.userOrders) {
                    if (order.number == number) resolve(order)
                }
                reject()
            });
    });
};
Model.getUserOrderItems = function (uid, number) {
    return new Promise(function (resolve, reject) {
        return User.findById(uid).populate({ path: "userOrders", populate: { path: "orderItems" } })
            .then(function (user) {
                for (var order of user.userOrders) {
                    if (order.number == number) resolve(order.orderItems)
                }
                reject()
            });
    });
};

/* global Model */
module.exports = Model;