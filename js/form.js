/**
 * Created by maksimkurepov on 26/01/2017.
 */
'use strict';

var ENTER_KEY_CODE = 13;
var FILTER_PREFIX = 'filter-';
var uploadForm = document.querySelector('.upload-form');
var uploadPhotoInput = document.getElementById('upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var allFilters = document.querySelector('.upload-filter-controls');
var filters = {
  inputs: document.querySelectorAll('[name = upload-filter]'),
  labels: document.querySelectorAll('.upload-filter-label')
};
var photoPreview = document.querySelector('img.filter-image-preview');
var scaleField = document.querySelector('fieldset.upload-resize-controls');
var scaleValueWindow = scaleField.querySelector('.upload-resize-controls-value');
var restrictions = {
  min: 0,
  max: 100,
  step: 25
};

var filterList = getListOfFilters(filters.inputs);

function changeScaleValue(valueField, opsType, min, max, step) {
  var numericFieldValue = parseInt(valueField.value, 10);
  if (opsType === 'dec' && (numericFieldValue - step) >= min) {
    valueField.value = (numericFieldValue - step) + '%';
  }
  if (opsType === 'inc' && (numericFieldValue + step) <= max) {
    valueField.value = (numericFieldValue + step) + '%';
  }
}

function isEqual(param1, param2) {
  return param1 === param2;
}

function changeScale(photo, scaleVal) {
  photo.style.transform = 'scale(' + parseInt(scaleVal, 10) / 100 + ')';
}

function showAndHide(whatToBeShown, whatToBeHidden) {
  whatToBeShown.classList.remove('invisible');
  whatToBeHidden.classList.add('invisible');
}

function getFilterClass(htmlNode) {
  var whatToBeReturned = '';
  if (isEqual(htmlNode.tagName, 'INPUT')) {
    whatToBeReturned = FILTER_PREFIX + htmlNode.value;
  }
  if (isEqual(htmlNode.tagName, 'LABEL')) {
    var appropriateInput = document.getElementById(htmlNode.getAttribute('FOR'));
    whatToBeReturned = FILTER_PREFIX + appropriateInput.value;
  }
  return whatToBeReturned;
}

function getListOfFilters(filtersToBeListed) {
  var filtersArr = [];
  for (var i = 0; i < filtersToBeListed.length; i++) {
    filtersArr.push(getFilterClass(filtersToBeListed[i]));
  }
  return filtersArr;
}

function changeFilter(filterName, listOfFilters, mainPhoto, selectedFilter, filtersInputs) {
  for (var i = 0; i < listOfFilters.length; i++) {
    if (mainPhoto.classList.contains(listOfFilters[i])) {
      mainPhoto.classList.remove(listOfFilters[i]);
    }
    mainPhoto.classList.add(filterName);
    filtersInputs[i].setAttribute('aria-pressed', 'false');
  }
  selectedFilter.setAttribute('aria-pressed', 'true');
}

uploadPhotoInput.addEventListener('change', function () {
  showAndHide(uploadOverlay, uploadForm);
});

uploadFormCancel.addEventListener('click', function () {
  uploadPhotoInput.value = '';
  showAndHide(uploadForm, uploadOverlay);
});

allFilters.addEventListener('click', function (evt) {
  if (isEqual(evt.target.tagName, 'INPUT')) {
    changeFilter(getFilterClass(evt.target), filterList, photoPreview, evt.target, filters.inputs);
  }
});

allFilters.addEventListener('keydown', function (evt) {
  if (isEqual(evt.keyCode, ENTER_KEY_CODE)) {
    changeFilter(getFilterClass(evt.target), filterList, photoPreview, evt.target, filters.inputs);
  }
});

scaleField.addEventListener('click', function (evt) {
  if (isEqual(evt.target.tagName, 'BUTTON')) {
    var decOrInc = evt.target.classList.contains('upload-resize-controls-button-dec') ? 'dec' : 'inc';
    changeScaleValue(scaleValueWindow, decOrInc, restrictions.min, restrictions.max, restrictions.step);
    changeScale(photoPreview, scaleValueWindow.value);
  }
});
