'use strict';

(function () {
  window.data = {
    titles: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    types: [
      'palace',
      'flat',
      'house',
      'bungalo'
    ],
    times: [
      '12:00',
      '13:00',
      '14:00'
    ],
    features: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ],
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
    }
  };
})();
