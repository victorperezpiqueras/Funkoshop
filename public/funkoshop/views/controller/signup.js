Controller.controllers.signup = {};
Controller.controllers.signup.refresh = function (matching) {
    var context = {};
    Model.cartItemCount()
        .then((itemCounter) => {
            console.log(itemCounter);
            context.counter = itemCounter;
            View.renderer.signup.render(context);
        });
}