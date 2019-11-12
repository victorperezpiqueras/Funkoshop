Controller.controllers.order = {};
Controller.controllers.order.refresh = function (matching) {
    var context = {};
    context.user = localStorage.getItem("user"); //Load Model.user to disable or not the nav buttons
    var userId = context.user;
    Model.getOrder(matching[1])
        .then((order) => {
            context.order = order;
        })
        .then(() => {//load badge and render
            Model.loadBadge(userId)
                .then((counter) => {
                    context.counter = counter;
                })
                .then(() => {
                    View.renderer.order.render(context);
                });
        });
}

