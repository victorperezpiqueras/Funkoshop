Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return (new Date(timestamp)).format("yyyy-MM-dd");
});