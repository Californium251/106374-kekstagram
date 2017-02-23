/**
 * Created by maksimkurepov on 21/02/2017.
 */
'use strict';

var ENTER_KEY_CODE = 13;
var picturesContainer = document.querySelector('.pictures.container');
var template = document.querySelector('template');
var templateContent = 'content' in template ? template.content : template;
var picturesUrl = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
var onePicture;
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayImage = galleryOverlay.querySelector('img');
var galleryComments = galleryOverlay.querySelector('.comments-count');
var galleryLikes = galleryOverlay.querySelector('.likes-count');

window.load(picturesUrl, function (evt) {
  var pictures = JSON.parse(evt.target.response);
  function addListener(el, i) {
    function listenerFunction(e) {
      e.preventDefault();
      galleryOverlay.classList.remove('invisible');
      galleryOverlayImage.setAttribute('src', pictures[i].url);
      galleryComments.innerHTML = pictures[i].comments.length;
      galleryLikes.innerHTML = pictures[i].likes;
    }
    el.addEventListener('keydown', function(evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        listenerFunction(evt);
      }
    });
    el.addEventListener('click', listenerFunction);
  }

  for (var i = 0; i < pictures.length; i++) {
    onePicture = templateContent.cloneNode(true);
    onePicture.querySelector('img').setAttribute('src', pictures[i].url);
    onePicture.querySelector('.picture-stat.picture-likes').insertAdjacentHTML('beforeend', pictures[i].likes);
    onePicture.querySelector('.picture-stat.picture-comments').insertAdjacentHTML('beforeend', pictures[i].comments.length);
    onePicture.querySelector('img').setAttribute('tabindex', '0');
    addListener(onePicture.querySelector('img'), i);
    picturesContainer.appendChild(onePicture);
  }
});

