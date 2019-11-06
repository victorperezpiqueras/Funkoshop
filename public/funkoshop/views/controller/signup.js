Controller.controllers.signup = {};
Controller.controllers.signup.refresh = function (matching) {
    var context = {};
    Model.getShoppingCart()
        .then((cart) => {
            context.cart = cart;
        })
        .then(() => {
            Model.cartItemCount()
                .then((itemCounter) => {
                    console.log(itemCounter);
                    context.counter = itemCounter;
                    View.renderer.signup.render(context);
                });
        });
}