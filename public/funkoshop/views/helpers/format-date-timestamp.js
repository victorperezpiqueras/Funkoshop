Handlebars.registerHelper("formatDate", function (date) {
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    //return (new Date(date.toString())).format("dd-MM-yyyy");
    return day + "/" + month + "/" + year;
});

