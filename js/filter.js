'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var updateAds = function () {
    var filterByType = window.ads.filter(function (it) {
      return it.offer.type === housingType.value;
    });
    window.start.render(filterByType);
  };

  housingType.addEventListener('change', function () {
    if (housingType.value === 'any') {
      window.start.render(window.ads);
    } else {
      updateAds();
    }
  });
})();
