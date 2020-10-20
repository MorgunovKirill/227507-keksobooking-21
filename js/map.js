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
  const filtersContainer = document.querySelector(`.map__filters-container`);


  const placeTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

  const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);


  const clearPins = (container) => {
    container.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach(function (element) {
      container.removeChild(element);
    });
  };

  const createPlace = (place) => {
    let placeElement = placeTemplate.cloneNode(true);
    let placeImg = placeElement.querySelector(`img`);

    placeElement.style.left = `${place.location.x - (PIN_WIDTH / 2)}px`;
    placeElement.style.top = `${place.location.y - PIN_HEIGHT}px`;
    placeImg.setAttribute(`src`, place.author.avatar);
    placeImg.setAttribute(`alt`, place.offer.title);

    return placeElement;
  };

  const checkData = (data, element) => {
    if (!data.length) {
      element.remove();
      return false;
    }
    return true;
  };

  const createCard = (arr) => {
    const card = cardTemplate.cloneNode(true);
    const cardPhotos = card.querySelector(`.popup__photos`);
    const cardFeatures = card.querySelector(`.popup__features`);
    const photoTemplate = cardPhotos.querySelector(`.popup__photo`);
    const features = arr[0].offer.features;

    cardPhotos.innerHTML = ``;

    if (checkData(arr[0].offer.title, card.querySelector(`.popup__title`))) {
      card.querySelector(`.popup__title`).textContent = arr[0].offer.title;
    }

    if (checkData(arr[0].offer.address, card.querySelector(`.popup__text--address`))) {
      card.querySelector(`.popup__text--address`).textContent = arr[0].offer.address;
    }

    if (checkData(arr[0].offer.price, card.querySelector(`.popup__text--price`))) {
      card.querySelector(`.popup__text--price`).textContent = `${arr[0].offer.price} ₽/ночь`;
    }


    if (checkData(arr[0].offer.type, card.querySelector(`.popup__type`))) {
      card.querySelector(`.popup__type`).textContent = PLACE_TYPES[arr[0].offer.type];
    }

    if (checkData(arr[0].offer.rooms, card.querySelector(`.popup__text--capacity`))) {
      if (arr[0].offer.guests) {
        card.querySelector(`.popup__text--capacity`).textContent = `${arr[0].offer.rooms} комнаты для ${arr[0].offer.guests} гостей`;
      } else {
        card.querySelector(`.popup__text--capacity`).remove();
      }
    }

    if (checkData(arr[0].offer.checkin, card.querySelector(`.popup__text--time`))) {
      if (arr[0].offer.checkout) {
        card.querySelector(`.popup__text--time`).textContent = `Заезд после ${arr[0].offer.checkin}, выезд до ${arr[0].offer.checkout}`;
      } else {
        card.querySelector(`.popup__text--time`).remove();
      }
    }

    if (checkData(features, cardFeatures)) {
      for (let i = 0; i < features.length; i++) {
        cardFeatures.querySelectorAll(`.popup__feature`).forEach(function (element) {
          if (element.classList.contains(`popup__feature` + `--${features[i]}`)) {
            element.style.display = `inline-block`;
          }
        });
      }
    }

    if (checkData(arr[0].offer.description, card.querySelector(`.popup__description`))) {
      card.querySelector(`.popup__description`).textContent = arr[0].offer.description;
    }

    if (checkData(arr[0].offer.photos, cardPhotos)) {
      arr[0].offer.photos.forEach(function (element) {
        let newPhoto = photoTemplate.cloneNode(true);
        newPhoto.setAttribute(`src`, element);
        cardPhotos.appendChild(newPhoto);
      });
    }

    if (checkData(arr[0].author.avatar, card.querySelector(`.popup__avatar`))) {
      card.querySelector(`.popup__avatar`).src = arr[0].author.avatar;
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

  const renderFragment = (arr, filterCallback) => {

    let data = [...arr];

    if (filterCallback) {
      data = window.filter.filterHousing(data);
    }

    clearPins(pinPlaces);

    const pinFragment = document.createDocumentFragment();

    const takeNumber = data.length > MAX_PINS_TO_SHOW ? MAX_PINS_TO_SHOW : data.length;

    for (let i = 0; i < takeNumber; i++) {
      pinFragment.appendChild(createPlace(data[i]));
    }
    pinPlaces.appendChild(pinFragment);

    let card = createCard(data);

    filtersContainer.insertAdjacentElement(`beforebegin`, card);
  };

  window.map = {
    getAddressCoords,
    setAddress,
    renderFragment,
  };

})();
