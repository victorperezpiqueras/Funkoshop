Controller.controllers.signout = {};
Controller.controllers.signout.goToIndexSignOut_clicked = function (event) {
    event.preventDefault();
    console.log(Model.user);

    Model.signOut()
        .then(() => {
            if (event.target.className.match(/disabled/)) return;
            window.sessionStorage.removeItem('user');
            alert('You have been logged out.'); //Feedback for the user
            Controller.router.go(event.target.href);
        })

}