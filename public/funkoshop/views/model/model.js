var Model = {};

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
Model.getUser = function (uid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var user = Model.users.find(function (user) {
                return user._id == uid;
            });
            resolve(user);
        });
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

/* SIGNIN METHODS */
Model.signin = function (emailf, passwordf) {
    return Model.findUser(emailf, passwordf)
        .then(function (userf) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    Model.user = userf._id; /* Guardo el id loggeado */
                    localStorage.setItem("user", Model.user);
                    // console.log('id del userf ' + Model.user);
                    resolve(userf);
                }, 10);
            })
        })
};
Model.findUser = function (emailf, passwordf) {
    console.log("Dentro de findUser");
    return new Promise(function (resolve, reject) {
        console.log("Dentro de promise finduser");
        setTimeout(function () {
            var i = 0;
            var found = false;
            console.log(Model.users);
            while (i < Model.users.length && !found) { /* Para cuando se encuentra */
                found = Model.users[i].email == emailf && Model.users[i].password == passwordf; /* Cuando es cumple pone a true la booleana */
                i++;
            }
            if (found) {
                // console.log('User position: ' + (i-1));
                console.log('User exists!!');
                resolve(Model.users[(i - 1)]); /* CUIDADO! Es i-1 porque el while siempre incrementa, entonces al que se encuentra hará i++ antes de salir */
            }
            else
                reject('User not found');
        }, 10);
    })
}


/* CART METHODS */
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

<<<<<<< HEAD
/* PRACTICE 3 ORDER*/ 

Model.getUserOrders = function(uid){
    return new Promise(function (resolve, reject) {
        $.ajax({
            url:'/api/users/'+uid+'/orders',
            method:'GET'
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(err){
            reject(err);
        })
    });
}

Model.postUserOrders = function (uid, order){
    return new Promise(function (resolve, reject) {
        $.ajax({
            url:'/api/users/'+uid+'/orders',
            method:'POST',
            data: order
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(err){
            reject(err);
        })
    });
}

Model.getUserOrdersByNumber = function(uid, number){
    return new Promise(function (resolve, reject) {
        $.ajax({
            url:'/api/users/' + uid + '/orders/' + number,
            method:'GET'
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(err){
            reject(err);
        })
    });
}

Model.getUserOrderItems = function(uid, number){
    return new Promise(function (resolve, reject) {
        $.ajax({
            url:'/api/users/' + uid + '/orders/' + number + '/items',
            method:'GET'
        })
        .done(function(data){
            resolve(data);
        })
        .fail(function(err){
            reject(err);
        })
    });
}

=======
//SIGNUP METHODS
Model.signup = function (userInfo) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var newuser = {
                _id: Date.now(),
                name: userInfo.name,
                surname: userInfo.surname,
                email: userInfo.email,
                birth: userInfo.birth,
                address: userInfo.address,
                password: userInfo.password,
                shoppingCart: userInfo.shoppingCart
            }

            //add user to list
            Model.users.push(newuser);
            resolve();

        })
    })
}

Model.checkEmail = function (emailf) {
    console.log("Dentro de findEmail");
    return new Promise(function (resolve, reject) {
        console.log("Dentro de promise findEmail");
        setTimeout(function () {
            var i = 0;
            var found = false;
            console.log(Model.users);
            while (i < Model.users.length && !found) { /* Para cuando se encuentra */
                if (emailf == Model.users[i].email) {
                    found = true;
                }
                i++;
            }
            if (!found) {
                // console.log('User position: ' + (i-1));
                console.log('Email is not already used');
                resolve(); /* CUIDADO! Es i-1 porque el while siempre incrementa, entonces al que se encuentra hará i++ antes de salir */
            }
            else {
                alert("The email is already used");
                console.log('Email already used');
                reject();
            }

        }, 10);
    })
}
>>>>>>> b1e0e44e5ca62085fe18c8489561a4a78d57b0d9

/*
class User {
    constructor(_id, name, surname, email, birth, address, password) {
        this._id = _id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birth = birth;
        this.address = address;
        this.password = password;
        this.shoppingCart = new ShoppingCart();
        this.userOrders = [];
    }

}
class Order {
    constructor(number, date, address, subtotal, tax, total, cardHolder, cardNumber) {
        this.number = number;
        this.date = date;
        this.address = address;
        this.subtotal = subtotal;
        this.tax = tax;
        this.total = total;
        this.cardHolder = cardHolder;
        this.cardNumber = cardNumber;
        this.user = {};
        this.orderItems = [];
    }

}
class ShoppingCart {
    constructor(subtotal, tax, total) {
        this.subtotal = subtotal;
        this.tax = tax;
        this.total = total;
        this.shoppingCartItems = [];
    }

}
class Item {
    constructor(order, qty, price, total) {
        this.order = order;
        this.qty = qty;
        this.price = price;
        this.total = total;
        this.orderItemProduct = {};
    }

}
class Product {
    constructor(id, name, description, price, url) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.url = url;
    }

}
*/