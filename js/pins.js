'use strict';

(function () {
  // Функция создает метку объявления
  var createMapPinElement = function (adObj) {
    var mapPinElem = window.data.mapPinTemplate.cloneNode(true);
    var pinImg = mapPinElem.querySelector('img');

    mapPinElem.style = 'left: ' + adObj.location.x + 'px; top: ' + adObj.location.y + 'px;';
    mapPinElem.setAttribute('id', adObj.id);
    pinImg.src = adObj.author.avatar;
    pinImg.alt = adObj.offer.title;

    return mapPinElem;
  };

  // Функция содает метки объявлений на карте
  var generateMapPins = function (adsArray) {
    var mapPinsFragment = document.createDocumentFragment();

    adsArray.forEach(function (adObj) {
      var mapPinElement = createMapPinElement(adObj);
      mapPinsFragment.appendChild(mapPinElement);
    });

    window.data.mapPinsElem.appendChild(mapPinsFragment);
  };

  // Навешиваем события на главный пин
  var addMainPinEvent = function () {
    window.data.mapPinMain.addEventListener('mousedown', function (mousedownEvt) {
      mousedownEvt.preventDefault();
      var allowableOffset = 10;

      var startPinCords = {
        left: parseInt(window.data.mapPinMain.style.left, 10),
        top: parseInt(window.data.mapPinMain.style.top, 10)
      };

      var startMouseCords = {
        x: mousedownEvt.clientX,
        y: mousedownEvt.clientY
      };

      var onMouseMove = function (mousemoveEvt) {
        mousemoveEvt.preventDefault();

        var offsetMouseCords = {
          x: startMouseCords.x - mousemoveEvt.clientX,
          y: startMouseCords.y - mousemoveEvt.clientY
        };

        var newLeftCords = window.data.mapPinMain.offsetLeft - offsetMouseCords.x;
        var newTopCords = window.data.mapPinMain.offsetTop - offsetMouseCords.y;

        if (newTopCords > window.data.PIN_ARROW_MIN_CORDS_Y - window.data.PIN_MAIN_SIZE && newTopCords < window.data.PIN_ARROW_MAX_CORDS_Y && newLeftCords > window.data.PIN_ARROW_MIN_CORDS_X && newLeftCords < window.data.PIN_ARROW_MAX_CORDS_X - window.data.PIN_MAIN_SIZE) {
          startMouseCords.x = mousemoveEvt.clientX;
          startMouseCords.y = mousemoveEvt.clientY;

          window.data.mapPinMain.style.left = newLeftCords + 'px';
          window.data.mapPinMain.style.top = newTopCords + 'px';
        }
      };

      var onMouseUp = function (mouseupEvt) {
        mouseupEvt.preventDefault();

        var generalOffsetX = window.data.mapPinMain.offsetLeft - startPinCords.left;
        var generalOffsetY = window.data.mapPinMain.offsetTop - startPinCords.top;
        var leftCords = parseInt(window.data.mapPinMain.style.left, 10);
        var topCords = parseInt(window.data.mapPinMain.style.top, 10);

        if (Math.abs(generalOffsetX) > allowableOffset || Math.abs(generalOffsetY) > allowableOffset) {
          generateMapPins(window.offers.ads);
          window.form.setAvailableFormFields(window.data.filterFormChildNodes, false);
          window.form.setAvailableFormFields(window.data.adFormChildNodes, false);
          window.form.setAddressFieldValue(leftCords, topCords);
          window.data.map.classList.remove('map--faded');
          window.data.adFormElem.classList.remove('ad-form--disabled');
        } else {
          window.data.mapPinMain.style.left = startPinCords.left + 'px';
          window.data.mapPinMain.style.top = startPinCords.top + 'px';
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };

  // Навешиваем события на пины
  var addPinsEvent = function () {
    window.data.mapPinsElem.addEventListener('click', function (evt) {
      var pinElem = evt.target.closest('.map__pin:not(.map__pin--main)');
      if (pinElem) {
        window.offers.createPopupCard(window.offers.ads[pinElem.id]);
      }
    });
  };

  addMainPinEvent();
  addPinsEvent();
})();
