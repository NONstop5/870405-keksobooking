'use strict';

(function () {

  var setMapDisabledClasses = function (flag) {
    if (flag) {
      mapElem.classList.add('map--faded');
    } else {
      mapElem.classList.remove('map--faded');
    }
  };

  var mapElem = document.querySelector('.map');

  window.map = {
    mapElem: mapElem,
    setMapDisabledClasses: setMapDisabledClasses
  };
})();
