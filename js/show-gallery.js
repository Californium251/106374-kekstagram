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
  var galleryCloseBtn = galleryOverlay.querySelector('.gallery-overlay-close');
  return function (pictures, i) {
    galleryOverlay.classList.remove('invisible');
    galleryImg.setAttribute('src', pictures[i].url);
    galleryLikes.innerHTML = pictures[i].likes;
    galleryComments.innerHTML = pictures[i].comments.length;
    galleryCloseBtn.focus();
    galleryCloseBtn.addEventListener('click', function () {
      galleryOverlay.classList.add('invisible');
    });
    galleryCloseBtn.addEventListener('keydown', function (e) {
      if (e.keyCode === ENTER_KEY_CODE) {
        galleryOverlay.classList.add('invisible');
      }
    })
  };
})();
