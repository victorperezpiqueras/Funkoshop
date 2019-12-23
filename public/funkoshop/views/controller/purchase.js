Controller.controllers.purchase = {};
Controller.controllers.purchase.refresh = function () {
    Spinner.mostrarCargando();
    Model.checkToken() /* To get a new token for the user */
        .then(() => {
            var context = {};
            context.user = sessionStorage.getItem("user"); //Load Model.user to disable or not the nav buttons
            var userId = context.user;
            Model.getShoppingCart(userId)
                .then((cart) => {
                    context.cart = cart;
                })
                .then(() => {//load badge and render
                    Model.loadBadge(userId)
                        .then((counter) => {
                            context.counter = counter;
                        })
                        .finally(() => {
                            Spinner.quitarCargando();
                            View.renderer.purchase.render(context);
                        });
                });
        })
        .catch(function(){
            Spinner.quitarCargando();
            Controller.router.go('/funkoshop/views/signin');
        })
}
Controller.controllers.purchase.checkout_clicked = function (event) {
    event.preventDefault();
    var date = $('#purchase-date').val();
    date = new Date(date);
    var address = $('#purchase-address').val();
    var cardHolder = $('#card-holder-name').val();
    var cardNumber = $('#card-number').val();

    var userId = sessionStorage.getItem("user");

    var orderData = {
        date: date,
        address: address,
        cardHolder: cardHolder,
        cardNumber: cardNumber
    };

    Model.postUserOrder(userId, orderData)
        .then(() => {
            event.preventDefault();
            Controller.router.go(event.target.href);
        });
}

