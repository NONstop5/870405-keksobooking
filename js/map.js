'use strict';

var AVATAR_EXTENSION = '.png';
var AVATAR_PATH = 'img/avatars/';

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

// Функция создания нового элемента
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

  var pinArrowStartCordsX = 0;
  var pinArrowEndCordsX = map.clientWidth - 50;
  var pinArrowStartCordsY = 130 - 35;
  var pinArrowEndCordsY = 630;


  for (var i = 0; i < 8; i++) {
    var locationPinX = getRandomValueRange(pinArrowStartCordsX, pinArrowEndCordsX);
    var locationPinY = getRandomValueRange(pinArrowStartCordsY, pinArrowEndCordsY);
    var ad = {
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

var generateOfferFeatures = function (futuresArray) {
  var futureFragment = document.createDocumentFragment();
  futuresArray.forEach(function (value) {
    var futureElem = createNewElement('li', 'popup__feature', '');
    futureElem.classList.add('popup__feature--' + value);
    futureFragment.appendChild(futureElem);
  });
  return futureFragment;
};

var generateOfferPhotos = function (photosArray) {
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
  offerFeatures.appendChild(generateOfferFeatures(adObj.offer.features));

  offerDesc.textContent = adObj.offer.description;

  offerPhotos.innerHTML = '';
  offerPhotos.appendChild(generateOfferPhotos(adObj.offer.photos));

  map.insertBefore(mapCardElem, mapFiltersContainer);
};

var mapPinsElem = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('button');
var offerTypeRusValues = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var ads = createAds();

generateMapPins(ads);
createPopupCard(ads[0]);