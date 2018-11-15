'use strict';

var AVATAR_EXTENSION = '.png';
var AVATAR_PATH = 'img/avatars/';

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

// Функция создает массив объектов объявлений
var createAds = function () {
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
  var result = [];

  for (var i = 0; i < 8; i++) {
    var ad = {
      author: {
        avatar: AVATAR_PATH + 'user0' + (i + 1) + AVATAR_EXTENSION // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },
      offer: {
        title: titles[i], // строка, заголовок предложения, одно из фиксированных значений. Значения не должны повторяться.
        address: getRandomValueRange(0, 1000) + ', ' + getRandomValueRange(0, 1000), // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        price: getRandomValueRange(1000, 1000000), // число, случайная цена от 1000 до 1000000
        type: types[getRandomValueRange(0, 3)], // строка с одним из четырёх фиксированных значений:
        rooms: getRandomValueRange(1, 5), // число, случайное количество комнат от 1 до 5
        guests: getRandomValueRange(1, 10), // число, случайное количество гостей, которое можно разместить
        checkin: times[getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        checkout: times[getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: features.slice(getRandomValueRange(1, features.length - 1)), // массив строк случайной длины из ниже предложенных:
        description: '', // пустая строка
        photos: shuffleArray(photos) // массив из строк ... расположенных в произвольном порядке
      },
      location: {
        x: getRandomValueRange(1, 1000), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        y: getRandomValueRange(130, 630) // случайное число, координата y метки на карте от 130 до 630.
      }
    };
    result.push(ad);
  }

  return result;
};

// Функция создает метку объявления
var createMapPinElement = function (mapPinTemplate, adObj) {
  var mapPinElem = mapPinTemplate.cloneNode(true);
  var pinImg = mapPinElem.querySelector('img');

  mapPinElem.style = 'left: ' + adObj.location.x + 'px; top: ' + adObj.location.y + 'px;';
  pinImg.src = adObj.author.avatar;
  pinImg.alt = adObj.offer.title;

  return mapPinElem;
};

// Функция содает метки объявлений на карте
var generateMapPins = function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');
  var mapPinsFragment = document.createDocumentFragment();

  ads.forEach(function (adObj) {
    var mapPinElement = createMapPinElement(mapPinTemplate, adObj);
    mapPinsFragment.appendChild(mapPinElement);
  });

  mapPinsElem.appendChild(mapPinsFragment);
};

var mapPinsElem = document.querySelector('.map__pins');

var ads = createAds();

generateMapPins();
