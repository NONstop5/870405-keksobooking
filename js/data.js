'use strict';

(function () {
  var getRemoteData = function () {
    var serverUrl = 'https://js.dump.academy/keksobooking/data';

    var onSuccess = function (data) {
      window.pins.generateMapPins(data);
    };

    var onError = function (message) {
      console.error(message);
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
