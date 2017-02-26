/**
 * Created by maksimkurepov on 09/02/2017.
 */

'use strict';

window.initializeScale = (function () {
  var scaleControlValue = document.querySelector('.upload-resize-controls-value');
  var restrinctions = {
    min: 25,
    max: 100
  };

  function getScaleButtonType(button) {
    return button.classList.contains('upload-resize-controls-button-inc') ? 'inc' : 'dec';
  }

  function changeScale(buttonType, scaleValue, minAndMax, step) {
    if (buttonType === 'inc' && parseInt(scaleValue.value, 10) < minAndMax.max) {
      scaleControlValue.value = (parseInt(scaleValue.value, 10) + step) + '%';
    }
    if (buttonType === 'dec' && parseInt(scaleValue.value, 10) > minAndMax.min) {
      scaleControlValue.value = (parseInt(scaleValue.value, 10) - step) + '%';
    }
  }

  return function (scaleField, defaultValue, step, photoPreview, callback) {
    scaleControlValue.value = defaultValue + '%';
    scaleField.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        changeScale(getScaleButtonType(evt.target), scaleControlValue, restrinctions, step);
        if (typeof callback === 'function') {
          var parsedScale = parseInt(scaleControlValue.value, 10) / 100;
          callback(parsedScale);
        }
      }
    });
  };
})();
