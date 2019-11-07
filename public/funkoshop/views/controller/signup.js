Controller.controllers.signup = {};
Controller.controllers.signup.refresh = function () {
    var context = {};
    context.user=Model.user; //Load Model.user to disable or not the nav buttons
    //load badge and render
    Model.loadBadge()
        .then((counter) => {
            context.counter = counter;
        })
        .then(() => {
            View.renderer.signup.render(context);
        });
}