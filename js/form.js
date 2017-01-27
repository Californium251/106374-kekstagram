/**
 * Created by maksimkurepov on 26/01/2017.
 */
'use strict';

var uploadForm = {
  htmlNode: document.querySelector('#upload-select-image'),
  uploadfile: function() {
    return this.htmlNode.querySelector('#upload-file')
  }
};
var overlayForm = {
  self: function() {
    return this
  },
  htmlNode: document.querySelector('.upload-overlay'),
  cancelBtn: function() {
    return this.htmlNode.querySelector('.upload-form-cancel')
  },
  filters: {
    field: document.querySelector('.upload-filter-controls'),
  },
  mainPhoto: function() {
    return this.htmlNode.querySelector('.upload-form-preview');
  },
  setResize: function(self) {
    var resizeObj = {};
    resizeObj.htmlNode = self.htmlNode.querySelector('fieldset.upload-resize-controls');
    resizeObj.buttons = self.htmlNode.querySelectorAll('button.upload-resize-control');
    resizeObj.input = self.htmlNode.querySelector('input.upload-resize-control');
    resizeObj.min = 0;
    resizeObj.max = 100;
    self.resize = resizeObj;
  },
  resize: {}
};

overlayForm.setResize(overlayForm.self());
overlayForm.resize.input.value = '100%';

function toNumber(string) {
  return string.substring(0, string.length - 1)
}

function changeInputValue(resizeObj, opsType) {
  var inputValue = toNumber(resizeObj.input.value);
  if ((opsType === '+') && (+inputValue + +25 <= resizeObj.max)) {
    inputValue = +inputValue + 25;
    resizeObj.input.value = inputValue + '%';
  }
  if ((opsType === '-') && (+inputValue - +25 >= resizeObj.min)) {
    inputValue -= +25;
    resizeObj.input.value = inputValue + '%';
  }
}

function changeViewedForm (form1, form2) {
  form1.classList.toggle('invisible');
  form2.classList.toggle('invisible');
}

function changeFilter(filterList, chosenFilter, photo) {
  for (var i = 0; i < filterList.length; i++) {
    if (photo.classList.contains(filterList[i]) + "") {
      photo.classList.remove(filterList[i]) + "";
    }
  }
  photo.classList.add(chosenFilter);
}

function changePhotoScale(input, photo) {
  photo.cssText = 'transform: scale(' + toNumber(input.value) / 100 + ')';
}

function createClassForPreview (id) {
  return id.substring(7);
}

function createClassList (arrOfInputs) {
  var classArr = [];
  for (var i = 0; i < arrOfInputs.length; i++) {
    classArr.push(createClassForPreview(arrOfInputs[i].id))
  }
  return classArr;
}

overlayForm.filters.field.addEventListener('click', function(evt) {
  if (evt.target.tagName == 'INPUT') {
    changeFilter(createClassList(this.querySelectorAll('input')), createClassForPreview(evt.target.id), overlayForm.mainPhoto())
  }
})

uploadForm.uploadfile().addEventListener('change', function() {
  if (!(uploadForm.htmlNode.classList.contains('invisible')) && (overlayForm.htmlNode.classList.contains('invisible'))) {
    changeViewedForm(uploadForm.htmlNode, overlayForm.htmlNode)
  }
})
overlayForm.cancelBtn().addEventListener('click', function() {

  if ((uploadForm.htmlNode.classList.contains('invisible')) && (!(overlayForm.htmlNode.classList.contains('invisible')))) {
    uploadForm.uploadfile().value = ""; /*
      Была проблема:
      1) Выбираем файл
      2) Закрываем поле кадрирования
      3) Выбираем тот же самый файл.
      И тут поле кадрирования не открывалось. Чтобы оно открылось снова, я добавил эту строчку
    */
    changeViewedForm(uploadForm.htmlNode, overlayForm.htmlNode)
  }
});

overlayForm.resize.htmlNode.addEventListener('click', function(evt) {
  if (evt.target.tagName != 'BUTTON') return;
  var opsType;
  if (evt.target.classList.contains('upload-resize-controls-button-dec')) opsType = '-';
  if (evt.target.classList.contains('upload-resize-controls-button-inc')) opsType = '+';
  changeInputValue(overlayForm.resize, opsType);
  changePhotoScale(overlayForm.resize.input, overlayForm.mainPhoto().querySelector('img'));
});
