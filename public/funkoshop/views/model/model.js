var Model = {};

// Model.user=null;

/* SIGNOUT METHOD */
Model.signOut = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.user = null
            //console.log(Model.user);
            localStorage.removeItem("user");
            resolve();
        })
    })
}

/* AUXILIAR METHODS */
//
Model.loadBadge = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var userId = localStorage.getItem("user");
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
//NEW API CALLS
Model.getProducts = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/products',
            method: 'GET',
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
};
Model.getProduct = function (pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/products/' + pid,
            method: 'GET',
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
}

Model.getUser = function (uid) { //FUNCIONA P3
    console.log("dentro del getUser client. Userid:", uid);
    return new Promise(function (resolve, reject) {
        uid = localStorage.getItem("user"); //Cogemos el id de localstorage
        $.ajax({
            url: '/api/users/' + uid + '/profile',
            method: 'GET'
        })
            .done(function (user) {
                resolve(user);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getShoppingCart = function (userId) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getUser(userId)
                .then((user) => {
                    resolve(user.shoppingCart);
                });
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

/* INDEX METHODS */
Model.buy = function (pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            //obtain the cart of the user
            var userId = localStorage.getItem("user");
            Model.getShoppingCart(userId)
                .then((cart) => {
                    console.log(cart)
                    //search for an item that contains the product
                    var newItem = cart.shoppingCartItems.find(function (item) {
                        return item.orderItemProduct.id == pid;
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
                            return cart;//
                        })
                        .then((cart/**/) => {
                            //recalculate shopping cart
                            Model.recalculateCart(cart)
                                .then(resolve(cart));
                        });
                });
        });
    });
}
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

/* SIGNIN METHOD - CLIENT */
Model.signin = function (emailf, passwordf) { //FUNCIONA
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/signin',
            method: 'POST',
            data: { email: emailf, password: passwordf }
        })
            .done(function (user) {
                localStorage.setItem("user", user._id); //Almacenamos el id en localstorage
                resolve();
            })
            .fail(function (err) {
                reject(err);
            });
    });
};



/* CART METHODS */
Model.removeOneCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var userId = localStorage.getItem("user");
            Model.getShoppingCart(userId)
                .then((cart) => {
                    cart.shoppingCartItems.forEach((item) => {
                        if (item.orderItemProduct.id == pid) {
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
    });
};
Model.removeAllCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var userId = localStorage.getItem("user");
            Model.getShoppingCart(userId)
                .then((cart) => {
                    cart.shoppingCartItems.forEach((item) => {
                        if (item.orderItemProduct.id == pid) {
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
    });
};

/* PURCHASE METHODS */
Model.checkout = function (date, address, cardHolder, cardNumber) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var userId = localStorage.getItem("user");
            Model.getShoppingCart(userId)
                .then((cart) => {
                    //create order:
                    var order = {
                        number: Date.now(),
                        date: date,
                        address: address,
                        cardHolder: cardHolder,
                        cardNumber: cardNumber,
                        subtotal: cart.subtotal,
                        tax: cart.tax,
                        total: cart.total,
                        user: userId,
                        orderItems: cart.shoppingCartItems
                    }
                    //add order to list
                    Model.orders.push(order);
                    Model.getUser(userId)
                        .then((user) => {
                            //add order and reset cart in user:
                            user.shoppingCart = Model.resetCart();
                            user.userOrders.push(order);
                            resolve(Model.orders);
                        })
                });
        });
    })
}

/* ORDER METHODS */
Model.getOrder = function (id) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var foundOrder;
            for (var order of Model.orders) {
                if (order.number == id) {
                    foundOrder = order;
                    break;
                }
            }
            resolve(foundOrder);
        });
    })
}

//SIGNUP METHODS
Model.signup = function (userInfo) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/signup',
            method: 'POST',
            data: userInfo
        })
            .done(function (user) {
                resolve(user);
            })
            .fail(function (error) {
                reject(error);
            });
    });

}

