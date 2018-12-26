'use strict';

(function () {

  var PIN_SIZE = 50;

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

  // Содает метки объявлений на карте
  var generateMapPins = function (adsArray) {
    var mapPinsFragment = document.createDocumentFragment();
    ads = adsArray;
    ads.forEach(function (adObj, i) {
      adObj.id = i;
      adObj.active = false;
      var mapPinElement = createMapPinElement(adObj);
      mapPinsFragment.appendChild(mapPinElement);
    });

    mapPinsElem.appendChild(mapPinsFragment);
  };

  // Удаляет все метки объявлений на карте
  var deleteMapPins = function () {
    var mapPinsList = mapPinsElem.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsList.forEach(function (pinObj) {
      mapPinsElem.removeChild(pinObj);
    });
  };

  // Удаляет подстветку у активного пина
  var removeActivePinClass = function () {
    var selectedPinElem = mapPinsElem.querySelector('.map__pin.map__pin--active');
    if (selectedPinElem) {
      selectedPinElem.classList.remove('map__pin--active');
      ads[selectedPinElem.id].active = false;
    }
  };

  // Подсвечивает новый активный пин
  var addActivePinClass = function (pinElem) {
    pinElem.classList.add('map__pin--active');
    ads[pinElem.id].active = true;
  };

  // Навешиваем события на пины
  var addPinsEvent = function () {
    mapPinsElem.addEventListener('click', function (evt) {
      var activePinElem = evt.target.closest('.map__pin:not(.map__pin--main)');

      if (activePinElem) {
        removeActivePinClass();
        addActivePinClass(activePinElem);
        window.popup.createPopupCard(ads[activePinElem.id]);
      }
    });
  };

  var mapPinsElem = window.map.mapElem.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var ads = [];

  addPinsEvent();

  window.pins = {
    removeActivePinClass: removeActivePinClass,
    generateMapPins: generateMapPins,
    deleteMapPins: deleteMapPins
  };
})();
