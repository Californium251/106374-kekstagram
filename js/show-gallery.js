/**
 * Created by maksimkurepov on 22/02/2017.
 */
'use strict';

window.showGallery = (function () {
  var ENTER_KEY_CODE = 13;
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryImg = galleryOverlay.querySelector('.gallery-overlay-image');
  var galleryLikes = galleryOverlay.querySelector('.likes-count');
  var galleryComments = galleryOverlay.querySelector('.comments-count');
  var galleryCloseButton = galleryOverlay.querySelector('.gallery-overlay-close');

  return function (pictures, i) {
    var picture = pictures[i];
    galleryOverlay.classList.remove('invisible');
    galleryImg.setAttribute('src', picture.url);
    galleryLikes.innerHTML = picture.likes;
    galleryComments.innerHTML = picture.comments.length;
    galleryCloseButton.focus();
    galleryCloseButton.addEventListener('click', function () {
      galleryOverlay.classList.add('invisible');
    });
    galleryCloseButton.addEventListener('keydown', function (e) {
      if (e.keyCode === ENTER_KEY_CODE) {
        galleryOverlay.classList.add('invisible');
      }
    });
  };
})();
