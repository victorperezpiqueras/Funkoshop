Controller.controllers.index = {};
Controller.controllers.index.refresh = function (matching) {
    var context = {};
    Model.getProducts()
        .then(function (products) {
            context.products = products;
            View.renderer.index.render(context);
        });
}
Controller.controllers.index.goToSignin_clicked = function (event) {
    event.preventDefault();
    //View.go(event.target.href);
    Controller.router.go(event.target.href);
}