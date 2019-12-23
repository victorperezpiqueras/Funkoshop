Spinner = {};
Spinner.mostrarCargando = function () {
    var cadena = '<div id="loading" class="spinner-border text-secondary loading text-center" role="status">';
    cadena = cadena + '<span class="sr-only">Loading...</span></div>';
    $('#contents').append(cadena);
    console.log("aaaa")
};

Spinner.quitarCargando = function () {
    $('#loading').remove();
};