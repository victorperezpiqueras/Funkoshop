
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
        _id: '1',
        name: 'user',
        surname: 'surname',
        email: 'email',
        birth: '10/10/1998',
        address: 'Calle falsa 123',
        password: 'password',
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



Model.getProducts = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Model.products)
        }, 100);
    });
};

Model.getUser = function (uid) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var user = Model.users.find(function (user) {
                return user._id == uid;
            });
            resolve(user);
        }, 100);
    });
}

Model.getShoppingCart = function () {
    return Model.getUser(Model.user)
        .then(function (user) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(user.shoppingCart);
                }, 100);
            });
        });
}
Model.getProduct = function (pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var product = Model.products.find(function (product) {
                return product.id == pid;
            });
            resolve(product);
        }, 100);
    });
}

Model.buy = function (pid) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            //obtain the cart of the user
            Model.getShoppingCart()
                .then(function (cart) {
                    //search for an item that contains the product
                    var newItem = cart.shoppingCartItems.find(function (item) {
                        return item.orderItemProduct.id == pid;
                    });

                    Model.getProduct(pid)
                        .then(function (product) {
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
                        });

                    //recalculate shopping cart
                    Model.recalculateCart();
                })
            resolve();
        }, 100);
    });
}
Model.recalculateCart = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {

///fake async?
            Model.getShoppingCart()
                .then(function (cart) {
                    var subtotal = 0;
                    cart.shoppingCartItems.forEach(item => {
                        subtotal += (item.total);
                    });
                    cart.subtotal = subtotal;
                    cart.total = subtotal + (subtotal * cart.tax);
                });
////

        }, 100);
    });
};

Model.cartItemCount = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            Model.getShoppingCart()
                .then(function (cart) {
                    var itemCount = 0;
                    cart.shoppingCartItems.forEach(item => {
                        itemCount += item.qty;
                    });
                    resolve(itemCount);
                });
        }, 100);
    });

};


Model.signup = function (userInfo) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Model.products)
        }, 100);
    });
};

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


