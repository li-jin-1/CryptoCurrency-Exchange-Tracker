const map_price = {
    usd: "$",
    eur: "€",
    aud: "AU$",
    cad: "Can$",
    chf: "CHF",
    cny: "¥",
    gbp: "£",
    btc: String.fromCharCode(parseInt("+20BF",16))
};
const all_exchanges = ['gdax', 'binance', 'huobi'];
const exchange_callback = {
  'gdax': GdaxRealTimePrice,
  'binance': BinanceRealTimePrice,
  'huobi': HuobiRealTimePrice
};
const binance_pairs = "ethbtc,ltcbtc,bnbbtc,neobtc,qtumeth,eoseth,snteth,bnteth,bccbtc,gasbtc,bnbeth,btcusdt,ethusdt,hsrbtc,oaxeth,dnteth,mcoeth,icneth,mcobtc,wtcbtc,wtceth,lrcbtc,lrceth,qtumbtc,yoyobtc,omgbtc,omgeth,zrxbtc,zrxeth,stratbtc,strateth,snglsbtc,snglseth,bqxbtc,bqxeth,kncbtc,knceth,funbtc,funeth,snmbtc,snmeth,neoeth,iotabtc,iotaeth,linkbtc,linketh,xvgbtc,xvgeth,ctrbtc,ctreth,saltbtc,salteth,mdabtc,mdaeth,mtlbtc,mtleth,subbtc,subeth,eosbtc,sntbtc,etceth,etcbtc,mthbtc,mtheth,engbtc,engeth,dntbtc,zecbtc,zeceth,bntbtc,astbtc,asteth,dashbtc,dasheth,oaxbtc,icnbtc,btgbtc,btgeth,evxbtc,evxeth,reqbtc,reqeth,vibbtc,vibeth,hsreth,trxbtc,trxeth,powrbtc,powreth,arkbtc,arketh,yoyoeth,xrpbtc,xrpeth,modbtc,modeth,enjbtc,enjeth,storjbtc,storjeth,bnbusdt,venbnb,yoyobnb,powrbnb,venbtc,veneth,kmdbtc,kmdeth,nulsbnb,rcnbtc,rcneth,rcnbnb,nulsbtc,nulseth,rdnbtc,rdneth,rdnbnb,xmrbtc,xmreth,dltbnb,wtcbnb,dltbtc,dlteth,ambbtc,ambeth,ambbnb,bcceth,bccusdt,bccbnb,batbtc,bateth,batbnb,bcptbtc,bcpteth,bcptbnb,arnbtc,arneth,gvtbtc,gvteth,cdtbtc,cdteth,gxsbtc,gxseth,neousdt,neobnb,poebtc,poeeth,qspbtc,qspeth,qspbnb,btsbtc,btseth,btsbnb,xzcbtc,xzceth,xzcbnb,lskbtc,lsketh,lskbnb,tntbtc,tnteth,fuelbtc,fueleth,manabtc,manaeth,bcdbtc,bcdeth,dgdbtc,dgdeth,iotabnb,adxbtc,adxeth,adxbnb,adabtc,adaeth,pptbtc,ppteth,cmtbtc,cmteth,cmtbnb,xlmbtc,xlmeth,xlmbnb,cndbtc,cndeth,cndbnb,lendbtc,lendeth,wabibtc,wabieth,wabibnb,ltceth,ltcusdt,ltcbnb,tnbbtc,tnbeth,wavesbtc,waveseth,wavesbnb,gtobtc,gtoeth,gtobnb,icxbtc,icxeth,icxbnb,ostbtc,osteth,ostbnb,elfbtc,elfeth,aionbtc,aioneth,aionbnb,neblbtc,nebleth,neblbnb,brdbtc,brdeth,brdbnb,mcobnb,edobtc,edoeth,wingsbtc,wingseth,navbtc,naveth,navbnb,lunbtc,luneth,trigbtc,trigeth,trigbnb,appcbtc,appceth,appcbnb,vibebtc,vibeeth,rlcbtc,rlceth,rlcbnb,insbtc,inseth,pivxbtc,pivxeth,pivxbnb,iostbtc,iosteth,chatbtc,chateth,steembtc,steemeth,steembnb,nanobtc,nanoeth,nanobnb,viabtc,viaeth,viabnb,blzbtc,blzeth,blzbnb,aebtc,aeeth,aebnb,rpxbtc,rpxeth,rpxbnb,ncashbtc,ncasheth,ncashbnb,poabtc,poaeth,poabnb,zilbtc,zileth,zilbnb,ontbtc,onteth,ontbnb";
const huobi_pairs = "naseth,eoseth,zecusdt,evxbtc,mdseth,smteth,trxeth,thetausdt,luneth,smtusdt,bchbtc,letusdt,gnxeth,mtlbtc,chateth,qtumusdt,sntbtc,wprbtc,elfeth,zilbtc,utkbtc,sbtcbtc,tntbtc,neousdt,mcobtc,osteth,bt2btc,topceth,hsreth,salteth,aidoceth,waxbtc,dtaeth,btcusdt,gaseth,neobtc,btmbtc,blzeth,bateth,appcbtc,cmtbtc,ontbtc,qtumeth,iostbtc,reqbtc,btmeth,ruffbtc,zecbtc,dgdeth,dateth,stketh,hteth,quneth,elfbtc,cmteth,ctxceth,sntusdt,mdsusdt,storjusdt,waxeth,powrbtc,sncbtc,venusdt,tnbeth,swftceth,eosbtc,linketh,htusdt,rdnbtc,lunbtc,gnxbtc,elabtc,leteth,iostusdt,evxeth,acteth,bchusdt,icxeth,bcxbtc,mtneth,propyeth,xrpusdt,icxbtc,thetaeth,snceth,dbceth,itcusdt,smtbtc,srneth,ethusdt,itcbtc,omgbtc,stkbtc,topcbtc,mdsbtc,adxbtc,etcbtc,kncbtc,cvcbtc,qspeth,btgbtc,edubtc,zlaeth,mtxeth,eosusdt,rcnbtc,utketh,rcneth,gntusdt,appceth,wiccbtc,yeebtc,yeeeth,omgusdt,linkbtc,xemusdt,hsrusdt,dashbtc,qunbtc,qasheth,dtabtc,aidocbtc,datbtc,ruffeth,saltbtc,iosteth,elaeth,thetabtc,letbtc,dtausdt,soceth,elausdt,zilusdt,manabtc,xrpbtc,onteth,ltcusdt,dbcbtc,bcdbtc,swftcbtc,cvcusdt,ctxcbtc,nasusdt,gnteth,trxusdt,htbtc,engeth,payeth,cvceth,tnbbtc,meeeth,powreth,blzbtc,paybtc,adxeth,ekoeth,srnbtc,ocneth,veneth,abteth,bifibtc,actbtc,etcusdt,ostbtc,mcoeth,abtbtc,storjbtc,venbtc,gntbtc,lskbtc,ekobtc,ltcbtc,ocnbtc,ruffusdt,wpreth,astbtc,dashusdt,dgdbtc,zileth,zrxbtc,ethbtc,reqeth,trxbtc,wicceth,nasbtc,meebtc,engbtc,lsketh,rpxbtc,tnteth,mtxbtc,socbtc,edueth,hsrbtc,qtumbtc,qspbtc,batbtc,qashbtc,itceth,xembtc,manaeth,gasbtc,mtnbtc,chatbtc,bt1btc,zlabtc,omgeth,propybtc,rdneth,elfusdt";
const exchange_pairs = {
  'binance': binance_pairs,
  'huobi': huobi_pairs
};

