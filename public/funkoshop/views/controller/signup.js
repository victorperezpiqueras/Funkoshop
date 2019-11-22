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
        // _id: Date.now(), //Already in data base
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

    Model.signup(newUser)
        .then(() => {
            console.log('Signup successful');
            Controller.router.go('/funkoshop/views/signin'); //He pensado que cuando se crea la cuenta le vaya a iniciar sesión --> Reducir el numero de clicks del usuario
        })
        .catch((error) => {

            console.log(error);
            alert(error);       
            
            Controller.router.go('/funkoshop/views/signup'); /* Como esta creado con un a se puede con href */
        })
    //Controller.controllers.signup.refresh();
}
