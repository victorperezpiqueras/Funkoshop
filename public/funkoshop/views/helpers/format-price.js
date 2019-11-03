Handlebars.registerHelper('formatPrice', function (price) {
    formatedPrice = parseFloat(Math.round(price * 100) / 100).toFixed(2);
    formatedPrice = formatedPrice.concat(' €');
    return formatedPrice;
});