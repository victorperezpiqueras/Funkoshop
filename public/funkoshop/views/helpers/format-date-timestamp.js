Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return (new Date(timestamp)).format("yyyy-MM-dd");
});

// Handlebars.registerHelper("formatDate", function (datetime, format) {
//     if (moment) {
//         format = DateFormats[format] || format;
//         return moment(datetime).format(format);
//     }
//     else {
//         return datetime;
//     }
// })