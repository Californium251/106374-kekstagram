/**
 * Created by maksimkurepov on 21/02/2017.
 */
'use strict';

window.load = (function () {
  var photos = [];
  return function (url, onload) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function (evt) {
      try {
        photos = JSON.parse(evt.target.response);
        if (typeof onload === 'function') {
          onload(photos);
        }
      } catch (err) {}
    });
    xhr.send();
    return photos;
  };
})();
