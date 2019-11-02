var Controller = {};
Controller.controllers = {};

Controller.router = {};
Controller.router.route = function () {
  var path = location.pathname;
  var matching = null;
  console.log('Routing ', path);
  if (matching = path.match(/^\/funkoshop\/views\/index$/)) {
    Controller.controllers.index.refresh();
  } else if (matching = path.match(/^\/funkoshop\/views\/signin$/)) {
    Controller.controllers.signin.refresh();
  } else if (matching = path.match(/^\/funkoshop\/views\/signup$/)) {
    Controller.controllers.signup.refresh();
  } else if (matching = path.match(/^\/funkoshop\/views\/cart$/)) {
    //Controller.controllers.cart.refresh();
    Controller.controllers.index.refresh();
  }
  else {
    console.error('Page not found!');
  }
}

Controller.router.go = function (url) {
  history.pushState(null, '', url);
  Controller.router.route();
}

Controller.messages = {};
Controller.messages.errors = []
Controller.messages.pushError = function (error) {
  Controller.messages.errors.push(error);
}
Controller.messages.infos = []
Controller.messages.pushInfo = function (info) {
  Controller.messages.infos.push(info);
}

Controller.messages.popMessages = function () {
  var result = {
    errors: Controller.messages.errors.slice(),
    infos: Controller.messages.infos.slice()
  }
  Controller.messages.infos = [];
  Controller.messages.errors = [];
  return result;
}