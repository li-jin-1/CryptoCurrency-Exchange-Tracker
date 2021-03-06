//pull binance current pairs
/*
3-11-2018 pull result:
ETHBTC,LTCBTC,BNBBTC,NEOBTC,123456,QTUMETH,EOSETH,SNTETH,BNTETH,BCCBTC,GASBTC,BNBETH,BTCUSDT,ETHUSDT,HSRBTC,OAXETH,DNTETH,MCOETH,ICNETH,MCOBTC,WTCBTC,WTCETH,LRCBTC,LRCETH,QTUMBTC,YOYOBTC,OMGBTC,OMGETH,ZRXBTC,ZRXETH,STRATBTC,STRATETH,SNGLSBTC,SNGLSETH,BQXBTC,BQXETH,KNCBTC,KNCETH,FUNBTC,FUNETH,SNMBTC,SNMETH,NEOETH,IOTABTC,IOTAETH,LINKBTC,LINKETH,XVGBTC,XVGETH,CTRBTC,CTRETH,SALTBTC,SALTETH,MDABTC,MDAETH,MTLBTC,MTLETH,SUBBTC,SUBETH,EOSBTC,SNTBTC,ETCETH,ETCBTC,MTHBTC,MTHETH,ENGBTC,ENGETH,DNTBTC,ZECBTC,ZECETH,BNTBTC,ASTBTC,ASTETH,DASHBTC,DASHETH,OAXBTC,ICNBTC,BTGBTC,BTGETH,EVXBTC,EVXETH,REQBTC,REQETH,VIBBTC,VIBETH,HSRETH,TRXBTC,TRXETH,POWRBTC,POWRETH,ARKBTC,ARKETH,YOYOETH,XRPBTC,XRPETH,MODBTC,MODETH,ENJBTC,ENJETH,STORJBTC,STORJETH,BNBUSDT,VENBNB,YOYOBNB,POWRBNB,VENBTC,VENETH,KMDBTC,KMDETH,NULSBNB,RCNBTC,RCNETH,RCNBNB,NULSBTC,NULSETH,RDNBTC,RDNETH,RDNBNB,XMRBTC,XMRETH,DLTBNB,WTCBNB,DLTBTC,DLTETH,AMBBTC,AMBETH,AMBBNB,BCCETH,BCCUSDT,BCCBNB,BATBTC,BATETH,BATBNB,BCPTBTC,BCPTETH,BCPTBNB,ARNBTC,ARNETH,GVTBTC,GVTETH,CDTBTC,CDTETH,GXSBTC,GXSETH,NEOUSDT,NEOBNB,POEBTC,POEETH,QSPBTC,QSPETH,QSPBNB,BTSBTC,BTSETH,BTSBNB,XZCBTC,XZCETH,XZCBNB,LSKBTC,LSKETH,LSKBNB,TNTBTC,TNTETH,FUELBTC,FUELETH,MANABTC,MANAETH,BCDBTC,BCDETH,DGDBTC,DGDETH,IOTABNB,ADXBTC,ADXETH,ADXBNB,ADABTC,ADAETH,PPTBTC,PPTETH,CMTBTC,CMTETH,CMTBNB,XLMBTC,XLMETH,XLMBNB,CNDBTC,CNDETH,CNDBNB,LENDBTC,LENDETH,WABIBTC,WABIETH,WABIBNB,LTCETH,LTCUSDT,LTCBNB,TNBBTC,TNBETH,WAVESBTC,WAVESETH,WAVESBNB,GTOBTC,GTOETH,GTOBNB,ICXBTC,ICXETH,ICXBNB,OSTBTC,OSTETH,OSTBNB,ELFBTC,ELFETH,AIONBTC,AIONETH,AIONBNB,NEBLBTC,NEBLETH,NEBLBNB,BRDBTC,BRDETH,BRDBNB,MCOBNB,EDOBTC,EDOETH,WINGSBTC,WINGSETH,NAVBTC,NAVETH,NAVBNB,LUNBTC,LUNETH,TRIGBTC,TRIGETH,TRIGBNB,APPCBTC,APPCETH,APPCBNB,VIBEBTC,VIBEETH,RLCBTC,RLCETH,RLCBNB,INSBTC,INSETH,PIVXBTC,PIVXETH,PIVXBNB,IOSTBTC,IOSTETH,CHATBTC,CHATETH,STEEMBTC,STEEMETH,STEEMBNB,NANOBTC,NANOETH,NANOBNB,VIABTC,VIAETH,VIABNB,BLZBTC,BLZETH,BLZBNB,AEBTC,AEETH,AEBNB,RPXBTC,RPXETH,RPXBNB,NCASHBTC,NCASHETH,NCASHBNB,POABTC,POAETH,POABNB,ZILBTC,ZILETH,ZILBNB,ONTBTC,ONTETH,ONTBNB
*/
var ajax = new XMLHttpRequest();
ajax.onload = functionName;
ajax.onerror = errorFunctionName;
ajax.open("GET", "https://api.binance.com/api/v1/exchangeInfo", true);
ajax.send();
function functionName() {
    console.log(this); // log the response
    if (this.status == 200) { // request succeeded
        var json = JSON.parse(this.responseText); console.log(json)
        var symbols_info = json.symbols;
        var alls = [];
        symbols_info.forEach(function(i){
          alls.push(i.symbol);
        })
        console.log(alls.join(','));
    } else {
        // handle more HTTP response codes here;
    }
}
function errorFunctionName(e) {
    console.log(this);
    console.error(e);
    // do something with this.status, this.statusText
}
//end pull binance current pairs

//pull huobi current pairs
var ajax = new XMLHttpRequest();
ajax.onload = functionName;
ajax.onerror = errorFunctionName;
ajax.open("GET", "https://api.huobipro.com/v1/common/symbols", true);
ajax.send();

function functionName() {
    console.log(this); // log the response
    if (this.status == 200) { // request succeeded
        var json = JSON.parse(this.responseText); console.log(json)
        var alls = [];
        if(json.status == 'ok'){
          json.data.forEach(function(i){
            alls.push((i['base-currency']+i['quote-currency']));
          })
          console.log(alls.join(','));
        }
        else{
          //error reponse
        }

    } else {
        // handle more HTTP response codes here;
    }
}
function errorFunctionName(e) {
    console.log(this);
    console.error(e);
    // do something with this.status, this.statusText
}
