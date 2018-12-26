'use strict';

(function () {

  // Устанавливает доступность полей фмльтров
  var setFilterDisabled = function (flag) {
    window.functions.setAvailableFormFields(formFilterChildNodes, flag);
  };

  // Навешиваем события на фильтр выпадающих списков
  /*
  После этой проверки доделаю !

  var addFormOptionsFilterEvents = function () {
    formFilterElem.addEventListener('click', function (evt) {
      var tagName = evt.target.tagName;
      var priceLimits = {
        low: 10000,
        high: 50000
      };

      if (tagName === 'OPTION') {
        var selectedOptions = [];
        var formFilterSelectNodes = formFilterElem.querySelectorAll('select');

        formFilterSelectNodes.forEach(function (curNode) {
          var propName = curNode.name.substr(curNode.name.indexOf('-') + 1);
          var propValue = curNode.options[curNode.selectedIndex].value;
          var obj = {};
          obj[propName] = propValue;
          selectedOptions.push(obj);
        });
        selectedOptions = selectedOptions.filter(function (item) {
          return item !== 'any';
        });

        var filteredAdsArray = window.map.originalAdsArray.filter(function (ad) {
          return selectedOptions.every(function (optionName) {

          });
        });
      }

    });
  };
*/
  // Навешиваем события на фильтр фичей
  var addFormFeaturesFilterEvents = function () {
    formFilterfeaturesElem.addEventListener('click', function (evt) {
      var tagName = evt.target.tagName;
      var name = evt.target.name;

      if (tagName === 'INPUT') {
        var checkedFeatures = [];
        var formFilterfeaturesNodes = formFilterfeaturesElem.querySelectorAll('input:checked');

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

        var filteredAdsArray = window.map.originalAdsArray.filter(compareFeatureValues);

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
  // addFormOptionsFilterEvents();
  addFormFeaturesFilterEvents();

  window.filter = {
    setFilterDisabled: setFilterDisabled
  };
})();
