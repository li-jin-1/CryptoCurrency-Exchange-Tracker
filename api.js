//Gdax API
// Creates a new WebSocket connection
function Gdax(){
  this.socket = new WebSocket("wss://ws-feed.gdax.com");
};

// use of prototypes improves performance and memory use
Gdax.prototype.close = function(){
  this.socket.close();
}
/*
var connection = new WebSocket("wss://ws-feed.gdax.com");
var msg = {
    "type": "subscribe",
    "product_ids": [
        "ETH-USD",
        "ETH-EUR"
    ],
    "channels": [
        "ticker"
    ]
};
//send data only takes place once a connection is established
connection.onopen = function (event) {
  console.log('here')
  connection.send(
    JSON.stringify(msg)
  );
};
//To begin listening for incoming data
connection.onmessage = function (event) {
  console.log(event.data);
  var res = JSON.parse(event.data);
}
*/

//connection.close();
//Gdax API end