var selected_pairs = {};
var open_connection = {};
var search_list = {};

//search pair in each exchange
function SetSeachList(){
    all_exchanges.forEach(function(val){
        search_list[val] = [];
        var all_pairs = $('#'+val+'_pairs input[name='+val+']')
            .map(function() {
                return this.value;
            })
            .get();
        all_pairs.forEach(function(p){
            search_list[val].push({'pair': p});
        });
    });
}
//search pair in each exchange end

function loadExchangePairsOption(){
  for (var key in exchange_pairs) {
    if (exchange_pairs.hasOwnProperty(key)) {
        var pairs = exchange_pairs[key];
        pairs.split(',').forEach(function(val){
          switch (val.slice(-3)) {
            case 'btc':
              var html = "<div class='crypto_pair'>";
              html += "<input type='checkbox' name='" + key + "' value='" + val + "'>";
              html += "<label for='btc'>" + val.slice(0,-3).toUpperCase() + "/BTC</label>"
              html += "</div>";
              $('#' + key + '_btc_list').append(html);
              break;
            case 'eth':
              var html = "<div class='crypto_pair'>";
              html += "<input type='checkbox' name='" + key + "' value='" + val + "'>";
              html += "<label for='eth'>" + val.slice(0,-3).toUpperCase() + "/ETH</label>"
              html += "</div>";
              $('#' + key + '_eth_list').append(html);
              break;
            case 'sdt':
              var html = "<div class='crypto_pair'>";
              html += "<input type='checkbox' name='" + key + "' value='" + val + "'>";
              html += "<label for='usdt'>" + val.slice(0,-4).toUpperCase() + "/USDT</label>"
              html += "</div>";
              $('#' + key + '_usdt_list').append(html);
            case 'bnb':
              var html = "<div class='crypto_pair'>";
              html += "<input type='checkbox' name='" + key + "' value='" + val + "'>";
              html += "<label for='bnb'>" + val.slice(0,-3).toUpperCase() + "/BNB</label>"
              html += "</div>";
              $('#' + key + '_bnb_list').append(html);
              break;
            default:

          }
        })
    }
  }
}

