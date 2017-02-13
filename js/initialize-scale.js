/**
 * Created by maksimkurepov on 09/02/2017.
 */

'use strict';

window.createScale = (function () {
  var scaleVal = document.querySelector('.upload-resize-controls-value');
  var restrinctions = {
    min: 0,
    max: 100,
    step: 25
  };

  function getScaleBtnType(btn) {
    return btn.classList.contains('upload-resize-controls-button-inc') ? 'inc' : 'dec';
  }

  function changeScale(btnType, mainPhoto, scaleValue, minMaxAndStep) {
    if (btnType === 'inc' && parseInt(scaleValue.value, 10) < minMaxAndStep.max) {
      scaleVal.value = (parseInt(scaleValue.value, 10) + minMaxAndStep.step) + '%';
    }
    if (btnType === 'dec' && parseInt(scaleValue.value, 10) > minMaxAndStep.min) {
      scaleVal.value = (parseInt(scaleValue.value, 10) - minMaxAndStep.step) + '%';
    }
    mainPhoto.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
  }

  function addListeners(evt, photoElem, scaleValue, conditions) {
    if (evt.target.tagName === 'BUTTON') {
      changeScale(getScaleBtnType(evt.target), photoElem, scaleValue, conditions);
    }
  }

  return function (scaleField, photoPreview) {
    scaleField.addEventListener('click', function (evt) {
      addListeners(evt, photoPreview, scaleVal, restrinctions);
    });
  };
})();
