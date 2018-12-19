'use strict';

(function () {
  // Функция устанавливает доступность полей формы
  var setAvailableFormFields = function (formChildNodes, disabled) {
    formChildNodes.forEach(function (node) {
      node.disabled = disabled;
    });
  };

  // Функция заполняет поле адреса кординатами пина
  var setAddressFieldValue = function (leftCords, topCords) {
    var adressFieldElem = adFormElem.querySelector('#address');
    var pinCords = leftCords + ', ' + topCords;
    adressFieldElem.value = pinCords;
  };

  var setAdFormDisabled = function (flag) {
    if (flag) {
      window.map.mapElem.classList.add('map--faded');
      adFormElem.classList.add('ad-form--disabled');
    } else {
      window.map.mapElem.classList.remove('map--faded');
      adFormElem.classList.remove('ad-form--disabled');
    }
  };

  var activateForm = function () {
    setAvailableFormFields(filterFormChildNodes, false);
    setAvailableFormFields(adFormChildNodes, false);
    setAdFormDisabled(false);
  };

  // Навешиваем события на тип жилья
  var addHousingTypeEvent = function () {
    housingTypeElem.addEventListener('change', function (evt) {
      var selectedValue = evt.target.value;
      pricePerNightElem.min = window.data.housingTypeMinPrice[selectedValue];
      pricePerNightElem.placeholder = window.data.housingTypeMinPrice[selectedValue];
    });
  };

  // Навешиваем события на время заезда
  var addTimeInEvent = function () {
    timeInElem.addEventListener('change', function (evt) {
      timeOutElem.value = evt.target.value;
    });
  };

  // Навешиваем события на время выезда
  var addTimeOutEvent = function () {
    timeOutElem.addEventListener('change', function (evt) {
      timeInElem.value = evt.target.value;
    });
  };

  // Навешиваем события на количество комнат
  var addRoomNumberEvent = function () {
    roomNumberElem.addEventListener('change', function (evt) {
      var curIntVal = parseInt(evt.target.value, 10);
      capacityElem.value = evt.target.value;

      for (var i = 0; i < capacityElem.length; i++) {
        capacityElem[i].disabled = true;
      }

      if (curIntVal) {
        for (i = 1; i <= curIntVal; i++) {
          capacityElem[i].disabled = false;
        }
      } else {
        capacityElem[0].disabled = false;
      }
    });
  };

  var filterFormChildNodes = document.querySelectorAll('.map__filters > *');
  var adFormChildNodes = document.querySelectorAll('.ad-form > *');
  var adFormElem = document.querySelector('.ad-form');
  var pricePerNightElem = document.querySelector('#price');
  var housingTypeElem = document.querySelector('#type');
  var timeInElem = document.querySelector('#timein');
  var timeOutElem = document.querySelector('#timeout');
  var roomNumberElem = document.querySelector('#room_number');
  var capacityElem = document.querySelector('#capacity');

  addHousingTypeEvent();
  addTimeInEvent();
  addTimeOutEvent();
  addRoomNumberEvent();

  setAvailableFormFields(filterFormChildNodes, true);
  setAvailableFormFields(adFormChildNodes, true);

  window.form = {
    activateForm: activateForm,
    setAddressFieldValue: setAddressFieldValue
  };
})();
