/**
 * Created by maksimkurepov on 21/02/2017.
 */
'use strict';

(function () {
  var ENTER_KEY_CODE = 13;
  var i;
  var picturesContainer = document.querySelector('.pictures.container');
  var template = document.querySelector('template');
  var templateContent = 'content' in template ? template.content : template;
  var picturesUrl = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var filtersField = document.querySelector('form.filters');
  var pictureArray = [];
  var filters = {
    popular: filtersField.querySelector('[for=filter-popular]'),
    new: filtersField.querySelector('[for=filter-new]'),
    discussed: filtersField.querySelector('[for=filter-discussed]')
  };

  window.load(picturesUrl, function (evt) {
    var pictures = JSON.parse(evt.target.response);

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

    for (i = 0; i < pictures.length; i++) {
      var pictureFrame = templateContent.querySelector('a').cloneNode(true);
      var pictureFrameCommentsLength = pictures[i].comments.length;
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
      changePhotoOrder(pictureArray, 'popular', picturesContainer);
    });
    filters.new.addEventListener('click', function () {
      changePhotoOrder(pictureArray, 'new', picturesContainer);
    });
    filters.discussed.addEventListener('click', function () {
      changePhotoOrder(pictureArray, 'discussed', picturesContainer);
    });

    function changePhotoOrder(photoArray, filter, container) {
      var arrayForSort = photoArray.slice(0, photoArray.length);
      arrayForSort.sort(function (a, b) {
        var sortOrder;
        switch (filter) {
          case 'popular':
            sortOrder = a.orderNumber - b.orderNumber;
            break;
          case 'new':
            sortOrder = Math.random() - 0.5;
            break;
          case 'discussed':
            sortOrder = b.commentsLength - a.commentsLength;
            break;
          default:
            sortOrder = 1;
        }
        return sortOrder;
      });
      var numberOfPictures = filter === 'new' ? 10 : photoArray.length;
      for (i = 0; i < arrayForSort.length; i++) {
        if (i < numberOfPictures) {
          container.appendChild(arrayForSort[i]);
        } else {
          container.removeChild(arrayForSort[i]);
        }
      }
    }
  });
})();
