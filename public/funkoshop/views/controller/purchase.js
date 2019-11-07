Controller.controllers.purchase = {};
Controller.controllers.purchase.refresh = function () {
    var context = {};
    context.user=Model.user; //Load Model.user to disable or not the nav buttons
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
                    View.renderer.purchase.render(context);
                });
        });
}
Controller.controllers.purchase.checkout_clicked = function (event) {
    event.preventDefault();
    var date = $('#purchase-date').val();
    date = new Date(date);
    var address = $('#purchase-address').val();
    var cardHolder = $('#card-holder-name').val();
    var cardNumber = $('#card-number').val();

    Model.checkout(date, address, cardHolder, cardNumber)
        .then(() => {
            event.preventDefault();
            Controller.router.go(event.target.href);
        });
}

