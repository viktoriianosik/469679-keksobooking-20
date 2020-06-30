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

  var changeMinPrice = function (type, price) {
    switch (type.value) {
      case 'bungalo':
        price.min = 0;
        price.placeholder = '0';
        break;
      case 'flat':
        price.min = 1000;
        price.placeholder = '1000';
        break;
      case 'house':
        price.min = 5000;
        price.placeholder = '5000';
        break;
      case 'palace':
        price.min = 10000;
        price.placeholder = '10000';
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

  window.validation = {
    changeMinPrice: changeMinPrice,
    typeSelect: typeSelect,
    priceInput: priceInput,
  };
})();
