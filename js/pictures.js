/**
 * Created by maksimkurepov on 21/02/2017.
 */
'use strict';

window.pictures = (function () {
  var picturesContainer = document.querySelector('.pictures.container');
  var template = document.querySelector('template');
  var templateContent = 'content' in template ? template.content : template;
  var picturesUrl = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var onePicture;
  return function () {
    var pictures = window.load(picturesUrl, function (photos) {
      for (var i = 0; i < photos.length; i++) {
        onePicture = templateContent.cloneNode(true);
        onePicture.querySelector('img').setAttribute('src', photos[i].url);
        onePicture.querySelector('.picture-stat.picture-likes').insertAdjacentHTML('beforeend', photos[i].likes);
        onePicture.querySelector('.picture-stat.picture-comments').insertAdjacentHTML('beforeend', photos[i].comments.length);
        picturesContainer.appendChild(onePicture);
        onePicture.addEventListener('click', function (evt) {
          window.showGallery(photos[0].url);
        });
      }
    });
    return pictures;
  };
})();
