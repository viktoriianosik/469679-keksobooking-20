'use strict';

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

var init = function () {
  var coordinateX = parseInt(mainPin.style.left, 10) + PIN_WIDTH / 2;
  var coordinateYInActive = parseInt(mainPin.style.top, 10) + PIN_HEIGHT_INACTIVE;
  var coordinateYActive = parseInt(mainPin.style.top, 10) + PIN_HEIGHT_ACTIVE;
  inputAddress.readOnly = true;
  inputAddress.value = coordinateX + ', ' + coordinateYInActive;
  setDisabledAttrubite(fieldsets);
  setDisabledAttrubite(selects);

  mainPin.addEventListener('mousedown', function (evt) {
    // Проверка на клик только левой кнопки мыши
    if (evt.button === 0) {
      setActiveState(coordinateX, coordinateYActive);
    }
  });
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActiveState(coordinateX, coordinateYActive);
    }
  });
};

init();

var setActiveState = function (coordinateX, coordinateYActive) {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  removeDisabledAttrubite(fieldsets);
  removeDisabledAttrubite(selects);
  inputAddress.value = coordinateX + ', ' + coordinateYActive;
  window.renderPins();
  window.renderCards();
  window.openCardPopup();
};


