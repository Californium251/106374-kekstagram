/**
 * Created by maksimkurepov on 21/02/2017.
 */
'use strict';

(function () {
  var ENTER_KEY_CODE = 13;
  var picturesContainer = document.querySelector('.pictures.container');
  var template = document.querySelector('template');
  var templateContent = 'content' in template ? template.content : template;
  var pictureTemplate = templateContent.querySelector('a');
  var picturesUrl = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var filtersField = document.querySelector('form.filters');
  var pictureArray = [];
  var filters = {
    popular: filtersField.querySelector('[for=filter-popular]'),
    new: filtersField.querySelector('[for=filter-new]'),
    discussed: filtersField.querySelector('[for=filter-discussed]')
  };
  var i;

  window.load(picturesUrl, function (pictures) {
    var picturesArrayLength = pictures.length;

    function addListener(el, j) {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        window.showGallery(pictures, j);
      });
      el.addEventListener('keydown', function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
          window.showGallery(pictures, j);
        }
      });
    }

    for (i = 0; i < picturesArrayLength; i++) {
      var pictureFrameCommentsLength = pictures[i].comments.length;
      var pictureFrame = pictureTemplate.cloneNode(true);
      pictureFrame.orderNumber = i;
      pictureFrame.commentsLength = pictureFrameCommentsLength;
      pictureFrame.likes = pictures[i].likes;
      pictureFrame.querySelector('img').setAttribute('src', pictures[i].url);
      pictureFrame.querySelector('.picture-stat.picture-likes').insertAdjacentHTML('beforeend', pictures[i].likes);
      pictureFrame.querySelector('.picture-stat.picture-comments').insertAdjacentHTML('beforeend', pictureFrameCommentsLength);
      pictureArray.push(pictureFrame);
      addListener(pictureFrame, i);
      picturesContainer.appendChild(pictureFrame);
    }

    filtersField.classList.remove('hidden');
    filters.popular.addEventListener('click', function () {
      window.changePhotoOrder(pictureArray, 'popular', picturesContainer);
    });
    filters.new.addEventListener('click', function () {
      window.changePhotoOrder(pictureArray, 'new', picturesContainer);
    });
    filters.discussed.addEventListener('click', function () {
      window.changePhotoOrder(pictureArray, 'discussed', picturesContainer);
    });
    filters.popular.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        window.changePhotoOrder(pictureArray, 'popular', picturesContainer);
      }
    });
    filters.new.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        window.changePhotoOrder(pictureArray, 'new', picturesContainer);
      }
    });
    filters.discussed.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        window.changePhotoOrder(pictureArray, 'discussed', picturesContainer);
      }
    });
  });
})();
