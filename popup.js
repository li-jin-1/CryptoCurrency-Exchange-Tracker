chrome.storage.local.get(function (result) {
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

$('#select_exchange').on('change', function(){
  $('#display_all_exchange_pairs section').hide();
  $('#submit_chosen_pairs').show();
  $('#real_time_pairs').html('');
  if(this.value != "" && !selected_pairs.hasOwnProperty(this.value)){
    selected_pairs[this.value] = [];
  }
  refreshCheckedList(this.value);
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
  var action;
  if(this.checked){
    action = 'add';
  }
  else{
    action = 'remove';
  }
  editSelectPairs('gdax', action, this.value)
  console.log(selected_pairs)
});

$('#submit_chosen_pairs').on('click', function(){
  $('#display_all_exchange_pairs section').hide();
  $('#submit_chosen_pairs').hide();
  setSelectedPairs();
  $('#select_exchange').val('');
});

$('#clear_setting').on('click', function(){
  chrome.storage.local.clear(function(){
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
