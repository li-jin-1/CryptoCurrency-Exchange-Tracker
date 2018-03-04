const map_price = {
    usd: "$",
    eur: "€",
    aud: "AU$",
    cad: "Can$",
    chf: "CHF",
    cny: "¥",
    gbp: "£",
    btc: "₿"
};
var selected_pairs = {};
var open_connection = {};

function loadSelectedPairs(){
  Object.keys(selected_pairs).forEach(function(element) {
    switch (element) {
      case 'gdax':
        appendNewPairs(selected_pairs['gdax']);
        GdaxRealTimePrice(selected_pairs['gdax']);
        break;
      case 'coinbase':
        appendNewPairs(selected_pairs['coinbase']);
        break;
      default:
    }
  });
}

function setSelectedPairs(){
  chrome.storage.local.set({selected_pairs}, function(){
    loadSelectedPairs();
  });
}

function editSelectPairs(exchange_name, action, pair_name){
  if(!selected_pairs.hasOwnProperty(exchange_name)){
    selected_pairs[exchange_name] = []
  }
  var existing_pairs = selected_pairs[exchange_name];
  var index = existing_pairs.indexOf(pair_name);
  if(action == 'add'){
    if(index <= -1){
      existing_pairs.push(pair_name);
    }
  }
  else if(action == 'remove'){
    if(index > -1){
      existing_pairs.splice(index, 1);
    }
  }
  selected_pairs[exchange_name] = existing_pairs;
}

function getPriceSymbol(currency){
  return map_price[currency.toLowerCase()];
}

function appendNewPairs(pairs){
  var html = '';
  for (var i = 0; i < pairs.length; i++) {
    html += '<div class="coin" id="'+pairs[i]+'">';
    html += '<div class="first-col">';
    html += '<div class="coin-name">'
    html += pairs[i];
    html += '</div>';
    html += '<span class="change up">0%</span>';
    html += '</div>';
    html += '<div class="second-col"><span class="coin-price"></span></div>';
    html += '</div>';
  }
  $('#real_time_pairs').append(html);
}

function GdaxRealTimePrice(pairs){
  var msg = {
    "type": "subscribe",
    "channels": [{
      "name": "ticker",
      "product_ids": pairs
    }]
  };
  var gdax_api = new Gdax();
  gdax_api.socket.onopen = function (event) {
    console.log('here')
    gdax_api.socket.send(
      JSON.stringify(msg)
    );
  };
  gdax_api.socket.onmessage = function (event) {
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
  open_connection['gdax'] = gdax_api;
}

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;
    if (obj === 'undefined') return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function closeConnection(api){
  if(typeof api === 'undefined'){
    Object.keys(open_connection).forEach(function(key) {
      open_connection[key].close();
    });
  }
  else{
    open_connection[api].close();
  }
}
