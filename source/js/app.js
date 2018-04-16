document.addEventListener("DOMContentLoaded",function () {
    var model = new RPSSLGameModel();
    var view = new RPSSLGameView(model);
    var controller = new RPSSLGameController(view,model);
});
