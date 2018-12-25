'use strict';

(function () {

  // Устанавливает доступность полей фмльтров
  var setFilterDisabled = function (flag) {
    window.functions.setAvailableFormFields(formFilterChildNodes, flag);
  };

  // Навешиваем события на фильтр выпадающих списков
  var addFormFilterEvents = function () {
    formFilterElem.addEventListener('click', function (evt) {
      var tagName = evt.target.tagName;

      if (tagName === 'OPTION') {
        console.log(evt.target.parentNode.name + ' ' + evt.target.value);
      }
    });
  };

  // Навешиваем события на фильтр фичей
  var addFormFeaturesFilterEvents = function () {
    formFilterfeaturesElem.addEventListener('click', function (evt) {
      var tagName = evt.target.tagName;
      var name = evt.target.name;
      var originalAdsArray = window.map.originalAdsArray;
      var formFilterfeaturesNodes = formFilterfeaturesElem.querySelectorAll('input:checked');

      if (tagName === 'INPUT') {
        var checkedFeatures = [];
        formFilterfeaturesNodes.forEach(function (curNode) {
          checkedFeatures.push(curNode.value);
        });

        var compareFeatureValues = function (ad) {
          return checkedFeatures.every(function (featureName) {
            return ad.offer[name].some(function (propertyValue) {
              return propertyValue === featureName;
            });
          });
        };

        var filteredAdsArray = originalAdsArray.filter(compareFeatureValues);
        console.log(filteredAdsArray);
        window.popup.removePopupCard();
        window.pins.deleteMapPins();
        window.pins.generateMapPins(filteredAdsArray.slice(0, 5));
      }
    });
  };

  var formFilterElem = window.map.mapElem.querySelector('.map__filters');
  var formFilterfeaturesElem = formFilterElem.querySelector('.map__features');
  var formFilterChildNodes = window.map.mapElem.querySelectorAll('.map__filters > *');

  setFilterDisabled(true);
  addFormFilterEvents();
  addFormFeaturesFilterEvents();

  window.filter = {
    setFilterDisabled: setFilterDisabled
  };
})();
