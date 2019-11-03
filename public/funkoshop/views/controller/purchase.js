Controller.controllers.purchase = {};
Controller.controllers.purchase.refresh = function (matching) {
    var context = {};
    Model.getShoppingCart()
        .then((cart) => {
            context.cart = cart;
            View.renderer.purchase.render(context);
        });
    //update counter of products:
   /*  Model.cartItemCount()
        .then((itemCounter) => {
            $('#item-counter').text(itemCounter);
        }); */
}
Controller.controllers.purchase.checkout_clicked = function (event) {
    event.preventDefault();
    var date = $('#purchase-date').val();
    var address = $('#purchase-address').val();
    var cardHolder = $('#card-holder-name').val();
    var cardNumber = $('#card-number').val();
    console.log(date);
    console.log(address);
    
    /* Model.checkout(date, address, cardHolder, cardNumber)
        .then(() => {
            event.preventDefault();
            Controller.router.go(event.target.href);
        }); */
}

