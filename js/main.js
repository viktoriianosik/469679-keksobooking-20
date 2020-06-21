'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 65;

var randomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


var randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var shuffleArray = function (array) {
  var newArray = array;
  var currentIndex = newArray.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
};

var createRandomArray = function (array) {
  var newAmount = randomInteger(1, array.length);
  var newArray = shuffleArray(array);
  newArray = newArray.slice(0, newAmount);
  return newArray;
};

var generateAds = function () {
  var ads = [];
  for (var i = 1; i < 9; i++) {
    ads.push({
      'id': i - 1,
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': 'Заголовок',
        'addres': '600 350',
        'price': 100,
        'type': randomElement(TYPES),
        'rooms': 3,
        'guests': 3,
        'checkin': randomElement(TIME),
        'checkout': randomElement(TIME),
        'features': createRandomArray(FEATURES),
        'description': 'строка с описанием',
        'photos': createRandomArray(PHOTOS),
      },
      'location': {
        'x': randomInteger(50, 930),
        'y': randomInteger(130, 630),
      }
    });
  }
  return ads;
};

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getPinTemplate = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');

  pin.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = ad.location.y + 'px';
  pinImg.src = ad.author.avatar;
  pinImg.alt = ad.offer.title;
  pin.id = ad.id;

  return pin;
};

var mapPinsContainer = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
window.ads = generateAds();

window.renderPins = function () {
  for (var i = 0; i < window.ads.length; i++) {
    fragment.appendChild(getPinTemplate(window.ads[i]));
  }
  mapPinsContainer.appendChild(fragment);
};
