/**
 * Created by maksimkurepov on 21/02/2017.
 */
'use strict';

window.load = (function () {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', onLoad);
    xhr.send();
  };
})();
