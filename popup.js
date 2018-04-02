//google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-116736680-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);

/*
  var socket = io.connect('http://104.131.0.71:4200/');
  socket.on('connect', function(data) {
     socket.emit('join', 'Hello World from ssssss');
  });
  */
})();



//google analytics end

//get user identity
chrome.identity.getProfileUserInfo(function(userInfo) {
  console.log(JSON.stringify(userInfo));
});
//get user identity end

//load saved content
chrome.storage.sync.get(function (result) {
  loadExchangePairsOption();
  selected_pairs = result['selected_pairs']
  if(!isEmpty(selected_pairs)){
    $('#display_all_exchange_pairs section').hide();
    $('#submit_chosen_pairs').hide();
    loadSelectedPairs();
  }
  else{
    selected_pairs = {}
  }
});


$( document ).ready(function(){
  $('#select_exchange').on('change', function(){
    $('#display_all_exchange_pairs section').hide();
    $('#submit_chosen_pairs').show();
    $('#real_time_pairs').html('');
    if(this.value != "" && !selected_pairs.hasOwnProperty(this.value)){
      selected_pairs[this.value] = [];
    }
    refreshCheckedList(this.value);
    if(this.value.length > 0){
      $('#'+this.value+'_pairs').show();
    }
    else{
      $('#submit_chosen_pairs').hide();
    }
  });

  $('#all_exchange_options section input[type=checkbox]').on('change', function(){
    var action;
    if(this.checked){
      action = 'add';
    }
    else{
      action = 'remove';
    }
    editSelectPairs(this.name, action, this.value)
    console.log(selected_pairs)
  });

  $('#submit_chosen_pairs_button').on('click', function(){
    $('#display_all_exchange_pairs section').hide();
    $('#submit_chosen_pairs').hide();
    $('#select_exchange').val('');
    setSelectedPairs();
  });

  $('#clear_setting').on('click', function(){
    chrome.storage.sync.clear(function(){
      closeConnection();
      $('#real_time_pairs').html('');
      $('#close_setting_panel').click();
    })
  });

  $('#setting_option').on('click', function(){
    $('.setting_panel').css('z-index', 1);
    $('.setting_panel').css('opacity', 9);
  })

  $('#close_setting_panel').on('click', function(){
    $('.setting_panel').css('z-index', -1);
    $('.setting_panel').css('opacity', 0);
  })
});
