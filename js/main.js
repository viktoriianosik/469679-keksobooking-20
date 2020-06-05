'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES= ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 62;
var PIN_HEIGHT = 84;

var randomElement = function (array) {
  return array[Math.floor(Math.random * array.length)];
}

var randomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var shuffle = function (array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

var createRandomArray = function (array) {
  var newAmount = randomInteger(1, array.length);
  var newArray = shuffle(array);
  newArray = newArray.slice(0, newAmount);
  return newArray;
};

var generateAds = function () {
  var ads = [];
  for (var i = 1; i < 9; i++) {
    ads.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': 'Заголовок',
        'address': '600 350',
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
    })
  };
  return ads;
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (ad) {
  var pin = pinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');

  pin.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = ad.location.y - PIN_HEIGHT + 'px';
  pinImg.src = ad.author.avatar;
  pinImg.alt = ad.offer.title;

  return pin;
}

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var renderPins = function () {
  var ads = generateAds();

  for (var i = 0; i < ads.length; i++ ) {
    fragment.appendChild(renderPin(ads[i]));
  }

  mapPins.appendChild(fragment);
}

renderPins();
