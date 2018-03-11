//Gdax API
// Creates a new WebSocket connection
function Gdax(){
  this.socket = new WebSocket("wss://ws-feed.gdax.com");
  this.close = function(){
    return this.socket.close();
  }
};

Gdax.prototype.open = function(pairs){
  var msg = {
    "type": "subscribe",
    "channels": [{
      "name": "ticker",
      "product_ids": pairs
    }]
  };
console.log(pairs)
  var web_socket = this.socket;
  web_socket.onopen = function (event) {
    web_socket.send(
      JSON.stringify(msg)
    );
  };
  web_socket.onmessage = function (event) {
    console.log(event.data);
    var res = JSON.parse(event.data);
    var sequence = 0;
    switch (res.type) {
      case 'ticker':
        if(res.sequence > sequence){
          var price = Number(res.price).toFixed(2);
          var open_24h = Number(res.open_24h).toFixed(2);
          var elm = $('#'+res.product_id);
          var growth_24hr = (Math.abs(price - open_24h)*100/open_24h).toFixed(2)
          var trend_24hr = (Number(price) >= Number(open_24h))? 'up' : 'down';
          var change_rate = elm.find('.change');
          change_rate.text(growth_24hr + '%');
          change_rate.removeClass('up down');
          change_rate.addClass(trend_24hr);
          var price_elm = elm.find('.coin-price');
          var price_sym = getPriceSymbol(res.product_id.slice(-3));
          price_elm.text(price_sym + price);
        }
        break;
      case 'error':
        break;
      default:

    }
  }
  //set open_connection
  open_connection['gdax'] = this;
}

// use of prototypes improves performance and memory use
//Gdax.prototype.close = function(){
  //this.socket.close();
//}
//Gdax API end
