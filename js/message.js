'use strict';

(function () {
  var closeMessage = function () {
    var success = document.querySelector('.success');
    var error = document.querySelector('.error');
    if (success) {
      success.remove();
    } else if (error) {
      error.remove();
    }
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', closeMessage);
  };

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage('.success');
    }
  };

  var renderMessage = function (templateID) {
    var main = document.querySelector('main');
    var messageTemplate = document.querySelector(templateID).content;
    var message = messageTemplate.cloneNode(true);
    main.appendChild(message);
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', closeMessage);
  };

  window.message = {
    renderMessage: renderMessage,
  };
})();
