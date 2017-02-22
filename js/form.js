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
  var changeFormBtn = document.querySelector('label.upload-file');
  var ENTER_KEY_CODE = 13;
  var activeElement;

  function showAndHide(whatToBeShown, whatToBeHidden, callback) {
    whatToBeShown.classList.remove('invisible');
    whatToBeHidden.classList.add('invisible');
    if (typeof callback === 'function') {
      callback();
    }
  }

  changeFormBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      activeElement = document.activeElement;
      changeFormBtn.click();
    }
  });

  uploadPhotoInput.addEventListener('change', function () {
    showAndHide(uploadOverlay, uploadForm);
  });

  uploadFormCancel.addEventListener('click', function () {
    uploadPhotoInput.value = '';
    function callback() {
      if (activeElement) {
        activeElement.focus();
        activeElement = null;
      }
    }
    showAndHide(uploadForm, uploadOverlay, callback);
  });

  function setNewFilter(targetFilter) {
    photoPreview.classList.add(targetFilter);
  }

  function setScale(scaleVal) {
    photoPreview.style.transform = 'scale(' + scaleVal + ')';
  }

  window.initializeFlters(allFilters, photoPreview, setNewFilter);
  window.createScale(scaleField, photoPreview, setScale);
  window.pictures();
})();
