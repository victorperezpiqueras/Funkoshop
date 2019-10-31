Controller.controllers.signup = {};
Controller.controllers.signup.refresh = function (matching) {
    var context = {};
    View.renderer.signup.render(context);

}

Controller.controllers.signup.signup_clicked = function (event, bid) {
    event.preventDefault();
    var userInfo = {
        name: $('#name').val(),
        surname: $('#surname').val(),
        address: $('#address').val(),
        birth: $('#birth').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        confirmpassword: $('#confirmpassword').val()
    }

    //var ok = !userInfo.name.length && !userInfo.surname.length && !userInfo.address.length && !userInfo.birth.length && !userInfo.email.length && !userInfo.password.length && !userInfo.confirmpassword.length;
    var ok = !userInfo.name.length || !userInfo.surname.length || !userInfo.address.length || !userInfo.birth.length || !userInfo.email.length || !userInfo.password.length || !userInfo.confirmpassword.length;
    var equalpasswd = false;
    if (userInfo.password == userInfo.confirmpassword){
        equalpasswd = true;
        console.log('TRUE');
    }
    if (!ok && equalpasswd) {
        Model.signup(userInfo)
            .then(function () {
                console.log('Comment added successfully');
            })
            .catch(function (err) {
                console.error('Comment cannot be added', err);
            })
            .then(function () {
                Controller.router.go('/funkoshop/views/index');
            });
    } else {
        console.error('MAL');

        this.refresh;
    }

}
