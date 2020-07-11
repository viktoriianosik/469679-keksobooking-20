'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var filterWifi = housingFeatures.querySelector('#filter-wifi');
  var filterDishWasher = housingFeatures.querySelector('#filter-dishwasher');
  var filterParking = housingFeatures.querySelector('#filter-parking');
  var filterWasher = housingFeatures.querySelector('#filter-washer');
  var filterElevator = housingFeatures.querySelector('#filter-elevator');
  var filterConditioner = housingFeatures.querySelectorAll('#filter-conditioner');
  var filteredAds;

  var filterByPrice = function (array) {
    if (housingPrice.value === 'middle') {
      return array.filter(function (it) {
        return (it.offer.price >= '10000') && (it.offer.price <= '50000');
      });
    }
    if (housingPrice.value === 'low') {
      return array.filter(function (it) {
        return it.offer.price < '10000';
      });
    }
    if (housingPrice.value === 'high') {
      return array.filter(function (it) {
        return it.offer.price > '50000';
      });
    }
    return array;
  };

  var filterByType = function (array) {
    return array.filter(function (it) {
      return it.offer.type === housingType.value;
    });
  };

  var filterByRooms = function (array) {
    return array.filter(function (it) {
      return it.offer.rooms === parseInt(housingRooms.value, 10);
    });
  };

  var filterByGuest = function (array) {
    return array.filter(function (it) {
      return it.offer.guests === parseInt(housingGuests.value, 10);
    });
  };

  var filterFeatures = function (array, checkedFeature) {
    return array.filter(function (it) {
      return it.offer.features.includes(checkedFeature);
    });
  };

  var updateAds = function () {
    filteredAds = window.ads;

    if (housingType.value !== 'any') {
      filteredAds = filterByType(filteredAds);
    }
    if (housingPrice.value !== 'any') {
      filteredAds = filterByPrice(filteredAds);
    }
    if (housingRooms.value !== 'any') {
      filteredAds = filterByRooms(filteredAds);
    }
    if (housingGuests.value !== 'any') {
      filteredAds = filterByGuest(filteredAds);
    }
    if (filterWifi.checked) {
      filteredAds = filterFeatures(filteredAds, filterWifi.value);
    }
    if (filterDishWasher.checked) {
      filteredAds = filterFeatures(filteredAds, filterDishWasher.value);
    }
    if (filterParking.checked) {
      filteredAds = filterFeatures(filteredAds, filterParking.value);
    }
    if (filterWasher.checked) {
      filteredAds = filterFeatures(filteredAds, filterWasher.value);
    }
    if (filterElevator.checked) {
      filteredAds = filterFeatures(filteredAds, filterElevator.value);
    }
    if (filterConditioner.checked) {
      filteredAds = filterFeatures(filteredAds, filterConditioner.value);
    }

    window.start.render(filteredAds);
  };

  mapFilters.addEventListener('change', function () {
    updateAds();
  });
})();
