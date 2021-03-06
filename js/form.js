/**
 * Created by maksimkurepov on 26/01/2017.
 */
'use strict';

(function () {
  var uploadForm = document.querySelector('.upload-form');
  var uploadPhotoInput = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var allFilters = document.querySelector('.upload-filter-controls');
  var photoPreview = document.querySelector('img.filter-image-preview');
  var scaleField = document.querySelector('fieldset.upload-resize-controls');
  var defaultScale = 100;
  var scaleStep = 25;
  var changeFormButton = document.querySelector('label.upload-file');
  var ENTER_KEY_CODE = 13;
  var activeElement;

  function showAndHide(whatToBeShown, whatToBeHidden, callback) {
    whatToBeShown.classList.remove('invisible');
    whatToBeHidden.classList.add('invisible');
    if (typeof callback === 'function') {
      callback();
    }
  }

  function setNewFilterCallback(targetFilter) {
    photoPreview.classList.add(targetFilter);
  }

  function setScaleCallback(scaleValue) {
    photoPreview.style.transform = 'scale(' + scaleValue + ')';
  }

  function onCloseAfterKeyboardInitiation() {
    if (activeElement) {
      activeElement.focus();
      activeElement = null;
    }
  }

  changeFormButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      activeElement = document.activeElement;
      changeFormButton.click();
    }
  });

  uploadPhotoInput.addEventListener('change', function () {
    showAndHide(uploadOverlay, uploadForm);
  });

  uploadFormCancel.addEventListener('click', function () {
    uploadPhotoInput.value = '';
    showAndHide(uploadForm, uploadOverlay, onCloseAfterKeyboardInitiation);
  });

  window.initializeFilters(allFilters, photoPreview, setNewFilterCallback);
  window.initializeScale(scaleField, defaultScale, scaleStep, photoPreview, setScaleCallback);
})();
