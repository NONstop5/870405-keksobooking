'use strict';

(function () {
  // Функция создает метку объявления
  var createMapPinElement = function (adObj) {
    var mapPinElem = mapPinTemplate.cloneNode(true);
    var pinImg = mapPinElem.querySelector('img');

    mapPinElem.style = 'left: ' + (adObj.location.x - PIN_SIZE) + 'px; top: ' + (adObj.location.y - PIN_SIZE) + 'px;';
    mapPinElem.setAttribute('id', adObj.id);
    pinImg.src = adObj.author.avatar;
    pinImg.alt = adObj.offer.title;

    return mapPinElem;
  };

  // Функция содает метки объявлений на карте
  var generateMapPins = function () {
    var mapPinsFragment = document.createDocumentFragment();
    var ads = window.data.getRemoteData();
    ads.forEach(function (adObj, i) {
      adObj.id = i;
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
        window.popup.createPopupCard(window.data.ads[pinElem.id]);
      }
    });
  };

  var mapPinsElem = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');

  var PIN_SIZE = 50;

  addPinsEvent();

  window.pins = {
    generateMapPins: generateMapPins
  };
})();
