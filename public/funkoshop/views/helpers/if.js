Handlebars.registerHelper('notNull', function(value, options) {
    if((value instanceof Window) == false) {
        return options.fn(this);
    }
    return options.inverse(this);
});