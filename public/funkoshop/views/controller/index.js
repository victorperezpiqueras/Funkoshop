Controller.controllers.index = {};
Controller.controllers.index.refresh = function () {
    var context = {};
    Model.getProducts()
        .then((products) => {
            context.products = products;
            View.renderer.index.render(context);
        });
    //update counter of products:
    Model.cartItemCount()
        .then((itemCounter) => {
            $('#item-counter').text(itemCounter);
            console.log(itemCounter);
        });
}
Controller.controllers.index.buyProduct_clicked = function (event, pid) {
    event.preventDefault();
    //add product:
    Model.buy(pid)
        .then(() => {
            console.log('Product added successfully');
        })
        .catch((err) => {
            console.error('Product cannot be added', err);
        })
        .then(() => {
            //update counter of products:
            Model.cartItemCount()
                .then((itemCounter) => {
                    $('#item-counter').text(itemCounter);
                });
        })
        .then(() => {
            //go to cart:
            Controller.router.go(event.target.href);
        });



}
Controller.controllers.index.addProduct_clicked = function (event, pid) {
    event.preventDefault();
    //add product:
    Model.buy(pid)
        .then(() => {
            console.log('Product added successfully');
        })
        .catch((err) => {
            console.error('Product cannot be added', err);
        })
        .then(() => {
            //update counter of products:
            Model.cartItemCount()
                .then((itemCounter) => {
                    $('#item-counter').text(itemCounter);
                });
        });
}

Controller.controllers.index.goToIndex_clicked = function (event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
}
