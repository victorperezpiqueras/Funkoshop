Controller.controllers.cart = {};
Controller.controllers.cart.refresh = function () {
    var context = {};
    context.user = sessionStorage.getItem("user"); //Load Model.user to disable or not the nav buttons
    var userId = context.user;
    Model.getShoppingCart(userId)
        .then((cart) => {
            console.log("controller", cart)
            context.cart = cart;
        })
        .then(() => {//load badge and render
            Model.loadBadge(userId)
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
        .then(function () {
            Controller.controllers.cart.refresh()
        });
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
        .then(function () {
            Controller.controllers.cart.refresh()
        });
}
Controller.controllers.cart.purchase_clicked = function (event) {
    event.preventDefault();
    if (event.target.className.match(/disabled/)) return;
    Controller.router.go(event.target.href);
}
