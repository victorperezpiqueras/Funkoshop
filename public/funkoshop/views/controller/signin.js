Controller.controllers.signin = {};
Controller.controllers.signin.refresh = function () {
    Spinner.mostrarCargando();
    var context = {};
    context.user = sessionStorage.getItem("user"); //Load Model.user to disable or not the nav buttons
    var userId = context.user;
    //load badge and render
    Model.loadBadge(userId)
        .then((counter) => {
            context.counter = counter;
        })
        .finally(() => {
            Spinner.quitarCargando();
            View.renderer.signin.render(context);
        });

}


Controller.controllers.signin.signin_clicked = function (event) {
    event.preventDefault();

    var email_put = $('#email').val();
    var password_put = $('#password').val();

    //console.log(email_put);
    //console.log(password_put);

    Model.signin(email_put, password_put)
        .then(function(token) {
            window.sessionStorage.setItem("user", token.token);
            console.log('Signin successful');
            console.log('Current user signin ID: ' + Model.user);
            Controller.router.go(event.target.href);
        })
        .catch((error) => {
            console.log('User not exists', error);
            alert(' User does not exists. \n Check your email or password'); //Feedback for the user
            Controller.router.go('/funkoshop/views/signin'); /* Como esta creado con un a se puede con href */
        })

}
