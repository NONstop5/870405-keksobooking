'use strict';

(function () {
  var showSaccessMessage = function () {
    var saccessMessageTemplate = document.querySelector('#success').content.querySelector('div');
    var saccessMessageElem = saccessMessageTemplate.cloneNode(true);
    window.map.mapElem.appendChild(saccessMessageElem);
  };


  var showErrorMessage = function (message) {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('div');
    var errorMessageElem = errorMessageTemplate.cloneNode(true);
    errorMessageElem.firstElementChild.textContent = message;
    window.map.mapElem.appendChild(errorMessageElem);

    adderrorMessageEvent(errorMessageElem);
  };

  var adderrorMessageEvent = function (errorMessageElem) {
    errorMessageElem.addEventListener('click', function () {
      errorMessageElem.style = 'display: none;';
      window.mainPin.startWork();
    });
  };


  window.messages = {
    showSaccessMessage: showSaccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
