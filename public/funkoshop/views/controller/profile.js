Controller.controllers.profile = {};

/* Cargar el usuario en el sistema, Model.user */
Controller.controllers.profile.refresh = function () {

    var context = {};

    Model.getProfile()
        .then(function (user) {
            context.user = user;
            console.log(user);
            View.renderer.profile.render(context);
        })

}



// FALTA BOTON DETAILS CUANDO ESTE EL ORDER
Controller.controllers.profile.details_clicked = function (event) {
    event.preventDefault();

    Controller.router.go('/funkoshop/views/order');
}