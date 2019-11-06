Controller.controllers.signout = {};


Controller.controllers.signout.goToIndexSignOut_clicked = function(event){
    event.preventDefault();
    console.log(Model.user);

    Model.signOut()
        .then(() => {
            if(event.target.className.match(/disabled/)) return;
            console.log('Current user signin ID (logout): ' + Model.user);
            Controller.router.go(event.target.href);
        })

}