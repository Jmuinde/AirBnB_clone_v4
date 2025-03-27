$(document).ready(function () {
  let checkedAmenities = {};

  // Track checkbox changes
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }

    let lst = Object.values(checkedAmenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(lst.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  // Check API status
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("API status check failed:", textStatus, errorThrown);
    $('DIV#api_status').removeClass('available');
  });

  // Debug log to confirm JS is loading
  console.log("2-hbnb.js loaded and running...");
});

