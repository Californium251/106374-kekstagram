/**
 * Created by maksimkurepov on 08/02/2017.
 */
'use strict';

window.initializeFlters = function (filterPath, photoElement) {
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

  filterPath.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'INPUT') {
      removeAllFilters(getFilterList(filterPath), photoElement);
      setChosenFilter(evt.target, photoElement);
    }
  });

  filterPath.addEventListener('keydown', function (evt) {
    if (evt.target.tagName === 'LABEL' && evt.keyCode === ENTER_KEY_CODE) {
      removeAllFilters(getFilterList(filterPath), photoElement);
      setChosenFilter(evt.target, photoElement);
    }
  });
};
