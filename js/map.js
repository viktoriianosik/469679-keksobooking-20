'use strict';

(function () {
  var closeAllCard = function () {
    var popups = document.querySelectorAll('.map__card');
    var openedPopups = document.querySelectorAll('.map__card');
    for (var i = 0; i < popups.length; i++) {
      popups[i].style.display = 'none';
    }
    for (var j = 0; j < openedPopups.length; j++) {
      openedPopups[j].classList.remove('map__card--open');
    }
  };

  var onPinClick = function (id) {
    closeAllCard();
    var popups = document.querySelectorAll('.map__card');
    var popup = popups[id];
    popup.style.display = 'block';
    popup.classList.add('map__card--open');
  };

  var closeCardPopup = function (popup) {
    popup.style.display = 'none';
    popup.classList.remove('map__card--open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onCloseButtonClick = function () {
    var openedPopup = document.querySelector('.map__card--open');
    if (openedPopup) {
      var popupCloseButton = openedPopup.querySelector('.popup__close');
      popupCloseButton.addEventListener('click', function () {
        closeCardPopup(openedPopup);
      });
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      var openedPopup = document.querySelector('.map__card--open');
      if (openedPopup) {
        closeCardPopup(openedPopup);
      }
    }
  };

  window.openCardPopup = function () {
    var mapPins = document.querySelectorAll('.map__pin[type=button]');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', function (evt) {
        var pinId = evt.target.closest('.map__pin').id;
        onPinClick(+pinId);
        onCloseButtonClick();
        document.addEventListener('keydown', onPopupEscPress);
      });
    }
  };
})();
