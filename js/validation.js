'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');

  var checkPlacement = function () {
    if (roomNumberSelect.value === '100' && capacitySelect.value !== '0') {
      capacitySelect.setCustomValidity('Выбранный тип жилья не для гостей!');
    } else if (roomNumberSelect.value < capacitySelect.value) {
      capacitySelect.setCustomValidity('Колличество гостей не может быть больше ' + roomNumberSelect.value);
    } else if (roomNumberSelect.value !== '100' && capacitySelect.value === '0') {
      capacitySelect.setCustomValidity('Выбранный тип жилья только для гостей!');
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  roomNumberSelect.addEventListener('change', function () {
    checkPlacement();
  });

  capacitySelect.addEventListener('change', function () {
    checkPlacement();
  });

  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');

  var changeMinPrice = function (type, pricce) {
    switch (type.value) {
      case 'bungalo':
        pricce.min = 0;
        pricce.placeholder = '0';
        break;
      case 'flat':
        pricce.min = 1000;
        pricce.placeholder = '1000';
        break;
      case 'house':
        pricce.min = 5000;
        pricce.placeholder = '5000';
        break;
      case 'palace':
        pricce.min = 10000;
        pricce.placeholder = '10000';
        break;
    }
  };

  typeSelect.addEventListener('change', function () {
    changeMinPrice(typeSelect, priceInput);
  });

  priceInput.addEventListener('change', function () {
    changeMinPrice(typeSelect, priceInput);
  });

  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });
})();
