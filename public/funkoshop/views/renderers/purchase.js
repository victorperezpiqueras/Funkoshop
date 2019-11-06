View.renderer.purchase = {};
View.renderer.purchase.render = function (c) {
    console.log("purchase render")

    View.renderTemplate('purchase-template', 'contents', c);
}