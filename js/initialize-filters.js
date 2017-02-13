/**
 * Created by maksimkurepov on 08/02/2017.
 */
'use strict';

window.initializeFlters = (function () {
  var ENTER_KEY_CODE = 13;
  function getFilterList(filterNode) {
    var filterNodes = filterNode.querySelectorAll('input');
    var filtersArr = [];

    for (var i = 0; i < filterNodes.length; i++) {
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
    for (var i = 0; i < filterList.length; i++) {
      photoElem.classList.toggle(filterList[i], false);
    }
  }

  function setChosenFilter(chosenFilter, photoElem) {
    photoElem.classList.add(getFilterClass(chosenFilter));
  }

  function removeAndSetNewFilter(evt, filterPath, photoElement) {
    removeAllFilters(getFilterList(filterPath), photoElement);
    setChosenFilter(evt.target, photoElement);
  }

  function changeFilterOnClick(evt, filterPath, photoElement) {
    if (evt.target.tagName === 'INPUT') {
      removeAndSetNewFilter(evt, filterPath, photoElement);
    }
  }

  function changeFilterOnKeyDown(evt, filterPath, photoElement) {
    if (evt.target.tagName === 'LABEL' && evt.keyCode === ENTER_KEY_CODE) {
      removeAndSetNewFilter(evt, filterPath, photoElement);
      removeAndSetNewFilter(evt, filterPath, photoElement);
    }
  }

  return function (filterPath, photoElement) {
    filterPath.addEventListener('click', function (evt) {
      changeFilterOnClick(evt, filterPath, photoElement);
    });
    filterPath.addEventListener('keydown', function (evt) {
      changeFilterOnKeyDown(evt, filterPath, photoElement);
    });
  };
})();
