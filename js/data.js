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

  var offerTypeRusValues = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var housingTypeMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  window.data = {
    offerTypeRusValues: offerTypeRusValues,
    housingTypeMinPrice: housingTypeMinPrice,
    getRemoteData: getRemoteData
  };

})();
