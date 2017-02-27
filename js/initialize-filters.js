/**
 * Created by maksimkurepov on 08/02/2017.
 */
'use strict';

window.initializeFilters = (function () {
  var ENTER_KEY_CODE = 13;
  var i;
  var filterLevel = document.querySelector('.upload-filter-level');
  var filterLevelPin = filterLevel.querySelector('.upload-filter-level-pin');

  function getFilterList(filterNode) {
    var filterNodes = filterNode.querySelectorAll('input');
    var filterNodesLength = filterNodes.length;
    var filtersArr = [];

    for (i = 0; i < filterNodesLength; i++) {
      filtersArr.push(getFilterClass(filterNodes[i]));
    }
    return filtersArr;
  }

  function getFilterClass(htmlNode) {
    var whatIsToBeReturned = '';

    var FILTER_PREFIX = 'filter-';
    if (htmlNode.tagName === 'INPUT') {
      whatIsToBeReturned = FILTER_PREFIX + htmlNode.value;
    } else if (htmlNode.tagName === 'LABEL') {
      var appropriateInput = document.getElementById(htmlNode.getAttribute('for'));
      whatIsToBeReturned = FILTER_PREFIX + appropriateInput.value;
    }
    return whatIsToBeReturned;
  }

  function removeAllFilters(filterList, photoElem) {
    var filterListLength = filterList.length;
    for (i = 0; i < filterListLength; i++) {
      photoElem.classList.toggle(filterList[i], false);
    }
  }

  function removeAndSetNewFilter(evt, filterPath, photoElement, callback) {
    removeAllFilters(getFilterList(filterPath), photoElement);
    if (typeof callback === 'function') {
      var currentFilter = getFilterClass(evt.target);
      if (currentFilter === 'filter-none') {
        filterLevel.classList.toggle('invisible', true);
      } else {
        filterLevel.classList.toggle('invisible', false);
      }

      callback(currentFilter);
    }
  }

  function changeFilterOnClick(evt, filterPath, photoElement, callback) {
    if (evt.target.tagName === 'INPUT') {
      removeAndSetNewFilter(evt, filterPath, photoElement, callback);
    }
  }

  function changeFilterOnKeyDown(evt, filterPath, photoElement, callback) {
    if (evt.target.tagName === 'LABEL' && evt.keyCode === ENTER_KEY_CODE) {
      removeAndSetNewFilter(evt, filterPath, photoElement, callback);
    }
  }

  return function (filterPath, photoElement, callback) {
    filterLevelPin.addEventListener('mouseDown', function (downEvt) {
      downEvt.preventDefault();

      var startPoint = downEvt.clientX;

      document.addEventListener('mouseMove', function (mouseEvt) {
        mouseEvt.preventDefault();

        var shift = startPoint - mouseEvt.clientX;
        filterLevelPin.style.left -= shift + 'px';
      });
    });
    filterPath.addEventListener('click', function (evt) {
      changeFilterOnClick(evt, filterPath, photoElement, callback);
    });
    filterPath.addEventListener('keydown', function (evt) {
      changeFilterOnKeyDown(evt, filterPath, photoElement, callback);
    });
  };
})();
