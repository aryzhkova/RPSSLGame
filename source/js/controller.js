function RPSSLGameController (RPSSLView,RPSSLModel){
    this._RPSSLGameView = RPSSLView;
    this._RPSSLGameModel = RPSSLModel;
    this.init();
}
RPSSLGameController.prototype.init = function () {
    var port = 3000;
    var socket = io.connect('http://localhost:' + port);
    var gestureForm = document.getElementById('gestureForm');
    var isSend = false;
    var btnSay = document.getElementById('say');
    var inputMessage = document.getElementById('message');

    socket.on('msg',function(text){
        this._RPSSLGameModel.setServerMessage(text);
        this._RPSSLGameModel.onServerMessage.notify();
    }.bind(this));
    socket.on('waiting',function(text){
        this._RPSSLGameModel.setStatusUser(text);
        this._RPSSLGameModel.onStatusUserChange.notify();
    }.bind(this));
    socket.on('game is ready',function(text){
        this._RPSSLGameModel.setSectionVisibility('sectionWelcome',false);
        this._RPSSLGameModel.setSectionVisibility('sectionGame',true);
        this._RPSSLGameModel.onSectionChange.notify();
    }.bind(this));
    socket.on('restart',function (text) {
        this._RPSSLGameModel.setStatusGame(text);
        this._RPSSLGameModel.onStatusGameChange.notify();
    }.bind(this));
    socket.on('select',function(text){
        this._RPSSLGameModel.setFormMessage(text);
        this._RPSSLGameModel.onFormMessageChange.notify();
    }.bind(this));
    socket.on('result round',function(text){
        this._RPSSLGameModel.setStatusRound(text);
        this._RPSSLGameModel.onStatusRoundChange.notify();
        setTimeout(function () {
            this._RPSSLGameModel.setFormMessage("");
            this._RPSSLGameModel.onFormMessageChange.notify();
        }.bind(this),2000);
    }.bind(this));
    socket.on('next round',function(text){
        this._RPSSLGameModel.setStatusGame(text);
        this._RPSSLGameModel.onStatusGameChange.notify();
        isSend = false;
    }.bind(this));
    socket.on('reconnect',function(){
        this._RPSSLGameView.clearChatWindow();
    }.bind(this));

    gestureForm.addEventListener('submit',function (e) {
        e.preventDefault();
        if(!isSend) {
            var data = {
                gesture: gestureForm.gesture.value
            };
            if(data.gesture){
                gestureForm.reset();
                socket.emit('turn', data.gesture);
                isSend = true;
            }
        }else{
            this._RPSSLGameModel.setFormMessage("You have sent once.");
            this._RPSSLGameModel.onFormMessageChange.notify();
        }
    }.bind(this));

    btnSay.addEventListener('click',function (e) {
       e.preventDefault();
       this.sendMessage(socket);
    }.bind(this));

    inputMessage.addEventListener('keydown',function(e){
        if (e.keyCode === 13) {
            e.preventDefault();
            this.sendMessage(socket);
        }
    }.bind(this));

};


RPSSLGameController.prototype.sendMessage = function(socket){
    var input = document.getElementById('message');
    var value = input.value.trim();
    if(value){
        input.value = "";
        socket.emit('msg',value);
    }
};
