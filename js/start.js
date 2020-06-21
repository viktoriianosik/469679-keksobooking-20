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

var setDisabledAttribute = function (item) {
  item.setAttribute('disabled', 'disabled');
};

var disabledSelects = function () {
  for (var i = 0; i < selects.length; i++) {
    setDisabledAttribute(selects[i]);
  }
};

var disabledFielsets = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    setDisabledAttribute(fieldsets[i]);
  }
};

var deleteDisabledAttribute = function (item) {
  item.removeAttribute('disabled', 'disabled');
};

var deleteDisabledSelects = function () {
  for (var i = 0; i < selects.length; i++) {
    deleteDisabledAttribute(selects[i]);
  }
};

var deleteDisabledFielsets = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    deleteDisabledAttribute(fieldsets[i]);
  }
};

disabledFielsets();
disabledSelects();

var coordinateX = parseInt(mainPin.style.left, 10) + PIN_WIDTH / 2;
var coordinateYInActive = parseInt(mainPin.style.top, 10) + PIN_HEIGHT_INACTIVE;
var coordinateYActive = parseInt(mainPin.style.top, 10) + PIN_HEIGHT_ACTIVE;
inputAddress.readOnly = true;
inputAddress.value = coordinateX + ', ' + coordinateYInActive;


var setActiveState = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  deleteDisabledSelects();
  deleteDisabledFielsets();
  inputAddress.value = coordinateX + ', ' + coordinateYActive;
};


mainPin.addEventListener('mousedown', function (evt) {
  // Проверка на клик только левой кнопки мыши
  if (evt.button === 0) {
    setActiveState();
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setActiveState();
  }
});


