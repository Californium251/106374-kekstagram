/**
 * Created by maksimkurepov on 22/02/2017.
 */
'use strict';

window.showGallery = (function () {
  var pictureOverlay = document.querySelector('.gallery-overlay');
  var mainPicture = pictureOverlay.querySelector('.filter-image-preview');
  return function (pictureSrc) {
    pictureOverlay.classList.remove('invisible');
    mainPicture.setAttribute('src', pictureSrc);
  }
})();
