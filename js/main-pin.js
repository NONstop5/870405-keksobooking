'use strict';

(function () {

  // Начало перемещения главного пина
  var startWork = function () {
    var leftCords = parseInt(mapPinMain.style.left, 10);
    var topCords = parseInt(mapPinMain.style.top, 10);

    window.pins.getRemoteData();
    window.form.activateForm();
    window.form.setAddressFieldValue(leftCords, topCords);
  };

  // Навешиваем события на главный пин
  var addMainPinEvent = function () {
    mapPinMain.addEventListener('mousedown', function (mousedownEvt) {
      mousedownEvt.preventDefault();
      var allowableOffset = 10;

      var startPinCords = {
        left: parseInt(mapPinMain.style.left, 10),
        top: parseInt(mapPinMain.style.top, 10)
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

        var newLeftCords = mapPinMain.offsetLeft - offsetMouseCords.x;
        var newTopCords = mapPinMain.offsetTop - offsetMouseCords.y;

        if (newTopCords > PIN_ARROW_MIN_CORDS_Y - PIN_MAIN_SIZE && newTopCords < PIN_ARROW_MAX_CORDS_Y && newLeftCords > PIN_ARROW_MIN_CORDS_X && newLeftCords < PIN_ARROW_MAX_CORDS_X - PIN_MAIN_SIZE) {
          startMouseCords.x = mousemoveEvt.clientX;
          startMouseCords.y = mousemoveEvt.clientY;

          mapPinMain.style.left = newLeftCords + 'px';
          mapPinMain.style.top = newTopCords + 'px';
        }
      };

      var onMouseUp = function (mouseupEvt) {
        mouseupEvt.preventDefault();

        var generalOffsetX = mapPinMain.offsetLeft - startPinCords.left;
        var generalOffsetY = mapPinMain.offsetTop - startPinCords.top;

        if (Math.abs(generalOffsetX) > allowableOffset || Math.abs(generalOffsetY) > allowableOffset) {
          startWork();
        } else {
          mapPinMain.style.left = startPinCords.left + 'px';
          mapPinMain.style.top = startPinCords.top + 'px';
        }

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  var PIN_MAIN_SIZE = 65;
  var PIN_ARROW_MIN_CORDS_X = 0;
  var PIN_ARROW_MAX_CORDS_X = 1200;
  var PIN_ARROW_MIN_CORDS_Y = 130;
  var PIN_ARROW_MAX_CORDS_Y = 630;

  addMainPinEvent();

  window.mainPin = {
    startWork: startWork
  };

})();
