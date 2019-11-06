Controller.controllers.cart = {};
Controller.controllers.cart.refresh = function () {
    var context = {};
    var userId = localStorage.getItem("user");
    Model.getShoppingCart(userId)
        .then((cart) => {
            context.cart = cart;
        })
        .then(() => {//load badge and render
            Model.loadBadge()
                .then((counter) => {
                    context.counter = counter;
                })
                .then(() => {
                    View.renderer.cart.render(context);
                });
        });

}
Controller.controllers.cart.removeOneCartItem_clicked = function (event, pid) {
    event.preventDefault();
    //add product:
    Model.removeOneCartItem(pid)
        .then((cart) => {
            //console.log(cart);
            console.log('Item removed successfully');
        })
        .catch((err) => {
            console.error('Item cannot be removed', err);
        })
        .then(Controller.controllers.cart.refresh());
}
Controller.controllers.cart.removeAllCartItem_clicked = function (event, pid) {
    event.preventDefault();
    //add product:
    Model.removeAllCartItem(pid)
        .then(() => {
            console.log('Item removed successfully');
        })
        .catch((err) => {
            console.error('Item cannot be removed', err);
        })
        .then(Controller.controllers.cart.refresh());
}
Controller.controllers.cart.purchase_clicked = function (event) {
    event.preventDefault();
    if (event.target.className.match(/disabled/)) return;
    Controller.router.go(event.target.href);
}
