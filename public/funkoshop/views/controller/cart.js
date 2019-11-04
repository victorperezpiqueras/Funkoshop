Controller.controllers.cart = {};
Controller.controllers.cart.refresh = function () {
    var context = {};
    Model.getShoppingCart()
        .then((cart) => {
            context.cart = cart;
            //console.log(cart)
            View.renderer.cart.render(context);
        })
        .then(() => {
            return Model.cartItemCount()
                .then((itemCounter) => {
                    context.counter = itemCounter;
                    View.renderer.cart.render(context);
                });
        });

}
Controller.controllers.cart.removeOneCartItem_clicked = function (event, pid) {
    //event.preventDefault();
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
    //event.preventDefault();
    //add product:
    Model.removeAllCartItem(pid)
        .then(() => {
            console.log('Item removed successfully');
            //console.log(Model.users[0].shoppingCart);
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
