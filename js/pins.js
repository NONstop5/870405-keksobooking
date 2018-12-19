'use strict';

(function () {
  // Функция создает массив объектов объявлений
  var createAds = function () {
    var result = [];

    for (var i = 0; i < 8; i++) {
      var locationPinX = window.functions.getRandomValueRange(PIN_ARROW_MIN_CORDS_X, PIN_ARROW_MAX_CORDS_X - PIN_SIZE);
      var locationPinY = window.functions.getRandomValueRange(PIN_ARROW_MIN_CORDS_Y - PIN_SIZE, PIN_ARROW_MAX_CORDS_Y);
      var ad = {
        id: i,
        author: {
          avatar: AVATAR_PATH + 'user0' + (i + 1) + AVATAR_EXTENSION // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        },
        offer: {
          title: window.data.titles[i], // строка, заголовок предложения, одно из фиксированных значений. Значения не должны повторяться.
          address: locationPinX + ', ' + locationPinY, // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
          price: window.functions.getRandomValueRange(1000, 1000000), // число, случайная цена от 1000 до 1000000
          type: window.data.types[window.functions.getRandomValueRange(0, 3)], // строка с одним из четырёх фиксированных значений:
          rooms: window.functions.getRandomValueRange(1, 5), // число, случайное количество комнат от 1 до 5
          guests: window.functions.getRandomValueRange(1, 10), // число, случайное количество гостей, которое можно разместить
          checkin: window.data.times[window.functions.getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
          checkout: window.data.times[window.functions.getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
          features: window.data.features.slice(window.functions.getRandomValueRange(0, window.data.features.length - 1)), // массив строк случайной длины из ниже предложенных:
          description: '', // пустая строка
          photos: window.functions.shuffleArray(window.data.photos) // массив из строк ... расположенных в произвольном порядке
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

  // Функция создает метку объявления
  var createMapPinElement = function (adObj) {
    var mapPinElem = mapPinTemplate.cloneNode(true);
    var pinImg = mapPinElem.querySelector('img');

    mapPinElem.style = 'left: ' + adObj.location.x + 'px; top: ' + adObj.location.y + 'px;';
    mapPinElem.setAttribute('id', adObj.id);
    pinImg.src = adObj.author.avatar;
    pinImg.alt = adObj.offer.title;

    return mapPinElem;
  };

  // Функция содает метки объявлений на карте
  var generateMapPins = function () {
    var mapPinsFragment = document.createDocumentFragment();

    ads.forEach(function (adObj) {
      var mapPinElement = createMapPinElement(adObj);
      mapPinsFragment.appendChild(mapPinElement);
    });

    mapPinsElem.appendChild(mapPinsFragment);
  };

  // Навешиваем события на пины
  var addPinsEvent = function () {
    mapPinsElem.addEventListener('click', function (evt) {
      var pinElem = evt.target.closest('.map__pin:not(.map__pin--main)');
      if (pinElem) {
        window.popup.createPopupCard(ads[pinElem.id]);
      }
    });
  };

  var map = document.querySelector('.map');
  var mapPinsElem = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');

  var AVATAR_EXTENSION = '.png';
  var AVATAR_PATH = 'img/avatars/';
  var PIN_SIZE = 50;
  var PIN_ARROW_MIN_CORDS_X = 0;
  var PIN_ARROW_MAX_CORDS_X = map.clientWidth;
  var PIN_ARROW_MIN_CORDS_Y = 130;
  var PIN_ARROW_MAX_CORDS_Y = 630;

  var ads = createAds();

  addPinsEvent();

  window.pins = {
    generateMapPins: generateMapPins
  };
})();
