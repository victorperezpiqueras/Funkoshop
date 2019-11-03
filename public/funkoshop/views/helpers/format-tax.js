Handlebars.registerHelper('formatTax', function (tax) {
    formatedTax = parseFloat(Math.round(tax * 100) ).toFixed(2);
    formatedTax = formatedTax.concat(' %');
    return formatedTax;
});