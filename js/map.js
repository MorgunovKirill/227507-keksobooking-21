'use strict';

(function () {
  const PIN_WIDTH = 62;
  const PIN_HEIGHT = 62;
  const PIN_POINTER_HEIGHT = 22;
  const MAX_PINS_TO_SHOW = 5;
  const PLACE_TYPES = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const pin = document.querySelector(`.map__pin--main`);
  const pinPlaces = document.querySelector(`.map__pins`);
  const placeTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

  const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

  const onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };


  // const openPopup = function () {
  //   if (popup) {
  //     popup.classList.remove(`hidden`);
  //     popup.querySelector(`.popup__close`).addEventListener(`click`, closePopup);
  //   }
  //   document.addEventListener(`keydown`, onPopupEscPress);
  // };


  const closePopup = function () {
    const card = document.querySelector(`.map__card`);
    card.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
    card.querySelector(`.popup__close`).removeEventListener(`keydown`, closePopup);
  };

  const clearPins = (container) => {
    container.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach(function (element) {
      container.removeChild(element);
    });
  };

  const createPlace = (place, index) => {
    let placeElement = placeTemplate.cloneNode(true);
    let placeImg = placeElement.querySelector(`img`);

    placeElement.setAttribute(`data-id`, index);
    placeElement.style.left = `${place.location.x - (PIN_WIDTH / 2)}px`;
    placeElement.style.top = `${place.location.y - PIN_HEIGHT}px`;
    placeImg.setAttribute(`src`, place.author.avatar);
    placeImg.setAttribute(`alt`, place.offer.title);

    return placeElement;
  };

  const checkData = (data, element) => {

    if (!data) {
      element.innerHTML = ``;
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
      card.querySelector(`.popup__type`).textContent = PLACE_TYPES[obj.offer.type];
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

  const getAddressCoords = (item) => {
    return {
      x: (parseInt(item.style.left, 10) + PIN_WIDTH / 2).toFixed(),
      y: (parseInt(pin.style.top, 10) + PIN_HEIGHT + PIN_POINTER_HEIGHT).toFixed(),
    };
  };
  const setAddress = (x, y) => {
    return x + ` , ` + y;
  };

  const renderFragment = (arr) => {

    let data = [...arr];
    let newPin;

    const pinFragment = document.createDocumentFragment();

    const takeNumber = data.length > MAX_PINS_TO_SHOW ? MAX_PINS_TO_SHOW : data.length;

    for (let i = 0; i < takeNumber; i++) {
      newPin = createPlace(data[i], i);
      newPin.addEventListener(`click`, () => {
        cardHandler(data[i]);
      });
      pinFragment.appendChild(newPin);
    }

    pinPlaces.appendChild(pinFragment);
  };

  // let cards = pinPlaces.querySelectorAll(`.map__card`);
  // cards.forEach((el) => {
  //   el.remove();
  // });
  // newCard = createCard(data[i]);
  // pinPlaces.appendChild(newCard);
  // popup = document.querySelector(`.popup`);
  // openPopup();

  const filterFragments = (arr, filterCallback) => {
    const filtered = filterCallback(arr);

    clearPins(pinPlaces);

    renderFragment(filtered);
  };

  window.map = {
    getAddressCoords,
    setAddress,
    renderFragment,
    filterFragments
  };

})();
