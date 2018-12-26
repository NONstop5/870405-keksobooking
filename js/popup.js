'use strict';

(function () {

  var ESC_KEY_CODE = 27;
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

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
      photoElem.width = PHOTO_WIDTH;
      photoElem.height = PHOTO_HEIGHT;
      photoElem.alt = 'Фотография жилья';
      photoFragment.appendChild(photoElem);
    });
    return photoFragment;
  };

  // Функция содает список фич в объявлении
  var createPopupCard = function (adObj) {
    var mapCardTemplate = document.querySelector('#card').content.querySelector('article');
    var mapCardElem = mapCardTemplate.cloneNode(true);

    var mapFiltersContainer = window.map.mapElem.querySelector('.map__filters-container');
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

    removePopupCard();

    avatarImg.src = adObj.author.avatar;
    offerTitle.textContent = adObj.offer.title;
    offerAddress.textContent = adObj.offer.address;
    offerPrice.textContent = adObj.offer.price + ' ₽/ночь';
    offerType.textContent = offerTypeRusValues[adObj.offer.type];
    offerCapacity.textContent = adObj.offer.rooms + ' комнаты для ' + adObj.offer.guests + ' гостей';
    offerTime.textContent = 'Заезд после ' + adObj.offer.checkin + ', выезд до ' + adObj.offer.checkout;

    offerFeatures.innerHTML = '';
    offerFeatures.appendChild(generateOfferFeaturesElem(adObj.offer.features));

    offerDesc.textContent = adObj.offer.description;

    offerPhotos.innerHTML = '';
    offerPhotos.appendChild(generateOfferPhotosElem(adObj.offer.photos));

    window.map.mapElem.insertBefore(mapCardElem, mapFiltersContainer);

    addPopupEvents(mapCardElem);
  };

  // Удаляет окно объявления
  var removePopupCard = function () {
    var currentPopup = window.map.mapElem.querySelector('.map__card');
    if (currentPopup) {
      window.map.mapElem.removeChild(currentPopup);
    }
  };

  // Навешиваем события на окно объявления
  var addPopupEvents = function (mapCardElem) {
    var closePopupIcon = mapCardElem.querySelector('.popup__close');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        removePopupCard();
        window.pins.removeActivePinClass();
      }
    });

    closePopupIcon.addEventListener('click', function () {
      removePopupCard();
      window.pins.removeActivePinClass();
    });
  };

  var offerTypeRusValues = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  window.popup = {
    createPopupCard: createPopupCard,
    removePopupCard: removePopupCard
  };
})();
