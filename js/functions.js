'use strict';

(function () {

  // Функция генерации целого случайного числа из заданного диапазона
  var getRandomValueRange = function (minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  };

  // Функция перемешивает и возвращает, изначально, переданный массив
  var shuffleArray = function (array) {
    for (var i = 0; i < array.length; i++) {
      var rndArrIndex = getRandomValueRange(0, array.length - 1);
      var tmpValue = array[i];
      array[i] = array[rndArrIndex];
      array[rndArrIndex] = tmpValue;
    }

    return array;
  };

  // Функция создает новый элемент
  var createNewElement = function (tagName, className, textContent) {
    var newElement = document.createElement(tagName);
    newElement.classList.add(className);
    newElement.textContent = textContent;

    return newElement;
  };

  // Устанавливает доступность полей формы
  var setAvailableFormFields = function (formChildNodes, disabled) {
    formChildNodes.forEach(function (node) {
      node.disabled = disabled;
    });
  };

  window.functions = {
    getRandomValueRange: getRandomValueRange,
    shuffleArray: shuffleArray,
    createNewElement: createNewElement,
    setAvailableFormFields: setAvailableFormFields
  };
})();
