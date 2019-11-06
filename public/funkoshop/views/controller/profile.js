Controller.controllers.profile = {};
Controller.controllers.profile.refresh = function () {
    var context = {};
    var userId = localStorage.getItem("user");
    Model.getUser(userId)
        .then((user) => {
            context.user = user;
        })
        .then(() => {//load badge and render
            Model.loadBadge()
                .then((counter) => {
                    context.counter = counter;
                })
                .then(() => {
                    View.renderer.profile.render(context);
                });
        });

}
Controller.controllers.profile.details_clicked = function (event, number) {
    event.preventDefault();
    Controller.router.go(event.target.href);
}