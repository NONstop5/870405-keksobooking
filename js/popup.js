'use strict';

(function () {
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
    offerType.textContent = window.data.offerTypeRusValues[adObj.offer.type];
    offerCapacity.textContent = adObj.offer.rooms + ' комнаты для ' + adObj.offer.guests + ' гостей';
    offerTime.textContent = 'Заезд после ' + adObj.offer.checkin + ', выезд до ' + adObj.offer.checkout;

    offerFeatures.innerHTML = '';
    offerFeatures.appendChild(generateOfferFeaturesElem(adObj.offer.features));

    offerDesc.textContent = adObj.offer.description;

    offerPhotos.innerHTML = '';
    offerPhotos.appendChild(generateOfferPhotosElem(adObj.offer.photos));

    map.insertBefore(mapCardElem, mapFiltersContainer);
  };

  var map = document.querySelector('.map');

  window.popup = {
    createPopupCard: createPopupCard
  };
})();
