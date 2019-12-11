var Model = {};

/* AUXILIAR METHODS */
Model.signOut = function () {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            sessionStorage.removeItem("user");
            resolve();
        })
    });
};
Model.loadBadge = function (userId) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (userId != null) {
                Model.getShoppingCartCounter(userId)
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
        uid = sessionStorage.getItem("user");
        $.ajax({
            url: '/api/users/' + uid + '/profile',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
        })
            .done(function (user) {
                resolve(user);
            })
            .fail(function (err) {
                reject(err);
            })
    });
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
                console.log('en model client signin');
               // sessionStorage.setItem("user", user._id); //O poner en el controller?-->quitar //Almacenamos el id en sessionStorage
                resolve(user);
            })
            .fail(function (err) {
                reject(err);
            });
    });
};

/* CART */
Model.removeAllCartItem = function (pid) {
    return new Promise(function (resolve, reject) {
        var userId = sessionStorage.getItem("user");
        $.ajax({
            url: '/api/users/' + userId + '/cart/items/' + pid,
            method: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
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
        var userId = sessionStorage.getItem("user");
        $.ajax({
            url: '/api/users/' + userId + '/cart/items/' + pid + '/decrease',
            method: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
};

/* CART */
Model.getShoppingCart = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
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
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
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
            method: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
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
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
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
            data: orderData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getUserOrderByNumber = function (uid, number) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/orders/' + number,
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
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
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}
Model.getShoppingCartCounter = function (uid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/users/' + uid + '/cart/counter',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
        })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}


/* FOT THE TOKEN */
Model.checkToken = function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: '/api/checkToken',
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + window.sessionStorage.getItem('user'));
            }
        })
            .done(function (token) {
                window.sessionStorage.setItem('user',token.token); 
                resolve(token);
            })
            .fail(function (err) { 
                window.sessionStorage.removeItem('user');
                console.log(err); 
                console.log('Expired token!'); 
                reject();
            });
    });
}