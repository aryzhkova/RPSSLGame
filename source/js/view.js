function RPSSLGameView (model){
   this._RPSSLGameModel = model;
   this._messageList =  document.getElementById('messageList');
   this._statusUser = document.querySelector('.status__user');
   this._statusGame = document.querySelector('.status__game');
   this._formMessage = document.querySelector('.form__message');
   this._statusRound = document.querySelector('.status__round');

   this._RPSSLGameModel.onStatusUserChange.attach(function(){
       this.setUserStatus();
   }.bind(this));

   this._RPSSLGameModel.onServerMessage.attach(function(){
       this.addMessage();
   }.bind(this));

   this._RPSSLGameModel.onSectionChange.attach(function(){
        var sections = this._RPSSLGameModel.getSections();
        sections.forEach(function (item) {
            if(item.visible){
                this.show(item.id);
            }else{
                this.hide(item.id);
            }
        }.bind(this));
   }.bind(this));

   this._RPSSLGameModel.onStatusGameChange.attach(function(){
        this.setStatusGame();
   }.bind(this));

   this._RPSSLGameModel.onFormMessageChange.attach(function(){
       this.setFormMessage();
   }.bind(this));

   this._RPSSLGameModel.onStatusRoundChange.attach(function () {
       this.setStatusRound();
   }.bind(this));

}

RPSSLGameView.prototype.show = function(elementID){
    var el = document.getElementById(elementID);
    el.classList.remove('hide');
};

RPSSLGameView.prototype.hide = function(elementID){
   var el = document.getElementById(elementID);
   el.classList.add('hide');
};

RPSSLGameView.prototype.setUserStatus = function () {
    var text = this._RPSSLGameModel.getStatusUser();
    this._statusUser.innerHTML = text;
};

RPSSLGameView.prototype.addMessage = function () {
    var text = this._RPSSLGameModel.getServerMessage();
    var el = document.createElement('li');
    el.className = "messages__item";
    el.innerHTML = text;
    this._messageList.appendChild(el);
};

RPSSLGameView.prototype.setStatusGame = function () {
    var text = this._RPSSLGameModel.getStatusGame();
    setTimeout(function () {
        this._statusGame.innerHTML = text;
        this._statusGame.style.animation = 'opacity 2s';
        setTimeout(function () {
            this._statusGame.innerHTML = "";
            this._statusGame.style.animation = 'none';
        }.bind(this),2000);
    }.bind(this),4000);

};
RPSSLGameView.prototype.setFormMessage = function () {
    var text = this._RPSSLGameModel.getFormMessage();
    this._formMessage.innerHTML = text;
};
RPSSLGameView.prototype.setStatusRound = function () {
    var text = this._RPSSLGameModel.getStatusRound();
    setTimeout(function(){
        this._statusRound.innerHTML = text;
        this._statusRound.style.animation = 'opacity 2s';
        setTimeout(function () {
            this._statusRound.style.animation = 'none';
            this._statusRound.innerHTML = "";
        }.bind(this),2000);
    }.bind(this),1000);

};
RPSSLGameView.prototype.clearChatWindow = function () {
  this._messageList.innerHTML ="";
};