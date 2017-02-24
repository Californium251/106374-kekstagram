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
var filtersField = document.querySelector('form.filters');
var filters = {
  popular: filtersField.querySelector('[for=filter-discussed]')
};

window.load(picturesUrl, function (evt) {
  var pictures = JSON.parse(evt.target.response);

  function addListener(el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      window.showGallery(pictures, i);
    });
    el.addEventListener('keydown', function (e) {
      if (e.keyCode === ENTER_KEY_CODE) {
        window.showGallery(pictures, i);
      }
    });
  }

  var allPictures = [];
  for (var i = 0; i < pictures.length; i++) {
    onePicture = templateContent.cloneNode(true);
    onePicture.orderNumber = i;
    onePicture.commentsLength = pictures[i].comments.length;
    onePicture.likes = pictures[i].likes;
    onePicture.querySelector('img').setAttribute('src', pictures[i].url);
    onePicture.querySelector('.picture-stat.picture-likes').insertAdjacentHTML('beforeend', pictures[i].likes);
    onePicture.querySelector('.picture-stat.picture-comments').insertAdjacentHTML('beforeend', pictures[i].comments.length);
    onePicture.querySelector('img').setAttribute('tabindex', '0');
    addListener(onePicture.querySelector('img'), i);
    allPictures.push(onePicture);
    picturesContainer.appendChild(onePicture);
  }

  filtersField.classList.remove('hidden');
  filters.popular.addEventListener('click', function () {
    changeOrder(allPictures, picturesContainer);
  });
  function changeOrder(arr, container) {
    arr.sort(function (a, b) {
      return a.commentsLength - b.commentsLength;
    });
    for (var j = 0; j < arr.length; j++) {
      container.appendChild(arr[j]);
    }
  }
});

