'use strict';

const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 62;
const MAIN_PIN_POINTER_HEIGHT = 22;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MAX_PINS_TO_SHOW = 5;

const pinPlaces = document.querySelector(`.map__pins`);
const adForm = document.querySelector(`.ad-form`);
const address = adForm.querySelector(`#address`);
const placeTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const clearPins = (container) => {
  let card = container.querySelector(`.map__card`);
  if (card) {
    container.removeChild(card);
  }
  container.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((element) => {
    container.removeChild(element);
  });
};

const createPlace = (place) => {
  let placeElement = placeTemplate.cloneNode(true);
  let placeImg = placeElement.querySelector(`img`);

  placeElement.style.left = `${place.location.x + (PIN_WIDTH / 2)}px`;
  placeElement.style.top = `${place.location.y - PIN_HEIGHT}px`;
  placeImg.setAttribute(`src`, place.author.avatar);
  placeImg.setAttribute(`alt`, place.offer.title);

  return placeElement;
};

const getAddressCoords = (item) => {
  return {
    x: (parseInt(item.style.left, 10) + MAIN_PIN_WIDTH / 2).toFixed(),
    y: (parseInt(item.style.top, 10) - MAIN_PIN_HEIGHT - MAIN_PIN_POINTER_HEIGHT).toFixed(),
  };
};

const setAddress = (x, y) => {
  address.value = x + ` , ` + y;
};

const renderFragment = (arr) => {

  let data = [...arr];
  let newPin;
  const pinFragment = document.createDocumentFragment();

  const takeNumber = data.length > MAX_PINS_TO_SHOW ? MAX_PINS_TO_SHOW : data.length;

  for (let i = 0; i < takeNumber; i++) {
    newPin = createPlace(data[i], i);
    newPin.addEventListener(`click`, (evt) => {
      window.card.resetActiveClass();
      evt.target.closest(`.map__pin`).classList.add(`map__pin--active`);
      window.card.cardHandler(data[i]);
    });
    pinFragment.appendChild(newPin);
  }

  pinPlaces.appendChild(pinFragment);
};

const filterFragments = (arr, filterCallback) => {
  const filtered = filterCallback(arr);

  clearPins(pinPlaces);

  renderFragment(filtered);
};

window.map = {
  getAddressCoords,
  setAddress,
  renderFragment,
  filterFragments,
  clearPins
};

