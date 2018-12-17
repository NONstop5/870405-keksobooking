'use strict';

(function () {
  var mapPinsElem = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  window.data = {
    mapPinsElem: mapPinsElem,
    mapPinMain: mapPinsElem.querySelector('.map__pin--main'),
    map: map,
    adFormElem: document.querySelector('.ad-form'),
    mapPinTemplate: document.querySelector('#pin').content.querySelector('button'),
    filterFormChildNodes: document.querySelectorAll('.map__filters > *'),
    adFormChildNodes: document.querySelectorAll('.ad-form > *'),
    pricePerNightElem: document.querySelector('#price'),
    housingTypeElem: document.querySelector('#type'),
    timeInElem: document.querySelector('#timein'),
    timeOutElem: document.querySelector('#timeout'),
    roomNumberElem: document.querySelector('#room_number'),
    capacityElem: document.querySelector('#capacity'),
    offerTypeRusValues: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    housingTypeMinPrice: {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    },

    AVATAR_EXTENSION: '.png',
    AVATAR_PATH: 'img/avatars/',
    PIN_MAIN_SIZE: 65,
    PIN_SIZE: 50,
    PIN_ARROW_MIN_CORDS_X: 0,
    PIN_ARROW_MAX_CORDS_X: map.clientWidth,
    PIN_ARROW_MIN_CORDS_Y: 130,
    PIN_ARROW_MAX_CORDS_Y: 630
  };
})();
