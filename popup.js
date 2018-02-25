chrome.storage.local.get(function (result) {
  selected_pairs = result['selected_pairs'];
  if(!isEmpty(selected_pairs)){
    $('#select_exchange').hide();
    $('#display_all_exchange_pairs section').hide();
    $('#submit_chosen_pairs').hide();
  }
  loadSelectedPairs();
});

$('#select_exchange').on('change', function(){
  $('#display_all_exchange_pairs section').hide();
  $('#submit_chosen_pairs').show();
  if(this.value != "" && !selected_pairs.hasOwnProperty(this.value)){
    selected_pairs[this.value] = []
  }
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
});
