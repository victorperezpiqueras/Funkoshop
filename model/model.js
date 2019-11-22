var Model = {};

//Mongo schema models:
var Cart = require('../model/cart');
var Item = require('../model/item');
var Order = require('../model/order');
var Product = require('../model/product');
var User = require('../model/user');


/* AUXILIAR METHODS */
Model.loadBadge = function (userId) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (userId != null) {
                Model.cartItemCount(userId)
                    .then((itemCounter) => {
                        resolve(itemCounter);
                    });
            }
            else {
                resolve(0);
            }
        });
    });
}
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
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var subtotal = 0;
            cart.shoppingCartItems.forEach(item => {
                subtotal += (item.total);
            });
            cart.subtotal = subtotal;
            cart.total = subtotal + (subtotal * cart.tax);
            ////
            resolve(cart);
        });
    });
};
Model.cartItemCount = function (userId) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getShoppingCart(userId)
                .then((cart) => {
                    var itemCount = 0;
                    cart.shoppingCartItems.forEach(item => {
                        itemCount += item.qty;
                    });
                    resolve(itemCount);
                });
        });
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
    return User.findById(uid).populate([{ path: 'Cart' }, { path: 'Order' }]); 
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
                            new User(newUser).save();
                            resolve(newUser);
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
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getUser(userId)
                .then((user) => {
                    resolve(user.shoppingCart);
                });
        });
    });
};
Model.getShoppingCartItems = function (userId) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            for (var user of Model.users) {
                if (user._id == userId) {
                    resolve(user.shoppingCart.shoppingCartItems);
                }
            }
        })
    })
};
Model.buy = function (userId, pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
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
                                    order: null,
                                    qty: 1,
                                    price: product.price,
                                    total: (product.price * 1),
                                    orderItemProduct: product
                                };
                                cart.shoppingCartItems.push(newItem);
                            }
                            else {
                                newItem.qty++;
                                newItem.total = (newItem.price * newItem.qty);
                            }
                            return cart;
                        })
                        .then((cart) => {
                            //recalculate shopping cart
                            Model.recalculateCart(cart)
                                .then(resolve(cart));
                        });
                });
        });
    });
};
Model.removeOneCartItem = function (userId, pid) {
    /* return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getShoppingCart(userId)
                .then((cart) => {
                    cart.shoppingCartItems.forEach((item) => {
                        if (item.orderItemProduct._id == pid) {
                            item.qty--;
                            item.total -= item.price;
                            if (item.qty == 0) {
                                var index = cart.shoppingCartItems.indexOf(item);
                                if (index > -1) {
                                    cart.shoppingCartItems.splice(index, 1);
                                }
                            }
                        }
                    });
                    Model.recalculateCart(cart)
                        .then((cart) => {
                            resolve(cart);
                        });
                });
        });
    }); */
    return Model.getShoppingCart(userId)
        .then((cart) => {
            cart.shoppingCartItems.forEach((item) => {
                if (item.orderItemProduct._id.toString() == pid) { //.toString()
                    item.qty--;
                    item.total -= item.price;
                    if (item.qty == 0) {
                        var index = cart.shoppingCartItems.indexOf(item);
                        if (index > -1) {
                            cart.shoppingCartItems.splice(index, 1);
                        }
                    }
                }
            });
            Model.recalculateCart(cart)
                .then((cart) => {
                    //resolve(cart);
                    return cart.save();
                });
        });
};
Model.removeAllCartItem = function (userId, pid) {
    /* return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getShoppingCart(userId)
                .then((cart) => {
                    cart.shoppingCartItems.forEach((item) => {
                        if (item.orderItemProduct._id == pid) {
                            var index = cart.shoppingCartItems.indexOf(item);
                            if (index > -1) {
                                cart.shoppingCartItems.splice(index, 1);
                            }
                        }
                    });
                    Model.recalculateCart(cart)
                        .then((cart) => {
                            resolve(cart);
                        });
                });
        });
    }); */
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
            Model.recalculateCart(cart)
                .then((cart) => {
                    //resolve(cart);
                    return cart.save();
                });
        });
};

/* ORDER METHODS */
Model.getUserOrders = function (uid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            for (var user of Model.users) {
                if (user._id == uid) {
                    //break
                    resolve(user.userOrders);
                }
            }
        });
    });
};
Model.postUserOrder = function (uid, orderData) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getShoppingCart(uid)
                .then((cart) => {
                    //create order:
                    var order = {
                        number: Date.now(),
                        date: orderData.date,
                        address: orderData.address,
                        cardHolder: orderData.cardHolder,
                        cardNumber: orderData.cardNumber,
                        subtotal: cart.subtotal,
                        tax: cart.tax,
                        total: cart.total,
                        user: uid,
                        orderItems: cart.shoppingCartItems
                    }
                    Model.getUser(uid)
                        .then((user) => {
                            //add order and reset cart in user:
                            user.shoppingCart = Model.resetCart();
                            user.userOrders.push(order);
                            resolve(order);
                        });
                });
        });
    });
};
Model.getUserOrdersByNumber = function (uid, number) {
    return new Promise(function (resolve, reject) {
        console.log(Model);
        console.log(uid, number);
        setTimeout(() => {
            for (var user of Model.users) {
                if (user._id == uid) {
                    for (var order of user.userOrders) {
                        if (order.number == number) {
                            console.log(order);
                            resolve(order);
                        }
                    }
                }
            }
        });
    });
};
Model.getUserOrderItems = function (uid, number) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            for (var user of Model.users) {
                if (user._id == uid) {
                    for (var order of user.userOrders) {
                        if (order.number == number) {
                            resolve(order.orderItems);
                        }
                    }
                }
            }
        });
    });
};

/* global Model */
module.exports = Model;