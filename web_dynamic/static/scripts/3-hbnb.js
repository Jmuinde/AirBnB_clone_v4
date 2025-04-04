$(document).ready(init);

const HOST = '0.0.0.0';

function init () {
  const amenityObj = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObj[$(this).attr('data-name')];
    }
    const names = Object.keys(amenityObj);
    $('.amenities h4').text(names.sort().join(', '));
  });

  apiStatus();
  fetchPlaces();
}

function apiStatus () {
  const API_URL = 'http://localhost:5001/api/v1/status/';
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}





function fetchPlaces () {
  const HOST = window.location.hostname;
  const PLACES_URL = `http://${HOST}:5001/api/v1/places_search/`;

  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      for (const r of response) {
        const article = `
          <article>
            <div class="title_box">
              <h2>${r.name}</h2>
              <div class="price_by_night">$${r.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${r.max_guest} Guest${r.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${r.number_rooms} Bedroom${r.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${r.number_bathrooms} Bathroom${r.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${r.description || ''}
            </div>
          </article>
        `;
        $('section.places').append(article);
      }
    },
    error: function (xhr, status, error) {
      console.error("Failed to fetch places:", status, error);
    }
  });
}

