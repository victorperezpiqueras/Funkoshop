Controller.controllers.index = {};
Controller.controllers.index.refresh = function () {
    var context = {};
    Model.getProducts()
        .then((products) => {
            context.products = products;
        })
        .then(()=>{
            Model.getShoppingCart()
            .then((cart) => {
                context.cart = cart;
            })
        })
        .then(() => {
            return Model.cartItemCount()
                .then((itemCounter) => {
                    context.counter = itemCounter;
                    View.renderer.index.render(context);
                });
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
            Controller.controllers.index.refresh();
        })

}

Controller.controllers.index.goToIndex_clicked = function (event) {
    event.preventDefault();
    Controller.router.go(event.target.href);
}
