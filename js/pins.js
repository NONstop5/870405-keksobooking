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

  // Подсвечивает активный пин и удаляет подсветку у предыдущего активного пина
  var setActivePinClass = function (pinElem) {
    var selectedPinElem = mapPinsElem.querySelector('.map__pin.map__pin--active');
    if (selectedPinElem) {
      selectedPinElem.classList.remove('map__pin--active');
      ads[selectedPinElem.id].selected = false;
    }

    ads[pinElem.id].selected = true;
    pinElem.classList.add('map__pin--active');
  };

  // Навешиваем события на пины
  var addPinsEvent = function () {
    mapPinsElem.addEventListener('click', function (evt) {
      var pinElem = evt.target.closest('.map__pin:not(.map__pin--main)');

      if (pinElem) {
        setActivePinClass(pinElem);
        window.popup.createPopupCard(ads[pinElem.id]);
      }
    });
  };

  var mapPinsElem = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var ads = [];

  addPinsEvent();

  window.pins = {
    generateMapPins: generateMapPins,
    deleteMapPins: deleteMapPins
  };
})();
