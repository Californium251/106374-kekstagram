/**
 * Created by maksimkurepov on 09/02/2017.
 */

'use strict';

var scaleVal = document.querySelector('.upload-resize-controls-value');
var restrinctions = {
  min: 0,
  max: 100,
  step: 25
};

function getScaleBtnType(btn) {
  var btnType = '';
  if (btn.classList.contains('upload-resize-controls-button-inc')) {
    btnType = 'inc';
  } else {
    btnType = 'dec';
  }
  return btnType;
}

function changeScale(btnType, photoElem, scaleValue, minMaxAndStep) {
  if (window.isEqual(btnType, 'inc') && parseInt(scaleValue.value, 10) < minMaxAndStep.max) {
    scaleVal.value = (parseInt(scaleValue.value, 10) + minMaxAndStep.step) + '%';
  }
  if (window.isEqual(btnType, 'dec') && parseInt(scaleValue.value, 10) > minMaxAndStep.min) {
    scaleVal.value = (parseInt(scaleValue.value, 10) - minMaxAndStep.step) + '%';
  }
  photoElem.style.transform = 'scale(' + parseInt(scaleValue.value, 10) / 100 + ')';
}

function initializeScale(scaleField, photoElem) {
  scaleField.addEventListener('click', function (evt) {
    if (window.isEqual(evt.target.tagName, 'BUTTON')) {
      changeScale(getScaleBtnType(evt.target), photoElem, scaleVal, restrinctions);
    }
  });
}
