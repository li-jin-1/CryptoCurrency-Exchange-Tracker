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
  /*
  product_id=[
                "ETH-BTC",
                "ETH-USD"
            ]
  */
  var msg = {
    "type": "subscribe",
    "channels": [{
      "name": "ticker",
      "product_ids": pairs
    }]
  };
  var _self = this;
  _self.socket.onopen = function (event) {
    _self.socket.send(
      JSON.stringify(msg)
    );
  };
  _self.socket.onmessage = function (event) {
    console.log(event.data);
    var res = JSON.parse(event.data);
    callback(res);
  }
  //set open_connection
  open_connection['gdax'] = _self;
}
//Gdax API end

//Binance API
function Binance(){
  this.open = function(pairs, callback){
      var stream = pairs.join('@ticker/')+'@ticker'
      this.socket = new WebSocket("wss://stream.binance.com:9443/stream?streams=" + stream);
      var _self = this;
      _self.socket.onmessage = function (event) {
        console.log(event.data);
        var res = JSON.parse(event.data);
        callback(res);
      }
      open_connection['binance'] = _self;
  }
  this.close = function(){
    return this.socket.close();
  }
};
//Binance API end

//Huobi.pro api
function Huobi(){
  this.socket = new WebSocket("wss://api.huobi.pro/ws");
  this.open = function(pairs, callback){
    /*{
      "sub": "market.ethbtc.detail",
      "id": "1"
    };*/
    //market.$symbol.detail
    var msg = {
      "sub": "market."+pairs+'.detail',
      "id": "1"
    };
    var _self = this;
    _self.socket.onopen = function (event) {
      _self.socket.send(
        JSON.stringify(msg)
      );
    };
    _self.socket.onmessage = function (event) {
      //huobi returns blob
      var reader = new FileReader();
      reader.addEventListener("loadend", function() {
        // reader.result contains the contents of blob as a typed array
        var bin = reader.result;
        // Decompress binary content
        let uncompressed = pako.inflate(new Uint8Array(bin), { to: 'string' });
        // Convert utf8 -> utf16 (native JavaScript string format)
        let decoded = decodeURIComponent(escape(uncompressed));
        // Finally, create an object
        // Note! Can throw error on bad data
        let obj = JSON.parse(decoded);

        console.log(obj);
        callback(obj);
      });
      reader.readAsArrayBuffer(event.data);
    }
    //set open_connection
    open_connection['huobi'] = _self;
  }
  this.close = function(){
    return this.socket.close();
  }
}
//Huobi.pro api end
