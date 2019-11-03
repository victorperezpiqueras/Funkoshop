var Model = {};

Model.orders = [];
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
        birth: '10/10/1998',
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
    }
];


Model.user = Model.users[0]._id;
// Model.user = 1;
// Model.user = {
        
// };

/* AUXILIAR METHODS */
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
            var user = Model.users.find(function (user) {
                return user._id == uid;
            });
            resolve(user);
        });
    });
}


Model.getShoppingCart = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getUser(Model.user)
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
            Model.getShoppingCart()
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
Model.cartItemCount = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getShoppingCart()
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
    console.log("Dentro de signin");
    return Model.findUser(emailf, passwordf)
        .then(function (userf) { //CUANDO RESUELVE FINDUSER NO ENTRA CON USER2 AQUI pero con USER1 SÍ
            console.log("dentro de userf"); //Esto no llega a print
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("Dentro de promise");
                   // userf._id = Model.user;
                    // Model.user.push(userf);
                    Model.user = userf._id;
                    // Model.user.push(userf);
                    console.log('id del userf '+Model.user);
                    resolve(userf);
                }, 10);
            })
        })
};
Model.findUser = function (emailf, passwordf) {
    console.log("Dentro de findUser");
    return new Promise(function(resolve,reject) {
        console.log("Dentro de promise finduser");
        setTimeout(function() {
            var i;
            for (i=0; i<Model.users.length; i++) {
                if (Model.users[i].email==emailf && Model.users[i].password==passwordf) {
                    console.log('User position: '+i);
                    console.log('User exists!!');
                    // Model.users[i] = Model.user;  ////////////QUITANDO ESTO VA IGUAL porque ya hago la asignacion arriba con userf
                    console.log(Model.users[i].email);
                    resolve(Model.users[i]); 
                }
                else   
                    reject ('User not found');
            }
        }, 10);
    })
    
}

/* PROFILE METHODS */
Model.getProfile = function() {
    return new Promise(function(resolve,reject) {
        setTimeout(() => {
            Model.getUser(Model.user)
                .then((user) => {
                    //console.log(user);
                    resolve(user);
                });
        });
    });
}



/* CART METHODS */
Model.removeOneCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            Model.getShoppingCart()
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
            Model.getShoppingCart()
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
            Model.getShoppingCart()
                .then((cart) => {
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
                    console.log(order);
                    Model.orders.push(order);
                    cart = Model.resetCart();
                    resolve(Model.orders);//?
                });
        });
    })
}


/*
Model.signup = function (userInfo) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Model.products)
        }, 100);
    });
}; */

/*
class User {
    constructor(name, surname, email, birth, address, password) {
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


