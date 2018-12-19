'use strict';

(function () {
  // Функция создает массив объектов объявлений
  var createAds = function () {
    var result = [];

    for (var i = 0; i < 8; i++) {
      var locationPinX = window.functions.getRandomValueRange(PIN_ARROW_MIN_CORDS_X, PIN_ARROW_MAX_CORDS_X);
      var locationPinY = window.functions.getRandomValueRange(PIN_ARROW_MIN_CORDS_Y, PIN_ARROW_MAX_CORDS_Y);
      var ad = {
        id: i,
        author: {
          avatar: AVATAR_PATH + 'user0' + (i + 1) + AVATAR_EXTENSION // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        },
        offer: {
          title: titles[i], // строка, заголовок предложения, одно из фиксированных значений. Значения не должны повторяться.
          address: locationPinX + ', ' + locationPinY, // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
          price: window.functions.getRandomValueRange(1000, 1000000), // число, случайная цена от 1000 до 1000000
          type: types[window.functions.getRandomValueRange(0, 3)], // строка с одним из четырёх фиксированных значений:
          rooms: window.functions.getRandomValueRange(1, 5), // число, случайное количество комнат от 1 до 5
          guests: window.functions.getRandomValueRange(1, 10), // число, случайное количество гостей, которое можно разместить
          checkin: times[window.functions.getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
          checkout: times[window.functions.getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
          features: features.slice(window.functions.getRandomValueRange(0, features.length - 1)), // массив строк случайной длины из ниже предложенных:
          description: '', // пустая строка
          photos: window.functions.shuffleArray(photos) // массив из строк ... расположенных в произвольном порядке
        },
        location: {
          x: locationPinX, // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
          y: locationPinY // случайное число, координата y метки на карте от 130 до 630.
        }
      };
      result.push(ad);
    }

    return result;
  };

  var AVATAR_EXTENSION = '.png';
  var AVATAR_PATH = 'img/avatars/';
  var PIN_ARROW_MIN_CORDS_X = 0;
  var PIN_ARROW_MAX_CORDS_X = 1200;
  var PIN_ARROW_MIN_CORDS_Y = 130;
  var PIN_ARROW_MAX_CORDS_Y = 630;

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var times = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
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
    titles: titles,
    types: types,
    times: times,
    features: features,
    photos: photos,
    offerTypeRusValues: offerTypeRusValues,
    housingTypeMinPrice: housingTypeMinPrice,
    ads: createAds()
  };

})();
