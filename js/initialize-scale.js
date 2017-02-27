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
    var intScaleValue = parseInt(scaleValue.value, 10);
    if (buttonType === 'inc' && intScaleValue < minAndMax.max) {
      scaleControlValue.value = (intScaleValue + step) + '%';
    }
    if (buttonType === 'dec' && intScaleValue > minAndMax.min) {
      scaleControlValue.value = (intScaleValue - step) + '%';
    }
  }

  return function (scaleField, defaultValue, step, photoPreview, callback) {
    scaleControlValue.value = defaultValue + '%';
    scaleField.addEventListener('click', function (evt) {
      if (evt.target.tagName === 'BUTTON') {
        changeScale(getScaleButtonType(evt.target), scaleControlValue, restrinctions, step);
        if (typeof callback === 'function') {
          var parsedScale = parseInt(scaleControlValue.value, 10) / restrinctions.max;
          callback(parsedScale);
        }
      }
    });
  };
})();
