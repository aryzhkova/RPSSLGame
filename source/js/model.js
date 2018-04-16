function RPSSLGameModel() {
    this._serverMessage = "";
    this._statusUser = "";
    this._statusGame = "";
    this._formMessage = "";
    this._statusRound = "";
    this._sections = [
    {
      id : 'sectionWelcome',
      visible : 'true'
    },
    {
        id : 'sectionGame',
        visible : 'false'
    }
    ];

    this.onSectionChange = new Event(this);
    this.onStatusUserChange = new Event(this);
    this.onServerMessage = new Event(this);
    this.onStatusGameChange = new Event(this);
    this.onFormMessageChange = new Event(this);
    this.onStatusRoundChange = new Event (this);
}
RPSSLGameModel.prototype.setStatusUser = function(text){
    this._statusUser = text;
};
RPSSLGameModel.prototype.getStatusUser = function(){
  return this._statusUser;
};
RPSSLGameModel.prototype.setSectionVisibility = function(sectionID,visible){
    this._sections.forEach(function(item){
        if(item.id == sectionID){
            item.visible = visible;
        }
    });
};

RPSSLGameModel.prototype.getSections = function (){
    return this._sections;
};

RPSSLGameModel.prototype.setServerMessage = function(text){
    this._serverMessage = text;
};
RPSSLGameModel.prototype.getServerMessage = function(){
    return this._serverMessage;
};
RPSSLGameModel.prototype.setStatusGame = function(text){
    this._statusGame = text;
};
RPSSLGameModel.prototype.getStatusGame = function(){
    return this._statusGame;
};
RPSSLGameModel.prototype.setFormMessage = function(text){
    this._formMessage = text;
};
RPSSLGameModel.prototype.getFormMessage = function(){
    return this._formMessage;
};
RPSSLGameModel.prototype.setStatusRound = function(text){
    this._statusRound = text;
};
RPSSLGameModel.prototype.getStatusRound = function(){
    return this._statusRound;
};