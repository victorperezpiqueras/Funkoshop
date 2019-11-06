var Model = {};

Model.orders = [
    {
        number: 1,
        date: null,
        address: null,
        subtotal: null,
        tax: null,
        total: null,
        cardHolder: null,
        cardNumber: 124214124,
        user: null,
        orderItems: null
    }
];
Model.shoppingCarts = [];
Model.items = [];
Model.products = [
    {
        id: 1,
        name: "Goku",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/goku.jpg"
    },
    {
        id: 2,
        name: "Naruto",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/naruto.jpg"
    },
    {
        id: 3,
        name: "Krillin",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/krillin.jpg"
    },
    {
        id: 4,
        name: "Batman",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/batman.jpg"
    },
    {
        id: 5,
        name: "Charmander",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/charmander.jpg"
    },
    {
        id: 6,
        name: "Harry Potter",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/harrypotter.jpg"
    },
    {
        id: 7,
        name: "Captain America",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/capitanamerica.jpg"
    },
    {
        id: 8,
        name: "Timón",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/timon.jpg"
    },
    {
        id: 9,
        name: "Groot",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/groot.jpg"
    },
    {
        id: 10,
        name: "Toothless",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/toothless.jpg"
    },
    {
        id: 11,
        name: "Logan",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/logan.jpg"
    },
    {
        id: 12,
        name: "Ironspider",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "/images/ironspider.jpg"
    }
];


Model.users = [
    {
        _id: 1,
        name: 'user',
        surname: 'surname',
        email: 'email@email.com',
        birth: new Date('10/10/1998'),
        address: 'Calle falsa 123',
        password: 'password',
        shoppingCart: {
            subtotal: 0,
            tax: 0.21,
            total: 0,
            shoppingCartItems: [/* 
                {
                    order: null,
                    qty: 1,
                    price: 20,
                    total: 20,
                    orderItemProduct: Model.products[0]
                }
             */]
        },
        userOrders: [ /*
            {
            date: '2019/10/31',
            number: 11111111,
            total: 20
            } */
        ]
    },
    {
        _id: 2,
        name: 'user2',
        surname: 'surname2',
        email: 'email2@email.com',
        birth: new Date('10/10/1998'),
        address: 'Calle falsa 123',
        password: 'password2',
        shoppingCart: {
            subtotal: 0,
            tax: 0.2,
            total: 0,
            shoppingCartItems: [/* 
                {
                    order: null,
                    qty: 1,
                    price: 20,
                    total: 20,
                    orderItemProduct: Model.products[0]
                }
             */]
        },
        userOrders: []
    },
    {
        _id: '2',
        name: 'user',
        surname: 'surname',
        email: 'email2@email.com',
        birth: '10/10/1998',
        address: 'Calle falsa 123',
        password: 'password',
        shoppingCart: {
            subtotal: 0,
            tax: 0.21,
            total: 0,
            shoppingCartItems: [/* 
                {
                    order: null,
                    qty: 1,
                    price: 20,
                    total: 20,
                    orderItemProduct: Model.products[0]
                }
             */]
        },
        userOrders: []
    }
];


Model.user=null;


/* SIGNOUT METHOD */
Model.signOut = function() {
    return new Promise(function(resolve,reject) {
        setTimeout(() => {
            Model.user=null;
            console.log(Model.user);
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
Model.getProducts = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(Model.products)
        });
    });
};
Model.getUser = function (uid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var user = Model.users.find(function (user) {//get cookie user
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
                    //console.log(user)
                    resolve(user.shoppingCart);
                });
        });
    });
}
Model.getProduct = function (pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            var product = Model.products.find(function (product) {
                return product.id == pid;
            });
            if (product != null) {
                resolve(product);
            }
            else {
                reject("Product not found");
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
Model.removeOneCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getShoppingCart(localStorage.getItem("user"))
                .then((cart) => {
                    cart.shoppingCartItems.forEach((item) => {
                        if (item.orderItemProduct.id == pid) {
                            item.qty--;
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
            Model.getShoppingCart(localStorage.getItem("user"))
                .then((cart) => {
                    //cart.shoppingCartItems.filter((item) => item.orderItemProduct.id == pid);
                    cart.shoppingCartItems.forEach((item) => {
                        if (item.orderItemProduct.id == pid) {
                            var index = cart.shoppingCartItems.indexOf(item);
                            if (index > -1) {
                                cart.shoppingCartItems.splice(index, 1);
                            }
                        }
                    });
                    //resolve(cart);
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
            Model.getShoppingCart(localStorage.getItem("user"))
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
                        user: Model.user,
                        orderItems: cart.shoppingCartItems
                    }
                    //add order to list
                    Model.orders.push(order);
                    //cart = Model.resetCart();
                    Model.getUser(Model.user)
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

/* PROFILE METHODS */
/* Model.getProfile = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getUser(Model.user)
                .then((user) => {
                    //console.log(user);
                    resolve(user);
                });
        });
    });
} */
/* Model.getOrders = function (user) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            //Model.getUser(Model.user)
            //  .then((user) => {
            resolve(user.userOrders);
            // });
        });
    })
} */
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


