'use strict';

(function () {
  var getRemoteData = function (pinId) {
    var serverUrl = 'https://js.dump.academy/keksobooking/data';

    var onSuccess = function (data) {
      if (pinId) {
        window.popup.createPopupCard(data[pinId]);
      } else {
        window.pins.generateMapPins(data);
      }
    };

    var onError = function (message) {
      window.messages.showErrorMessage(message);
    };

    window.backend.getDataFromServer(serverUrl, onSuccess, onError);
  };

  window.data = {
    getRemoteData: getRemoteData
  };

})();