function refreshCheckedList(exchange_name){
  var pairs = selected_pairs[exchange_name];
  var selected_exchange_elm = $('#'+exchange_name+'_pairs')
  $('#' + exchange_name + '_pairs [type=checkbox]').each(function(index){
    if(pairs.includes(this.value)){
      this.checked = true;
    }
    else{
      this.checked = false;
    }
  })
}

function loadSelectedPairs(){
  Object.keys(selected_pairs).forEach(function(element) {
    appendNewPairs(element, selected_pairs[element]);
    exchange_callback[element](selected_pairs[element]);
  });
}

function setSelectedPairs(){
  chrome.storage.sync.set({selected_pairs}, function(){
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

function appendNewPairs(exchange_name, pairs){
  if(pairs.length == 0){
    return false;
  }
  var real_time_div = $('#'+exchange_name+'_real_time_pairs');
  if(real_time_div.length == 0){
    real_time_div = $('<div id="' + exchange_name + '_real_time_pairs">');
    real_time_div.append('<div class="real_time_pairs_title">'+exchange_name.toUpperCase()+'</div>')
  }
  var html = '';
  for (var i = 0; i < pairs.length; i++) {
    html += '<div class="coin" id="'+exchange_name+'_'+pairs[i]+'">';
    html += '<div class="first-col">';
    html += '<div class="coin-name">'
    html += pairs[i];
    html += '</div>';
    html += '<span class="change up">0%</span>';
    html += '</div>';
    html += '<div class="second-col"><span class="coin-price"></span></div>';
    html += '</div>';
  }
  real_time_div.append(html);
  $('#real_time_pairs').append(real_time_div);
}

function GdaxRealTimePrice(pairs){
  if(isEmpty(pairs)){
    return false;
  }
  if(typeof open_connection['gdax'] !== 'undefined'){
    open_connection['gdax'].close();
  }
  var gdax_api = new Gdax();
  gdax_api.open(pairs, function(res){
    switch (res.type) {
      case 'ticker':
        var price = Number(res.price);
        var open_24h = Number(res.open_24h);
        var elm = $('#gdax_'+res.product_id);
        var growth_24hr = (Math.abs(price - open_24h)*100/open_24h).toFixed(2);
        var trend_24hr = (Number(price) >= Number(open_24h))? 'up' : 'down';
        var change_rate = elm.find('.change');
        change_rate.text(growth_24hr + '%');
        change_rate.removeClass('up down');
        change_rate.addClass(trend_24hr);
        var price_elm = elm.find('.coin-price');
        var price_sym = getPriceSymbol(res.product_id.slice(-3));
        price_elm.text(price_sym + price);
        break;
      case 'error':
        break;
      default:
        break;
    }
  });
}

function BinanceRealTimePrice(pairs){
  if(isEmpty(pairs)){
    return false;
  }
  if(typeof open_connection['binance'] !== 'undefined'){
    open_connection['binance'].close();
  }
  var binance_api = new Binance();
  binance_api.open(pairs, function(res){
    var symbol = res.data.s.toLowerCase();
    var price = res.data.c;
    var elm = $('#binance_'+symbol);
    var growth_24hr = Number(res.data.P).toFixed(2);
    var trend_24hr = growth_24hr >= 0 ? 'up' : 'down' ;
    var change_rate = elm.find('.change');
    change_rate.text(growth_24hr + '%');
    change_rate.removeClass('up down');
    change_rate.addClass(trend_24hr);
    var price_elm = elm.find('.coin-price');
    price_elm.text(price);
  });
}

function HuobiRealTimePrice(pairs){
  if(isEmpty(pairs)){
    return false;
  }
  if(typeof open_connection['huobi'] !== 'undefined'){
    open_connection['huobi'].close();
  }
  var huobi_api = new Huobi();
  huobi_api.open(pairs, function(res){
    var symbol = res.ch.split('.')[1];
    var price = Number(res.tick.close);
    var elm = $('#huobi_'+symbol);
    var open_24h = Number(res.tick.open);
    var growth_24hr = (Math.abs(price - open_24h)*100/open_24h).toFixed(2);
    var trend_24hr = (Number(price) >= Number(open_24h))? 'up' : 'down';
    var change_rate = elm.find('.change');
    change_rate.text(growth_24hr + '%');
    change_rate.removeClass('up down');
    change_rate.addClass(trend_24hr);
    var price_elm = elm.find('.coin-price');
    price_elm.text(price);
  })
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
  if(typeof api === 'undefined' || api == 'all'){
    Object.keys(open_connection).forEach(function(key) {
      open_connection[key].close();
    });
    selected_pairs = {};
  }
  else{
    open_connection[api].close();
    delete open_connection[api];
  }
}
