'use strict';

(function () {
  // Устанавливает доступность полей формы
  var setAvailableFormFields = function (formChildNodes, disabled) {
    formChildNodes.forEach(function (node) {
      node.disabled = disabled;
    });
  };

  // Заполняет поле адреса кординатами пина
  var setAddressFieldValue = function (leftCords, topCords) {
    var adressFieldElem = adFormElem.querySelector('#address');
    var pinCords = leftCords + ', ' + topCords;
    adressFieldElem.value = pinCords;
  };

  // Устанавливает сласс доступности формы
  var setFormDisabledClasses = function (flag) {
    if (flag) {
      adFormElem.classList.add('ad-form--disabled');
    } else {
      adFormElem.classList.remove('ad-form--disabled');
    }
  };

  // Устанавливает доступность формы и ее полей
  var setFormDisabled = function (flag) {
    setAvailableFormFields(filterFormChildNodes, flag);
    setAvailableFormFields(adFormChildNodes, flag);
    setFormDisabledClasses(flag);
  };

  // Навешиваем события на тип жилья
  var addHousingTypeEvent = function () {
    housingTypeElem.addEventListener('change', function (evt) {
      var selectedValue = evt.target.value;
      pricePerNightElem.min = housingTypeMinPrice[selectedValue];
      pricePerNightElem.placeholder = housingTypeMinPrice[selectedValue];
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

  // Навешиваем события на submit формы
  var addFormSabmitEvents = function () {
    adFormElem.addEventListener('submit', function (evt) {
      evt.preventDefault();
      sendFormDataJSON();
    });
  };

  // Отправка данных в формате JSON на сервер
  var sendFormDataJSON = function () {
    var url = 'https://js.dump.academy/keksobooking';

    var onSuccess = function () {
      window.messages.showSaccessMessage();
      window.popup.removePopupCard();
      window.pins.deleteMapPins();
      window.mainPin.setMainPinToStartCords();
      window.map.setMapDisabledClasses(true);
      adFormElem.reset();
      setFormDisabled(true);
    };

    var onError = function (message) {
      window.messages.showErrorMessage(message);
    };

    window.backend.sendServerDataJSON(url, new FormData(adFormElem), onSuccess, onError);

  };

  var adFormElem = document.querySelector('.ad-form');
  var adFormChildNodes = document.querySelectorAll('.ad-form > *');
  var filterFormChildNodes = document.querySelectorAll('.map__filters > *');
  var pricePerNightElem = document.querySelector('#price');
  var housingTypeElem = document.querySelector('#type');
  var timeInElem = document.querySelector('#timein');
  var timeOutElem = document.querySelector('#timeout');
  var roomNumberElem = document.querySelector('#room_number');
  var capacityElem = document.querySelector('#capacity');

  var housingTypeMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  addHousingTypeEvent();
  addTimeInEvent();
  addTimeOutEvent();
  addRoomNumberEvent();
  addFormSabmitEvents();

  setAvailableFormFields(filterFormChildNodes, true);
  setAvailableFormFields(adFormChildNodes, true);

  window.form = {
    setFormDisabled: setFormDisabled,
    setAddressFieldValue: setAddressFieldValue
  };
})();
