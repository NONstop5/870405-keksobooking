'use strict';

// Функция генерации целого случайного числа из заданного диапазона
var getRandomValueRange = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Функция перемешивает и возвращает, изначально, переданный массив
var shuffleArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    var rndArrIndex = getRandomValueRange(0, array.length - 1);
    var tmpValue = array[i];
    array[i] = array[rndArrIndex];
    array[rndArrIndex] = tmpValue;
  }

  return array;
};

// Функция создает новый элемент
var createNewElement = function (tagName, className, textContent) {
  var newElement = document.createElement(tagName);
  newElement.classList.add(className);
  newElement.textContent = textContent;

  return newElement;
};

// Функция создает массив объектов объявлений
var createAds = function () {
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var times = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var result = [];

  for (var i = 0; i < 8; i++) {
    var locationPinX = getRandomValueRange(PIN_ARROW_MIN_CORDS_X, PIN_ARROW_MAX_CORDS_X - PIN_SIZE);
    var locationPinY = getRandomValueRange(PIN_ARROW_MIN_CORDS_Y - PIN_SIZE, PIN_ARROW_MAX_CORDS_Y);
    var ad = {
      id: i,
      author: {
        avatar: AVATAR_PATH + 'user0' + (i + 1) + AVATAR_EXTENSION // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },
      offer: {
        title: titles[i], // строка, заголовок предложения, одно из фиксированных значений. Значения не должны повторяться.
        address: locationPinX + ', ' + locationPinY, // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        price: getRandomValueRange(1000, 1000000), // число, случайная цена от 1000 до 1000000
        type: types[getRandomValueRange(0, 3)], // строка с одним из четырёх фиксированных значений:
        rooms: getRandomValueRange(1, 5), // число, случайное количество комнат от 1 до 5
        guests: getRandomValueRange(1, 10), // число, случайное количество гостей, которое можно разместить
        checkin: times[getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        checkout: times[getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        features: features.slice(getRandomValueRange(0, features.length - 1)), // массив строк случайной длины из ниже предложенных:
        description: '', // пустая строка
        photos: shuffleArray(photos) // массив из строк ... расположенных в произвольном порядке
      },
      location: {
        x: locationPinX, // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        y: locationPinY // случайное число, координата y метки на карте от 130 до 630.
      }
    };
    result.push(ad);
  }

  return result;
};

// Функция создает метку объявления
var createMapPinElement = function (adObj) {
  var mapPinElem = mapPinTemplate.cloneNode(true);
  var pinImg = mapPinElem.querySelector('img');

  mapPinElem.style = 'left: ' + adObj.location.x + 'px; top: ' + adObj.location.y + 'px;';
  mapPinElem.setAttribute('id', adObj.id);
  pinImg.src = adObj.author.avatar;
  pinImg.alt = adObj.offer.title;

  return mapPinElem;
};

// Функция содает метки объявлений на карте
var generateMapPins = function (adsArray) {
  var mapPinsFragment = document.createDocumentFragment();

  adsArray.forEach(function (adObj) {
    var mapPinElement = createMapPinElement(adObj);
    mapPinsFragment.appendChild(mapPinElement);
  });

  mapPinsElem.appendChild(mapPinsFragment);
};

// Функция содает список фич в объявлении
var generateOfferFeaturesElem = function (futuresArray) {
  var futureFragment = document.createDocumentFragment();
  futuresArray.forEach(function (value) {
    var futureElem = createNewElement('li', 'popup__feature', '');
    futureElem.classList.add('popup__feature--' + value);
    futureFragment.appendChild(futureElem);
  });
  return futureFragment;
};

// Функция содает список фото в объявлении
var generateOfferPhotosElem = function (photosArray) {
  var photoFragment = document.createDocumentFragment();
  photosArray.forEach(function (value) {
    var photoElem = createNewElement('img', 'popup__photo', '');
    photoElem.src = value;
    photoElem.width = 45;
    photoElem.height = 40;
    photoElem.alt = 'Фотография жилья';
    photoFragment.appendChild(photoElem);
  });
  return photoFragment;
};

// Функция содает список фич в объявлении
var createPopupCard = function (adObj) {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('article');
  var mapCardElem = mapCardTemplate.cloneNode(true);

  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var avatarImg = mapCardElem.querySelector('img');
  var offerTitle = mapCardElem.querySelector('.popup__title');
  var offerAddress = mapCardElem.querySelector('.popup__text--address');
  var offerPrice = mapCardElem.querySelector('.popup__text--price');
  var offerType = mapCardElem.querySelector('.popup__type');
  var offerCapacity = mapCardElem.querySelector('.popup__text--capacity');
  var offerTime = mapCardElem.querySelector('.popup__text--time');
  var offerFeatures = mapCardElem.querySelector('.popup__features');
  var offerDesc = mapCardElem.querySelector('.popup__description');
  var offerPhotos = mapCardElem.querySelector('.popup__photos');

  avatarImg.src = adObj.author.avatar;
  offerTitle.textContent = adObj.offer.title;
  offerAddress.textContent = adObj.offer.address;
  offerPrice.innerHTML = adObj.offer.price + '&#x20bd;<span>/ночь</span>';
  offerType.textContent = offerTypeRusValues[adObj.offer.type];
  offerCapacity.textContent = adObj.offer.rooms + ' комнаты для ' + adObj.offer.guests + ' гостей';
  offerTime.textContent = 'Заезд после ' + adObj.offer.checkin + ', выезд до ' + adObj.offer.checkout;

  offerFeatures.innerHTML = '';
  offerFeatures.appendChild(generateOfferFeaturesElem(adObj.offer.features));

  offerDesc.textContent = adObj.offer.description;

  offerPhotos.innerHTML = '';
  offerPhotos.appendChild(generateOfferPhotosElem(adObj.offer.photos));

  map.insertBefore(mapCardElem, mapFiltersContainer);
};

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
      var leftCords = parseInt(mapPinMain.style.left, 10);
      var topCords = parseInt(mapPinMain.style.top, 10);

      if (Math.abs(generalOffsetX) > allowableOffset || Math.abs(generalOffsetY) > allowableOffset) {
        generateMapPins(ads);
        setAvailableFormFields(filterFormChildNodes, false);
        setAvailableFormFields(adFormChildNodes, false);
        setAddressFieldValue(leftCords, topCords);
        map.classList.remove('map--faded');
        adFormElem.classList.remove('ad-form--disabled');
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

// Навешиваем события на пины
var addPinsEvent = function () {
  mapPinsElem.addEventListener('click', function (evt) {
    var pinElem = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pinElem) {
      createPopupCard(ads[pinElem.id]);
    }
  });
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

var mapPinsElem = document.querySelector('.map__pins');
var mapPinMain = mapPinsElem.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adFormElem = document.querySelector('.ad-form');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');
var filterFormChildNodes = document.querySelectorAll('.map__filters > *');
var adFormChildNodes = document.querySelectorAll('.ad-form > *');
var pricePerNightElem = document.querySelector('#price');
var housingTypeElem = document.querySelector('#type');
var timeInElem = document.querySelector('#timein');
var timeOutElem = document.querySelector('#timeout');
var roomNumberElem = document.querySelector('#room_number');
var capacityElem = document.querySelector('#capacity');
var offerTypeRusValues = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var housingTypeMinPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var AVATAR_EXTENSION = '.png';
var AVATAR_PATH = 'img/avatars/';
var PIN_MAIN_SIZE = 65;
var PIN_SIZE = 50;
var PIN_ARROW_MIN_CORDS_X = 0;
var PIN_ARROW_MAX_CORDS_X = map.clientWidth;
var PIN_ARROW_MIN_CORDS_Y = 130;
var PIN_ARROW_MAX_CORDS_Y = 630;

setAvailableFormFields(filterFormChildNodes, true);
setAvailableFormFields(adFormChildNodes, true);

var ads = createAds();

addMainPinEvent();
addPinsEvent();
addHousingTypeEvent();
addTimeInEvent();
addTimeOutEvent();
addRoomNumberEvent();
