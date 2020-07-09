'use strict';
(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var selects = document.querySelectorAll('select');
  var fieldsets = document.querySelectorAll('fieldset');
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('input[name=address]');
  var PIN_WIDTH = 62;
  var PIN_HEIGHT_INACTIVE = 62;
  var PIN_HEIGHT_ACTIVE = 84;

  var toogleDisabledAttribute = function (item, disabled) {
    if (disabled) {
      item.setAttribute('disabled', 'disabled');
    } else {
      item.removeAttribute('disabled', 'disabled');
    }
  };

  var setDisabledAttrubite = function (items) {
    for (var i = 0; i < items.length; i++) {
      toogleDisabledAttribute(items[i], true);
    }
  };

  var removeDisabledAttrubite = function (items) {
    for (var i = 0; i < items.length; i++) {
      toogleDisabledAttribute(items[i], false);
    }
  };

  var setActiveState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeDisabledAttrubite(fieldsets);
    removeDisabledAttrubite(selects);
  };

  var setAddressValue = function (coordinateX, coordinateY, activeMap) {
    if (activeMap) {
      inputAddress.value = (coordinateX + PIN_WIDTH / 2) + ', ' + (coordinateY + PIN_HEIGHT_ACTIVE);
    } else {
      inputAddress.value = (coordinateX + PIN_WIDTH / 2) + ', ' + (coordinateY + PIN_HEIGHT_INACTIVE / 2);
    }
  };

  var init = function () {
    inputAddress.readOnly = true;
    setAddressValue(mainPin.offsetLeft, mainPin.offsetTop, false);
    setDisabledAttrubite(fieldsets);
    setDisabledAttrubite(selects);
  };
  init();

  var render = function (ads) {
    for (var i = 0; i < ads.length; i++) {
      ads[i].id = i;
    }
    window.pin.renderPins(ads);
    window.card.renderCards(ads);
    window.map.openCardPopup();
  };

  var onLoad = function (ads) {
    window.ads = ads;
    render(ads);
  };

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActiveState();
      setAddressValue(mainPin.offsetLeft, mainPin.offsetTop, true);
      window.backend.load(onLoad, window.backend.onError);
      window.renderCards();
      window.openCardPopup();
    }
  });


  window.start = {
    setActiveState: setActiveState,
    setAddressValue: setAddressValue,
    onLoad: onLoad,
    init: init,
    render: render,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT_ACTIVE: PIN_HEIGHT_ACTIVE,
  };
})();
