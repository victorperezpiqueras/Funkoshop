Controller.controllers.signup = {};
Controller.controllers.signup.refresh = function () {
    var context = {};
    context.user = localStorage.getItem("user"); //Load Model.user to disable or not the nav buttons
    var userId = context.user;
    //load badge and render
    Model.loadBadge(userId)
        .then((counter) => {
            context.counter = counter;
        })
        .then(() => {
            View.renderer.signup.render(context);
        });

}

Controller.controllers.signup.signup_clicked = function (event) {
    event.preventDefault();
    
    var date = $('#birth').val();
    date = new Date(date);
    var newUser = {
        _id: Date.now(),
        name: $('#name').val(),
        surname: $('#surname').val(),
        address: $('#address').val(),
        birth: date,
        email: $('#email').val(),
        password: $('#password').val(),
        confirmpassword: $('#confirmpassword').val(),
        userOrders: [],
        shoppingCart: {
            subtotal: 0,
            tax: 0.21,
            total: 0,
            shoppingCartItems: []
        }
    }

    // var found = false;
    
    // Model.checkEmail = function (emailf) {
    //     return new Promise(function (resolve, reject) {
    //         setTimeout(function () {
    //             var i = 0;
    //             var found = false;
    //             while (i < Model.users.length && !found) { 
    //                 if (emailf == Model.users[i].email) {
    //                     found = true;
    //                 }
    //                 i++;
    //             }
    //             if (!found) {
    //                 console.log('Email is not already used');
    //                 resolve(); 
    //             }
    //             else {
    //                 console.log('Email already used');
    //                 alert('Email already used');
    //                 reject();
    //             }
    
    //         }, 10);
    //     })
    // }
    
    


    Model.signup(newUser)
        .then(() => {
            console.log('Signup successful');
            Controller.router.go('/funkoshop/views/index'); //He pensado que cuando se crea la cuenta le vaya a iniciar sesión --> Reducir el numero de clicks del usuario
        })
        .catch((error) => {
            console.log('User cannot signup');

            //Para mostrar los alerts
            var ok = newUser.name.length && newUser.surname.length && newUser.address.length && newUser.birth != null &&
            newUser.email.length && newUser.password.length && newUser.confirmpassword.length;
            
            if (newUser.password != newUser.confirmpassword) {
                alert("The passwords do not match");
            }
            
            if (!ok) {
                alert("Some input field is empty");
            }          
            
            Controller.router.go('/funkoshop/views/signup'); /* Como esta creado con un a se puede con href */
        })
    //Controller.controllers.signup.refresh();
}
