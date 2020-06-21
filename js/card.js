// 'use strict';

// var cardTemplate = document.querySelector('#card').content.querySelector('article');

// var TYPES = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   bungalo: 'Бунгало',
//   house: 'Дом'
// };

// var getCardTemplate = function (card) {
//   var newCard = cardTemplate.cloneNode(true);

//   newCard.querySelector('.popup__title').textContent = card.offer.title;
//   newCard.querySelector('.popup__text--address').textContent = card.offer.addres;
//   newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
//   newCard.querySelector('.popup__type').textContent = card.offer.type;
//   newCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
//   newCard.querySelector('.popup__text--time').textContent = 'заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
//   newCard.querySelector('.popup__description').textContent = card.offer.description;
//   newCard.querySelector('.popup__avatar').src = card.author.avatar;
//   renderPhotos(newCard, card.offer.photos);
//   renderFeatures(newCard, card.offer.features);
//   newCard.querySelector('.popup__type').textContent = TYPES[card.offer.type];

//   return newCard;
// };

// var renderFeatures = function (card, featureArray) {
//   var features = card.querySelectorAll('.popup__feature');
//   for (var i = 0; i < features.length; i++) {
//     features[i].style.display = 'none';
//     for (var j = 0; j < featureArray.length; j++) {
//       if (features[i].classList.contains('popup__feature--' + featureArray[j])) {
//         features[i].style.display = 'inline-block';
//       }
//     }
//   }
// };

// var renderPhotos = function (card, photos) {
//   var popupPhotos = card.querySelector('.popup__photos');
//   var popupPhoto = popupPhotos.querySelector('img');
//   while (popupPhotos.firstChild) {
//     popupPhotos.removeChild(popupPhotos.firstChild);
//   }
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < photos.length; i++) {
//     var newPopupPhoto = popupPhoto.cloneNode(true);
//     newPopupPhoto.src = photos[i];
//     fragment.appendChild(newPopupPhoto);
//   }
//   popupPhotos.appendChild(fragment);
// };

// var filtersContainer = document.querySelector('.map__filters-container');
// var fragment = document.createDocumentFragment();

// var renderCards = function () {
//   for (var i = 0; i < window.ads.length; i++) {
//     fragment.appendChild(getCardTemplate(window.ads[i]));
//   }
//   filtersContainer.before(fragment);
// };

// renderCards();
