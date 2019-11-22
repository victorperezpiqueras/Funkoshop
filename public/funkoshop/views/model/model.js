var Model = {};




/* AUXILIAR METHODS */
Model.signOut = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            localStorage.removeItem("user");
            resolve();
        })
    });
};
Model.loadBadge = function (userId) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            // userId = localStorage.getItem("user"); //Ya está cogido en el controller
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
};
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

/* PRODUCTS */
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

/* USER */
Model.getUser = function (uid) {
    return new Promise(function (resolve, reject) {
        uid = localStorage.getItem("user");
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
/* Model.signup = function (userInfo) {
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
} */
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
                console.log(error.responseJSON.error);
                reject(error.responseJSON.error);
            });
    });
}
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

/* CART */
Model.removeAllCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        var userId = localStorage.getItem("user");
        $.ajax({
            url: '/api/users/' + userId + '/cart/items/' + pid,
            method: 'DELETE',
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
};
Model.removeOneCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        var userId = localStorage.getItem("user");
        $.ajax({
            url: '/api/users/' + userId + '/cart/items/' + pid + '/decrease',
            method: 'DELETE',
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
};



/* PRACTICE 3 CART */
Model.getShoppingCart = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getShoppingCartItems = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart/items',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.buy = function (uid, pid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart/items/' + pid,
            method: 'POST'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}


/* ORDER */
Model.getUserOrders = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.postUserOrder = function (uid, orderData) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders',
            method: 'POST',
            data: orderData
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getUserOrdersByNumber = function (uid, number) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders/' + number,
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getUserOrderItems = function (uid, number) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders/' + number + '/items',
            method: 'GET'
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}