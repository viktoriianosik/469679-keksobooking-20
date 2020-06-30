'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getPinTemplate = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pin.style.left = ad.location.x - window.start.PIN_WIDTH / 2 + 'px';
    pin.style.top = ad.location.y + 'px';
    pinImg.src = ad.author.avatar;
    pinImg.alt = ad.offer.title;
    pin.id = ad.id;

    return pin;
  };

  var deletePins = function () {
    var mapPinsContainer = document.querySelector('.map__pins');
    while (mapPinsContainer.children.length > 2) {
      mapPinsContainer.removeChild(mapPinsContainer.lastChild);
    }
  };
  var renderPins = function (ads) {
    var mapPinsContainer = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    deletePins();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(getPinTemplate(ads[i]));
    }
    mapPinsContainer.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    deletePins: deletePins,
  };
})();
