Controller.controllers.index = {};
Controller.controllers.index.refresh = function (matching) {
    var context = {};
    Model.getProducts()
        .then(function (products) {
            context.products = products;
            View.renderer.index.render(context);
        });
    //update counter of products:
    Model.cartItemCount()
        .then(function (itemCounter) {
            $('#item-counter').text(itemCounter);
            console.log(itemCounter);
        });
}
Controller.controllers.index.buyProduct_clicked = function (event, pid) {
    event.preventDefault();
    //add product:
    Model.buy(pid)
        .then(function () {
            console.log('Product added successfully');
        })
        .catch(function (err) {
            console.error('Product cannot be added', err);
        })
        .then(function () {
            //update counter of products:
            Model.cartItemCount()
                .then(function (itemCounter) {
                    $('#item-counter').text(itemCounter);
                });
        });

    //go to cart:
    Controller.router.go(event.target.href);
}
Controller.controllers.index.addProduct_clicked = function (event, pid) {
    event.preventDefault();
    //add product:
    Model.buy(pid)
        .then(function () {
            console.log('Product added successfully');
        })
        .catch(function (err) {
            console.error('Product cannot be added', err);
        })
        .then(function () {
            //update counter of products:
            Model.cartItemCount()
                .then(function (itemCounter) {
                    $('#item-counter').text(itemCounter);
                });
        });
}

Controller.controllers.index.goToSignin_clicked = function (event) {
    event.preventDefault();
    //View.go(event.target.href);
    Controller.router.go(event.target.href);
}