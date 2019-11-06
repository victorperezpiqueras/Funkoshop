Controller.controllers.signup = {};
Controller.controllers.signup.refresh = function () {
    var context = {};
    //load badge and render
    Model.loadBadge()
        .then((counter) => {
            context.counter = counter;
        })
        .then(() => {
            View.renderer.signup.render(context);
        });
}