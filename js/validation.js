'use strict';
var adForm = document.querySelector('.ad-form');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

var checkPlacement = function () {
  if (roomNumber.value == '100' && capacity.value != 0) {
    capacity.setCustomValidity('Выбранный тип жилья не для гостей!');
  } else if (roomNumber.value < capacity.value && capacity.value != 0) {
    capacity.setCustomValidity('Колличество гостей не может быть больше ' + roomNumber.value);
  } else if (roomNumber.value != '100' && capacity.value == 0) {
    capacity.setCustomValidity('Выбранный тип жилья только для гостей!');
  } else {
    capacity .setCustomValidity('');
  }
};

roomNumber.addEventListener('change', function () {
  checkPlacement();
});

capacity.addEventListener('change', function () {
  checkPlacement();
});
