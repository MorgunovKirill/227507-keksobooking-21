'use strict';

(function () {
  const pinPlaces = document.querySelector(`.map__pins`);
  const PlaceTypes = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

  const onPopupEscPress = (evt) => {
    window.util.isEscEvent(evt, closePopup);
  };

  const closePopup = () => {
    const card = document.querySelector(`.map__card`);

    if (card) {
      card.classList.add(`hidden`);
      card.querySelector(`.popup__close`).removeEventListener(`keydown`, closePopup);
    }
    document.removeEventListener(`keydown`, onPopupEscPress);
  };


  const checkData = (data, el) => {

    if (!data) {
      el.innerHTML = ``;
      return false;
    }
    return true;
  };

  const cardHandler = (obj) => {
    const card = document.querySelector(`.map__card`);

    if (!card) {
      pinPlaces.appendChild(createCard(obj));
    } else {
      card.classList.add(`hidden`);
      createCard(obj);
      card.classList.remove(`hidden`);
    }

    document.querySelector(`.popup__close`).addEventListener(`click`, closePopup);
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const createCard = (obj) => {
    let card = document.querySelector(`.map__card`);

    if (!card) {
      card = cardTemplate.cloneNode(true);
    }

    const cardPhotos = card.querySelector(`.popup__photos`);
    const cardFeatures = card.querySelector(`.popup__features`);

    const features = obj.offer.features;
    const photos = obj.offer.photos;

    cardFeatures.innerHTML = ``;
    cardPhotos.innerHTML = ``;

    if (checkData(obj.offer.title, card.querySelector(`.popup__title`))) {
      card.querySelector(`.popup__title`).textContent = obj.offer.title;
    }

    if (checkData(obj.offer.address, card.querySelector(`.popup__text--address`))) {
      card.querySelector(`.popup__text--address`).textContent = obj.offer.address;
    }

    if (checkData(obj.offer.price, card.querySelector(`.popup__text--price`))) {
      card.querySelector(`.popup__text--price`).textContent = `${obj.offer.price} ₽/ночь`;
    }


    if (checkData(obj.offer.type, card.querySelector(`.popup__type`))) {
      card.querySelector(`.popup__type`).textContent = PlaceTypes[obj.offer.type];
    }

    if (checkData(obj.offer.rooms, card.querySelector(`.popup__text--capacity`))) {
      if (obj.offer.guests) {
        card.querySelector(`.popup__text--capacity`).textContent = `${obj.offer.rooms} комнаты для ${obj.offer.guests} гостей`;
      } else {
        card.querySelector(`.popup__text--capacity`).remove();
      }
    }

    if (checkData(obj.offer.checkin, card.querySelector(`.popup__text--time`))) {
      if (obj.offer.checkout) {
        card.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
      } else {
        card.querySelector(`.popup__text--time`).remove();
      }
    }

    if (checkData(features, cardFeatures)) {
      const featureFragment = document.createDocumentFragment();

      for (let i = 0; i < features.length; i++) {
        let newFeature = document.createElement(`li`);
        newFeature.classList.add(`popup__feature`);
        newFeature.classList.add(`popup__feature--${features[i]}`);
        featureFragment.appendChild(newFeature);
      }

      cardFeatures.appendChild(featureFragment);
    }

    if (checkData(obj.offer.description, card.querySelector(`.popup__description`))) {
      card.querySelector(`.popup__description`).textContent = obj.offer.description;
    }

    if (checkData(photos, cardPhotos)) {
      const photosFragment = document.createDocumentFragment();

      for (let i = 0; i < photos.length; i++) {
        let newPhoto = document.createElement(`img`);
        newPhoto.classList.add(`popup__photo`);
        newPhoto.setAttribute(`width`, `45`);
        newPhoto.setAttribute(`height`, `40`);
        newPhoto.setAttribute(`alt`, `Фотография жилья`);
        newPhoto.setAttribute(`src`, photos[i]);
        photosFragment.appendChild(newPhoto);
      }

      cardPhotos.appendChild(photosFragment);
    }


    if (checkData(obj.author.avatar, card.querySelector(`.popup__avatar`))) {
      card.querySelector(`.popup__avatar`).src = obj.author.avatar;
    }

    return card;
  };


  window.card = {
    cardHandler,
  };

})();
