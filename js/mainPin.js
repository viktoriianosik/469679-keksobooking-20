'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var MAP_TOP_COORDINATE = 130;
  var MAP_BOTTOM_COORDINATE = 630;
  var MAP_LEFT_COORDINATE = map.offsetLeft;
  var MAP_RIGHT_COORDINATE = map.offsetLeft + map.offsetWidth;

  var compareCoordinate = function (coordinateX, coordinateY, newCoordianteX, newCoordianteY) {
    if (coordinateX < MAP_LEFT_COORDINATE) {
      mainPin.style.left = -window.start.PIN_WIDTH / 2 + 'px';
    } else if (coordinateX > MAP_RIGHT_COORDINATE) {
      mainPin.style.left = (map.offsetWidth - window.start.PIN_WIDTH / 2) + 'px';
    } else if (coordinateY < MAP_TOP_COORDINATE) {
      mainPin.style.top = MAP_TOP_COORDINATE + 'px';
    } else if (coordinateY > MAP_BOTTOM_COORDINATE) {
      mainPin.style.top = MAP_BOTTOM_COORDINATE + 'px';
    } else {
      mainPin.style.left = newCoordianteX + 'px';
      mainPin.style.top = newCoordianteY + 'px';
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    // Проверка на клик только левой кнопки мыши
    if (evt.button === 0) {

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY,
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;
        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY,
        };
        startCoordinates = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        var newY = mainPin.offsetTop - shift.y;
        var newX = mainPin.offsetLeft - shift.x;
        compareCoordinate(moveEvt.clientX, moveEvt.clientY, newX, newY);
        window.start.setAddressValue(newX, newY, true);
        window.start.setActiveState();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        if (!dragged) {
          window.start.setActiveState();
          window.start.setAddressValue(mainPin.offsetLeft, mainPin.offsetTop, true);
        }
        window.backend.load(window.start.onLoad, window.backend.onError);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
