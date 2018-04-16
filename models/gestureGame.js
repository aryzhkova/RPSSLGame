function GestureGame(player1,player2){
    this._players = [player1,player2];
    this._turns = [null,null];
    this.notifyPlayers("Rock-Paper-Scissors-Spock-Lizard Game starts");
    this._players.forEach(function (player,index) {
        player.on('turn',function(turn){
            this.onTurn(index,turn);
        }.bind(this));
    },this);
    this._players.forEach(function (player) {
        player.on('disconnect',function(){
            this.notifyPlayers('restart','Sorry, your opponent is disconnected. Press F5 to restart the game.');
        }.bind(this));
    },this);

}
GestureGame.prototype.notifyPlayer = function(event,playerID,msg){
    var event = event ||'msg';
    this._players[playerID].emit(event,msg);
};

GestureGame.prototype.notifyPlayers = function(event,msg){
  var event = event ||'msg';
  this._players.forEach(function(player){
      player.emit(event,msg);
  });
};

GestureGame.prototype.onTurn = function(playerID,turn){
  this._turns[playerID] = turn;
  this.notifyPlayer('select',playerID,'You selected '+turn);
  this.checkGameOver();
};

GestureGame.prototype.checkGameOver = function (){
  const turns = this._turns;
  if(turns[0] && turns[1]){
      //this.notifyPlayers('Game over '+ turns.join(' : '));
      this.getGameResult();
      this._turns = [null,null];
      this.notifyPlayers('next round','Next round');
  }
};

GestureGame.prototype.getGameResult = function(){
    const p0 = this.decodeTurn(this._turns[0]);
    const p1 = this.decodeTurn(this._turns[1]);
    const distance = ((p1 - p0 + 5)%5);
    switch (distance){
        case 0:
            this.notifyPlayers('result round','Draw');
            break;
        case 1 :
            this.sendGameResult(this._players[0],this._players[1]);
            break;
        case 2 :
            this.sendGameResult(this._players[0],this._players[1]);
            break;
        case 3 :
            this.sendGameResult(this._players[1],this._players[0]);
            break;
        case  4 :
            this.sendGameResult(this._players[1],this._players[0]);
            break
    }
};
GestureGame.prototype.sendGameResult = function(winner,loser){
  winner.emit('result round', 'You won!');
  loser.emit('result round','You lost.');
};

GestureGame.prototype.decodeTurn = function (turn) {
    switch (turn){
        case 'rock':
            return 0;
        case 'scissors':
            return 1;
        case 'lizard':
            return 2;
        case 'paper':
            return 3;
        case 'spock':
            return 4;
        case -1:
            return -1;
        default:
            throw new Error('Could not decode '+turn);
    }
};


module.exports = GestureGame;