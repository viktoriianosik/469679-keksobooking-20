'use strict';

var cardTemplate = document.querySelector('#card').content.querySelector('article');

var TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

var getCardTemplate = function (card) {
  var newCard = cardTemplate.cloneNode(true);

  newCard.style.display = 'none';
  newCard.querySelector('.popup__title').textContent = card.offer.title;
  newCard.querySelector('.popup__text--address').textContent = card.offer.addres;
  newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = card.offer.type;
  newCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
  newCard.querySelector('.popup__text--time').textContent = 'заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
  newCard.querySelector('.popup__description').textContent = card.offer.description;
  newCard.querySelector('.popup__avatar').src = card.author.avatar;
  renderPhotos(newCard, card.offer.photos);
  renderFeatures(newCard, card.offer.features);
  newCard.querySelector('.popup__type').textContent = TYPES[card.offer.type];

  return newCard;
};

var renderFeatures = function (card, featureArray) {
  var features = card.querySelectorAll('.popup__feature');
  for (var i = 0; i < features.length; i++) {
    features[i].style.display = 'none';
    for (var j = 0; j < featureArray.length; j++) {
      if (features[i].classList.contains('popup__feature--' + featureArray[j])) {
        features[i].style.display = 'inline-block';
      }
    }
  }
};

var renderPhotos = function (card, photos) {
  var popupPhotos = card.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('img');
  while (popupPhotos.firstChild) {
    popupPhotos.removeChild(popupPhotos.firstChild);
  }
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var newPopupPhoto = popupPhoto.cloneNode(true);
    newPopupPhoto.src = photos[i];
    fragment.appendChild(newPopupPhoto);
  }
  popupPhotos.appendChild(fragment);
};

var filtersContainer = document.querySelector('.map__filters-container');
var fragment = document.createDocumentFragment();

window.renderCards = function () {
  for (var i = 0; i < window.ads.length; i++) {
    fragment.appendChild(getCardTemplate(window.ads[i]));
  }
  filtersContainer.before(fragment);
};

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
