'use strict';

(function () {

  var mapElem = document.querySelector('.map');

  window.mainPin.addMainPinEvent();
  window.pins.addPinsEvent();

  window.map = {
    mapElem: mapElem
  };
})();
