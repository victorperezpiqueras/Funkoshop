Controller.controllers.signin = {};
Controller.controllers.signin.refresh = function () {
    var context = {};
    Model.cartItemCount()
        .then((itemCounter) => {
            console.log(itemCounter);
            context.counter = itemCounter;
            View.renderer.signin.render(context);
        });
}


Controller.controllers.signin.signin_clicked = function (event) {
    event.preventDefault();

    var email_put = $('#email').val();
    var password_put = $('#password').val();

    console.log(email_put);
    console.log(password_put);

    Model.signin(email_put, password_put)
        .then(() => {
            console.log('Signin succesfull');
            console.log('Current user signin ID: ' + Model.user);
            Controller.router.go('/funkoshop/views/index');
        })
        .catch((error) => {
            console.log('User not exists', error);
            alert(' User does not exists. \n Check your email or password'); //Feedback for the user
            Controller.router.go('/funkoshop/views/signin'); /* Como esta creado con un a se puede con href */
        })

}
