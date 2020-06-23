'use strict';
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var getPinTemplate = function (ad) {
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pin.style.left = ad.location.x - window.PIN_WIDTH / 2 + 'px';
    pin.style.top = ad.location.y + 'px';
    pinImg.src = ad.author.avatar;
    pinImg.alt = ad.offer.title;
    pin.id = ad.id;

    return pin;
  };

  var mapPinsContainer = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  window.renderPins = function () {
    for (var i = 0; i < window.ads.length; i++) {
      fragment.appendChild(getPinTemplate(window.ads[i]));
    }
    mapPinsContainer.appendChild(fragment);
  };
})();
