'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinTopStart = mainPin.offsetTop;
  var mainPinLeftStart = mainPin.offsetLeft;

  var onError = function () {
    window.message.renderMessage('#error');
  };

  var onSuccess = function () {
    window.start.init();
    onResetCkick();
    window.message.renderMessage('#success');
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

  var resetFormButton = form.querySelector('.ad-form__reset');

  var clearSelects = function () {
    var selects = document.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      selects[i].selectedIndex = 0;
    }
  };

  var clearForm = function () {
    var inputs = document.querySelectorAll('input');
    var inputsChecked = document.querySelectorAll('input:checked');
    var textarea = document.querySelector('textarea');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
    for (var j = 0; j < inputsChecked.length; j++) {
      inputsChecked[j].checked = false;
    }
    textarea.value = '';
    clearSelects();
  };

  var onResetCkick = function () {
    window.start.init();
    clearForm();
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
    window.pin.deletePins();
    window.card.deleteAllCards();
    mainPin.style.left = mainPinLeftStart + 'px';
    mainPin.style.top = mainPinTopStart + 'px';
    window.start.setAddressValue(mainPinLeftStart, mainPinTopStart, false);
    window.validation.changeMinPrice(window.validation.typeSelect, window.validation.priceInput);
  };

  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    onResetCkick();
  });
})();
