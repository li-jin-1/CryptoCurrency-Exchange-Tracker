var selected_pairs = [];
$('#select_exchange').on('change', function(){
  selected_pairs = [];
  $('#display_all_exchange_pairs section').hide();
  $('#submit_chosen_pairs').show();
  switch (this.value) {
    case 'gdax':
      $('#gdax_pairs').show();
      break;
    case 'coinbase':
      $('#coinbase_pairs').show();
      break;
    default:
      $('#submit_chosen_pairs').hide();
  }
});

$('#gdax_pairs input[type=checkbox]').on('change', function(){
  if(this.checked){
    selected_pairs.push(this.value);
  }
  else{
    var index = selected_pairs.indexOf(this.value);
    if(index > -1){
      selected_pairs.splice(index, 1);
    }
  }
  console.log(selected_pairs)
});

$('#submit_chosen_pairs').on('click', function(){
  $('#display_all_exchange_pairs section').hide();
  $('#submit_chosen_pairs').hide();
  appendNewPairs(selected_pairs);
  switch ($('#select_exchange').val()) {
    case 'gdax':
      GdaxRealTimePrice(selected_pairs);
      break;
    case 'coinbase':

      break;
    default:

  }
});

function saveSelectedPairs(exchange, new_pairs){
  var pairs = {};

}

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
}
