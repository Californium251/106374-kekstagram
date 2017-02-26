/**
 * Created by maksimkurepov on 26/02/2017.
 */
'use strict';

window.changePhotoOrder = (function () {
  return function (photoArray, filter, container) {
    var arrayForSort = photoArray.slice(0, photoArray.length);
    var arrayForSortLength = arrayForSort.length;
    var numberOfPictures = filter === 'new' ? 10 : photoArray.length;
    var i;

    arrayForSort.sort(function (prevPhoto, nextPhoto) {
      var sortOrder;

      switch (filter) {
        case 'popular':
          sortOrder = prevPhoto.orderNumber - nextPhoto.orderNumber;
          break;
        case 'new':
          sortOrder = Math.random() - 0.5;
          break;
        case 'discussed':
          sortOrder = nextPhoto.commentsLength - prevPhoto.commentsLength;
          break;
        default:
          sortOrder = 1;
      }
      return sortOrder;
    });

    for (i = 0; i < arrayForSortLength; i++) {
      if (i < numberOfPictures) {
        container.appendChild(arrayForSort[i]);
      } else if (container.contains(arrayForSort[i])) {
        container.removeChild(arrayForSort[i]);
      }
    }
  };
})();
