//Gdax API
// Creates a new WebSocket connection
function Gdax(){
  this.socket = new WebSocket("wss://ws-feed.gdax.com");
  this.sequence = 0; //Gdax each pair has their own sequence...
  this.close = function(){
    return this.socket.close();
  }
};

Gdax.prototype.open = function(pairs, callback){
  var msg = {
    "type": "subscribe",
    "channels": [{
      "name": "ticker",
      "product_ids": pairs
    }]
  };
  var _self = this;
  var web_socket = this.socket;
  web_socket.onopen = function (event) {
    web_socket.send(
      JSON.stringify(msg)
    );
  };
  web_socket.onmessage = function (event) {
    console.log(event.data);
    var res = JSON.parse(event.data);
    callback(res);
  }
  //set open_connection
  open_connection['gdax'] = this;
}
//Gdax API end
