'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarInput = document.querySelector('.ad-form-header__input');
  var avatarImg = document.querySelector('.ad-form-header__preview img');
  var adsInput = document.querySelector('.ad-form__input');
  var adsImg = document.querySelector('.ad-form__photo');

  var changeImage = function (input, img) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (img.tagName === 'DIV') {
          img.style.background = 'url(' + reader.result + ')';
        } else {
          img.src = reader.result;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  avatarInput.addEventListener('change', function () {
    changeImage(avatarInput, avatarImg);
  });

  adsInput.addEventListener('change', function () {
    changeImage(adsInput, adsImg);
  });
})();

