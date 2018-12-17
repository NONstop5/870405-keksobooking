'use strict';

(function () {
  // Навешиваем события на тип жилья
  var addHousingTypeEvent = function () {
    window.data.housingTypeElem.addEventListener('change', function (evt) {
      var selectedValue = evt.target.value;
      window.data.pricePerNightElem.min = window.data.housingTypeMinPrice[selectedValue];
      window.data.pricePerNightElem.placeholder = window.data.housingTypeMinPrice[selectedValue];
    });
  };

  // Навешиваем события на время заезда
  var addTimeInEvent = function () {
    window.data.timeInElem.addEventListener('change', function (evt) {
      window.data.timeOutElem.value = evt.target.value;
    });
  };

  // Навешиваем события на время выезда
  var addTimeOutEvent = function () {
    window.data.timeOutElem.addEventListener('change', function (evt) {
      window.data.timeInElem.value = evt.target.value;
    });
  };

  // Навешиваем события на количество комнат
  var addRoomNumberEvent = function () {
    window.data.roomNumberElem.addEventListener('change', function (evt) {
      var curIntVal = parseInt(evt.target.value, 10);
      window.data.capacityElem.value = evt.target.value;

      for (var i = 0; i < window.data.capacityElem.length; i++) {
        window.data.capacityElem[i].disabled = true;
      }

      if (curIntVal) {
        for (i = 1; i <= curIntVal; i++) {
          window.data.capacityElem[i].disabled = false;
        }
      } else {
        window.data.capacityElem[0].disabled = false;
      }
    });
  };

  // Функция устанавливает доступность полей формы
  var setAvailableFormFields = function (formChildNodes, disabled) {
    formChildNodes.forEach(function (node) {
      node.disabled = disabled;
    });
  };

  // Функция заполняет поле адреса кординатами пина
  var setAddressFieldValue = function (leftCords, topCords) {
    var adressFieldElem = window.data.adFormElem.querySelector('#address');
    var pinCords = leftCords + ', ' + topCords;
    adressFieldElem.value = pinCords;
  };

  window.form = {
    addHousingTypeEvent: addHousingTypeEvent,
    addTimeInEvent: addTimeInEvent,
    addTimeOutEvent: addTimeOutEvent,
    addRoomNumberEvent: addRoomNumberEvent,
    setAvailableFormFields: setAvailableFormFields,
    setAddressFieldValue: setAddressFieldValue
  };

  setAvailableFormFields(window.data.filterFormChildNodes, true);
  setAvailableFormFields(window.data.adFormChildNodes, true);

  addHousingTypeEvent();
  addTimeInEvent();
  addTimeOutEvent();
  addRoomNumberEvent();
})();
