/**
 * Created by maksimkurepov on 26/01/2017.
 */
'use strict';

//Объявляем переменные
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
var scaleField = {
  htmlNode: document.querySelector('fieldset.upload-resize-controls'),
  buttons: function() {
    return this.htmlNode.querySelectorAll('button.upload-resize-control');
  },
  valueWindow: function() {
    return this.htmlNode.querySelector('.upload-resize-controls-value');
  },
  restrictions: {
    min: 0,
    max: 100,
    step: 25
  }
};

var filterList = getListOfFilters(filters.inputs);

//функция, которая изменяет значение окошка с масштабом
function changeScaleValue(valueField, opsType, min, max, step) {
  var numericFieldValue = parseInt(valueField.value);
  if (opsType === 'dec' && (numericFieldValue - step) >= min) {
    valueField.value = (numericFieldValue - step) + '%';
  }
  if (opsType === 'inc' && (numericFieldValue + step) <= max) {
    valueField.value = (numericFieldValue + step) + '%';
  }
}

function checkTagName(tagName, properTagName) {
  if (tagName === properTagName) return true;
  else return false
}

//функция, изменяющая масштаб фото
function changeScale(photo, scaleVal) {
  photo.style.transform = 'scale(' + parseInt(scaleVal) / 100 + ')';
}

//функция, которая используется, чтобы скрыть одну форму и показать другую
function showAndHide(whatToBeShown, whatToBeHidden) {
  whatToBeShown.classList.remove('invisible');
  whatToBeHidden.classList.add('invisible');
}

//функция, чтобы получить значение стиля из input'а
function getFilterClass(htmlNode) {
  if (checkTagName(htmlNode.tagName, 'INPUT')) {
    return FILTER_PREFIX + htmlNode.value;
  }
  if (checkTagName(htmlNode.tagName, 'LABEL')) {
    var appropriateInput = document.getElementById(htmlNode.getAttribute('FOR'));
    return FILTER_PREFIX + appropriateInput.value;
  }
}

//функция, которая получает список стилей, чтобы далее снять их у фото, прежде чем добавлять очередной
function getListOfFilters(filters) {
  var filtersArr = [];
  for (var i = 0; i < filters.length; i++) {
    filtersArr.push(getFilterClass(filters[i]));
  }
  return filtersArr;
}

//функция, которая непосредственно переключает фильтр
function changeFilter(filterName, filterList, mainPhoto) {
  for (var i = 0; i < filterList.length; i++) {
    if (mainPhoto.classList.contains(filterList[i])) {
      mainPhoto.classList.remove(filterList[i]);
    }
    mainPhoto.classList.add(filterName);
  }
}

//функция проверки кода кнопки
function checkPressedKey(evtKey, properKey) {
  if (evtKey === properKey) return true;
  else return false;
}

uploadPhotoInput.addEventListener('change', function() {
  showAndHide(uploadOverlay, uploadForm);
});

uploadFormCancel.addEventListener('click', function() {
  uploadPhotoInput.value = "";
  showAndHide(uploadForm, uploadOverlay);
});

allFilters.addEventListener('click', function(evt) {
  if (checkTagName(htmlNode.tagName, 'INPUT')) {
    changeFilter(getFilterClass(evt.target), filterList, photoPreview)
  }
});

allFilters.addEventListener('keydown', function(evt) {
  if (checkPressedKey(evt.target, ENTER_KEY_CODE)) {
    changeFilter(getFilterClass(evt.target), filterList, photoPreview)
  }
});

scaleField.htmlNode.addEventListener('click', function (evt) {
  if (checkTagName(htmlNode.tagName, 'BUTTON')) {
    var decOrInc = evt.target.classList.contains('upload-resize-controls-button-dec') ? 'dec' : 'inc';
    changeScaleValue(scaleField.valueWindow(), decOrInc, scaleField.restrictions.min, scaleField.restrictions.max, scaleField.restrictions.step);
    changeScale(photoPreview, scaleField.valueWindow().value);
  }
});
