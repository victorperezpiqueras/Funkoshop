var Model = {};

Model.users = [
    {
        _id: '1',
        name: 'user',
        surname: 'surname',
        // credentials: {
        email: 'email@email.com',
        password: 'password',
        // },
        birth: '10/10/1998',
        address: 'Calle falsa 123',

        shoppingCart: {
            subtotal: '0',
            tax: '20',
            total: '0',
            shoppingCartItems: {}
        },
        userOrders: []
    }
];

Model.user = Model.users[0]._id;

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
        name: "Goku",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "url/url.com"
    },
    {
        id: 3,
        name: "Goku",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "url/url.com"
    },
    {
        id: 4,
        name: "Goku",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10.02,
        url: "url/url.com"
    },
    {
        id: 5,
        name: "Goku",
        description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        price: 10,
        url: "url/url.com"
    },
];

Model.getProducts = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Model.products)
        }, 100);
    });
};


Model.signin = function (emailf, passwordf) {
    return Model.findUser(emailf, passwordf)
        .then(function (userf) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    userf._id = Model.user;
                    resolve(userf);
                }, 10);
            })
        })
};

Model.findUser = function (emailf, passwordf) {
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            var i;
            for (i=0; i<Model.users.length; i++) {
                if (Model.users[i].email==emailf && Model.users[i].password==passwordf) {
                    console.log('User exists!!');
                    resolve(Model.users[i]);
                }
                else   
                    reject ('User not found');
            }
        }, 10);
    })
    
}




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
    constructor(name, description, price, url) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.url = url;
    }

}
*/


