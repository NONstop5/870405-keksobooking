'use strict';

(function () {
  var HousingTypeMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  // Заполняет поле адреса кординатами пина
  var setAddressFieldValue = function (leftCords, topCords) {
    var adressFieldElem = adFormElem.querySelector('#address');
    var pinCords = leftCords + ', ' + topCords;
    adressFieldElem.value = pinCords;
  };

  // Устанавливает сласс доступности формы
  var setAdFormDisabledClasses = function (flag) {
    if (flag) {
      adFormElem.classList.add('ad-form--disabled');
    } else {
      adFormElem.classList.remove('ad-form--disabled');
    }
  };

  // Устанавливает доступность формы и ее полей
  var setAdFormDisabled = function (flag) {
    window.functions.setAvailableFormFields(adFormChildNodes, flag);
    setAdFormDisabledClasses(flag);
  };

  // Возвращаем все к исходному состоянию
  var setDefaults = function () {
    window.popup.removePopupCard();
    window.pins.deleteMapPins();
    window.mainPin.setMainPinToStartCords();
    window.map.setMapDisabledClasses(true);
    adFormElem.reset();
    setAdFormDisabled(true);
  };

  // Навешиваем события на тип жилья
  var addHousingTypeEvent = function () {
    housingTypeElem.addEventListener('change', function (evt) {
      var selectedValue = evt.target.value;
      pricePerNightElem.min = HousingTypeMinPrice[selectedValue];
      pricePerNightElem.placeholder = HousingTypeMinPrice[selectedValue];
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

  // Навешиваем события на форму
  var addFormEvents = function () {
    adFormElem.addEventListener('submit', function (evt) {
      evt.preventDefault();
      sendFormDataJSON();
    });

    adFormElem.addEventListener('reset', function () {
      setDefaults();
    });
  };

  // Отправка данных в формате JSON на сервер
  var sendFormDataJSON = function () {
    var url = 'https://js.dump.academy/keksobooking1';

    var onSuccess = function () {
      window.messages.showSaccessMessage();
      setDefaults();
    };

    var onError = function (message) {
      window.messages.showErrorMessage(message);
    };

    window.backend.sendServerDataJSON(url, new FormData(adFormElem), onSuccess, onError);

  };

  var adFormElem = document.querySelector('.ad-form');
  var adFormChildNodes = document.querySelectorAll('.ad-form > *');
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
  addFormEvents();

  setAdFormDisabled(true);

  window.form = {
    setAdFormDisabled: setAdFormDisabled,
    setAddressFieldValue: setAddressFieldValue
  };
})();
