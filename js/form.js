/**
 * Created by maksimkurepov on 26/01/2017.
 */
'use strict';

window.form = (function () {
  var uploadForm = document.querySelector('.upload-form');
  var uploadPhotoInput = document.getElementById('upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var allFilters = document.querySelector('.upload-filter-controls');
  var photoPreview = document.querySelector('img.filter-image-preview');
  var scaleField = document.querySelector('fieldset.upload-resize-controls');

  function showAndHide(whatToBeShown, whatToBeHidden) {
    whatToBeShown.classList.remove('invisible');
    whatToBeHidden.classList.add('invisible');
  }

  uploadPhotoInput.addEventListener('change', function () {
    showAndHide(uploadOverlay, uploadForm);
  });

  uploadFormCancel.addEventListener('click', function () {
    uploadPhotoInput.value = '';
    showAndHide(uploadForm, uploadOverlay);
  });

  window.initializeFlters(allFilters, photoPreview);
  window.createScale(scaleField, photoPreview);
})();

