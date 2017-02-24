/**
 * Created by maksimkurepov on 21/02/2017.
 */
'use strict';

var ENTER_KEY_CODE = 13;
var picturesContainer = document.querySelector('.pictures.container');
var template = document.querySelector('template');
var templateContent = 'content' in template ? template.content : template;
var picturesUrl = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
var filtersField = document.querySelector('form.filters');
var filters = {
  popular: filtersField.querySelector('[for=filter-popular]'),
  new: filtersField.querySelector('[for=filter-new]'),
  discussed: filtersField.querySelector('[for=filter-discussed]')
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
  var pictureArray = [];
  for (var i = 0; i < pictures.length; i++) {
    var pictureFrame = templateContent.querySelector('a').cloneNode(true);
    pictureFrame.orderNumber = i;
    pictureFrame.commentsLength = pictures[i].comments.length;
    pictureFrame.likes = pictures[i].likes;
    pictureFrame.querySelector('img').setAttribute('src', pictures[i].url);
    pictureFrame.querySelector('.picture-stat.picture-likes').insertAdjacentHTML('beforeend', pictures[i].likes);
    pictureFrame.querySelector('.picture-stat.picture-comments').insertAdjacentHTML('beforeend', pictures[i].comments.length);
    pictureArray.push(pictureFrame);
    addListener(pictureFrame, i);
    picturesContainer.appendChild(pictureFrame);
  }
  filtersField.classList.remove('hidden');
  filters.popular.addEventListener('click', function () {
    changeOrderPopular(pictureArray, picturesContainer);
  });
  filters.new.addEventListener('click', function () {
    changeOrderNew(pictureArray, picturesContainer);
  });
  filters.discussed.addEventListener('click', function () {
    changeOrderDiscussed(pictureArray, picturesContainer);
  });
  function changeOrderPopular(arr, container) {
    arr.sort(function (a, b) {
      return a.orderNumber - b.orderNumber;
    });
    for (var k = 0; k < arr.length; k++) {
      container.appendChild(arr[k]);
    }
  }
  function changeOrderNew(arr, container) {
    for (var n = 0; n < arr.length; n++) {
      container.removeChild(arr[n]);
    }
    arr.sort(function (a, b) {
      return Math.random() - 0.5;
    });
    arr = arr.slice(0, 10);
    for (var m = 0; m < arr.length; m++) {
      container.appendChild(arr[m]);
    }
  }
  function changeOrderDiscussed(arr, container) {
    arr.sort(function (a, b) {
      return b.commentsLength - a.commentsLength;
    });
    for (var j = 0; j < arr.length; j++) {
      container.appendChild(arr[j]);
    }
  }
});

