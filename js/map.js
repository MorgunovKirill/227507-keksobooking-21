'use strict';

(function () {
  const PIN_WIDTH = 62;
  const PIN_HEIGHT = 62;
  const PIN_POINTER_HEIGHT = 22;
  const MAX_PINS_TO_SHOW = 5;


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

  const createCard = (arr) => {
    let card = cardTemplate.cloneNode(true);
    let cardPhotos = card.querySelector(`.popup__photos`);

    card.querySelector(`.popup__title`).textContent = arr[0].offer.title;
    card.querySelector(`.popup__text--address`).textContent = arr[0].offer.address;
    card.querySelector(`.popup__text--price`).textContent = `${arr[0].offer.price} ₽/ночь`;
    card.querySelector(`.popup__type`).textContent = `${arr[0].offer.type}`;
    card.querySelector(`.popup__text--capacity`).textContent = `${arr[0].offer.rooms} комнаты для ${arr[0].offer.guests} гостей`;
    card.querySelector(` .popup__text--time`).textContent = `Заезд после ${arr[0].offer.checkin}, выезд до ${arr[0].offer.checkout}`;
    // card.querySelector(`.popup__features`).textContent = `${arr[0].offer.features.join(` `)}`;
    card.querySelector(`.popup__description`).textContent = arr[0].offer.description;
    // card.querySelector(`.popup__photos`).textContent = `${arr[0].offer.photos.join(` `)}`;
    card.querySelector(`.popup__avatar`).src = arr[0].author.avatar;

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
