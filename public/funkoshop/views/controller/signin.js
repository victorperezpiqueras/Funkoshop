Controller.controllers.signin = {};
Controller.controllers.signin.refresh = function (matching) {
    View.renderer.signin.render({});
}
Controller.controllers.signin.goToIndex_clicked = function (event) {
    event.preventDefault();
    //View.go(event.target.href);
    Controller.router.go(event.target.href);
}