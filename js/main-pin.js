'use strict';

(function () {

  var PINS_COUNT = 5;
  var PIN_MAIN_SIZE = 65;
  var PinArowCord = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var setMainPinToStartCords = function () {
    mapPinMain.style.left = startPinCords.left + 'px';
    mapPinMain.style.top = startPinCords.top + 'px';
  };

  // Навешиваем события на главный пин
  var addMainPinEvent = function () {
    mapPinMain.addEventListener('mousedown', function (mousedownEvt) {
      mousedownEvt.preventDefault();
      var allowableOffset = 10;

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
        var newCords = {
          left: mapPinMain.offsetLeft - offsetMouseCords.x,
          top: mapPinMain.offsetTop - offsetMouseCords.y
        };

        if (newCords.top > PinArowCord.MIN_Y - PIN_MAIN_SIZE && newCords.top < PinArowCord.MAX_Y && newCords.left > PinArowCord.MIN_X && newCords.left < PinArowCord.MAX_X - PIN_MAIN_SIZE) {
          startMouseCords.x = mousemoveEvt.clientX;
          startMouseCords.y = mousemoveEvt.clientY;

          mapPinMain.style.left = newCords.left + 'px';
          mapPinMain.style.top = newCords.top + 'px';
        }
      };

      var onMouseUp = function (mouseupEvt) {
        mouseupEvt.preventDefault();

        var generalOffset = {
          x: mapPinMain.offsetLeft - startPinCords.left,
          y: mapPinMain.offsetTop - startPinCords.top
        };

        if (Math.abs(generalOffset.x) > allowableOffset || Math.abs(generalOffset.y) > allowableOffset) {
          if (window.map.mapElem.classList[1] === 'map--faded') {
            getRemoteDataJSON();
          }
          window.form.setAddressFieldValue(parseInt(mapPinMain.style.left, 10), parseInt(mapPinMain.style.top, 10));
        } else {
          setMainPinToStartCords();
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };

  // Загружаем данные с сервера
  var getRemoteDataJSON = function () {
    var url = 'https://js.dump.academy/keksobooking/data';

    var onSuccess = function (data) {
      window.map.originalAdsArray = data.slice();
      window.pins.generateMapPins(data.slice(PINS_COUNT));
      window.map.setMapDisabledClasses(false);
      window.filter.setFilterDisabled(false);
      window.form.setAdFormDisabled(false);
      window.form.setAddressFieldValue(parseInt(mapPinMain.style.left, 10), parseInt(mapPinMain.style.top, 10));
    };

    var onError = function (message) {
      window.messages.showErrorMessage(message);
      setMainPinToStartCords();
    };

    window.backend.getServerDataJSON(url, onSuccess, onError);
  };
  var mapPinMain = document.querySelector('.map__pin--main');
  var startPinCords = {
    left: parseInt(mapPinMain.style.left, 10),
    top: parseInt(mapPinMain.style.top, 10)
  };

  addMainPinEvent();

  window.mainPin = {
    setMainPinToStartCords: setMainPinToStartCords
  };

})();
