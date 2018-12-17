'use strict';

(function () {
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
      var locationPinX = window.functions.getRandomValueRange(window.data.PIN_ARROW_MIN_CORDS_X, window.data.PIN_ARROW_MAX_CORDS_X - window.data.PIN_SIZE);
      var locationPinY = window.functions.getRandomValueRange(window.data.PIN_ARROW_MIN_CORDS_Y - window.data.PIN_SIZE, window.data.PIN_ARROW_MAX_CORDS_Y);
      var ad = {
        id: i,
        author: {
          avatar: window.data.AVATAR_PATH + 'user0' + (i + 1) + window.data.AVATAR_EXTENSION // строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        },
        offer: {
          title: titles[i], // строка, заголовок предложения, одно из фиксированных значений. Значения не должны повторяться.
          address: locationPinX + ', ' + locationPinY, // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
          price: window.functions.getRandomValueRange(1000, 1000000), // число, случайная цена от 1000 до 1000000
          type: types[window.functions.getRandomValueRange(0, 3)], // строка с одним из четырёх фиксированных значений:
          rooms: window.functions.getRandomValueRange(1, 5), // число, случайное количество комнат от 1 до 5
          guests: window.functions.getRandomValueRange(1, 10), // число, случайное количество гостей, которое можно разместить
          checkin: times[window.functions.getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
          checkout: times[window.functions.getRandomValueRange(0, 2)], // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
          features: features.slice(window.functions.getRandomValueRange(0, features.length - 1)), // массив строк случайной длины из ниже предложенных:
          description: '', // пустая строка
          photos: window.functions.shuffleArray(photos) // массив из строк ... расположенных в произвольном порядке
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

  // Функция содает список фич в объявлении
  var generateOfferFeaturesElem = function (futuresArray) {
    var futureFragment = document.createDocumentFragment();
    futuresArray.forEach(function (value) {
      var futureElem = window.functions.createNewElement('li', 'popup__feature', '');
      futureElem.classList.add('popup__feature--' + value);
      futureFragment.appendChild(futureElem);
    });
    return futureFragment;
  };

  // Функция содает список фото в объявлении
  var generateOfferPhotosElem = function (photosArray) {
    var photoFragment = document.createDocumentFragment();
    photosArray.forEach(function (value) {
      var photoElem = window.functions.createNewElement('img', 'popup__photo', '');
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

    var mapFiltersContainer = window.data.map.querySelector('.map__filters-container');
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
    offerType.textContent = window.data.offerTypeRusValues[adObj.offer.type];
    offerCapacity.textContent = adObj.offer.rooms + ' комнаты для ' + adObj.offer.guests + ' гостей';
    offerTime.textContent = 'Заезд после ' + adObj.offer.checkin + ', выезд до ' + adObj.offer.checkout;

    offerFeatures.innerHTML = '';
    offerFeatures.appendChild(generateOfferFeaturesElem(adObj.offer.features));

    offerDesc.textContent = adObj.offer.description;

    offerPhotos.innerHTML = '';
    offerPhotos.appendChild(generateOfferPhotosElem(adObj.offer.photos));

    window.data.map.insertBefore(mapCardElem, mapFiltersContainer);
  };

  var ads = createAds();

  window.offers = {
    createPopupCard: createPopupCard,
    ads: ads
  };
})();
