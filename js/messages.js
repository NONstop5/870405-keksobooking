'use strict';

(function () {
  // Показываем сообщение об удачной отправке формы
  var showSaccessMessage = function () {
    var saccessMessageElem = saccessMessageTemplate.cloneNode(true);
    window.map.mapElem.appendChild(saccessMessageElem);

    addSaccessMessageEvent(saccessMessageElem);
  };

  // Показываем сообщение об ошибке
  var showErrorMessage = function (message) {
    var errorMessageElem = errorMessageTemplate.cloneNode(true);
    errorMessageElem.firstElementChild.textContent = message;
    window.map.mapElem.appendChild(errorMessageElem);

    addErrorMessageEvent(errorMessageElem);
  };

  // Навешиваем собитие на сообщение об ошибке
  var addErrorMessageEvent = function (errorMessageElem) {
    var errorMessageButton = errorMessageElem.lastElementChild;
    errorMessageButton.addEventListener('click', function () {
      window.map.mapElem.removeChild(errorMessageElem);
    });
  };

  // Навешиваем собитие на сообщение об удачной отправке формы
  var addSaccessMessageEvent = function (saccessMessageElem) {
    saccessMessageElem.addEventListener('click', function () {
      window.map.mapElem.removeChild(saccessMessageElem);
    });
  };

  var saccessMessageTemplate = document.querySelector('#success').content.querySelector('div');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('div');

  window.messages = {
    showSaccessMessage: showSaccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
