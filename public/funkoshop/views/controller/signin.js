Controller.controllers.signin = {};
Controller.controllers.signin.refresh = function (matching) {
    var context = {};
    View.renderer.signin.render(context);
}


Controller.controllers.signin.signin_clicked = function (event) {
    event.preventDefault();

    var email_put= $('#email').val();
    var password_put= $('#password').val();

    Model.signin(email_put, password_put)
        .then(function () {
            console.log('Signin succesfull');
            console.log('Current user signin ID: '+Model.user);
            Controller.router.go('/funkoshop/views/index');
        })
        .catch(function (error) {
            console.log('User not exists', error);
            alert(' User does not exists. \n Check your email or password'); //Feedback for the user
            Controller.router.go('/funkoshop/views/signin');
        })

}