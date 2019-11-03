var View = {};

View.renderer = {};

View.loadTemplate = function (filename) {
  return $.ajax({
    url: '/funkoshop/views/templates/' + filename + '.hbs'
  });
}

View.renderTemplate = function (id, container, context) {
  return View.loadTemplate(id)
    .then(function (source) {
      var template = Handlebars.compile(source);
      var html = template(context);
      return $('#' + container).html(html)
    })
}

View.loadPartial = function (filename) {
  return $.ajax({
    url: '/funkoshop/views/partials/' + filename + '.hbs'
  })
    .then(function (contents) {
      return Handlebars.registerPartial(filename, contents);
    });
}

$(function () {
  window.addEventListener('popstate', (event) => Controller.router.route(), false);
  var promises = [
    View.loadPartial('nav-partial'),
    View.loadPartial('header-partial'),
    View.loadPartial('footer-partial'),

    View.loadPartial('product-partial'),
    View.loadPartial('order-partial'),
  ]
  Promise.all(promises)
    .then(function () {
      return $(function () {
        Controller.router.route();
      })
    });
})

