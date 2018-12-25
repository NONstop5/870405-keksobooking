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
  var originalAdsArray = [];

  window.map = {
    originalAdsArray: originalAdsArray,
    mapElem: mapElem,
    setMapDisabledClasses: setMapDisabledClasses
  };
})();
