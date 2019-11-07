Controller.controllers.index = {};
Controller.controllers.index.refresh = function () {
    var context = {};
    context.user=Model.user; //Load Model.user to disable or not the nav buttons
    Model.getProducts()
        .then((products) => {
            context.products = products;
        })
        .then(() => {//load badge and render
            Model.loadBadge()
                .then((counter) => {
                    context.counter = counter;
                })
                .then(() => {
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
