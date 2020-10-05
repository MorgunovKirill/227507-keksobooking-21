'use strict';

const MOCK_MAX = 8;
const PLACE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_OPTIONS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_OPTIONS = [`12:00`, `13:00`, `14:00`];
const FEATURES_OPTIONS = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTO_PATTERN = `http://o0.github.io/assets/images/tokyo/hotel`;
const PHOTO_EXT = `.jpg`;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const PIN_WIDTH = 62;
const PIN_HEIGHT = 62;
const PIN_POINTER_HEIGHT = 22;
const MIN_ADDRESS = 0;
const MAX_ADDRESS = 1000;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const MIN_GUESTS = 1;
const MAX_GUESTS = 100;
const MIN_ROOMS = 1;
const MAX_ROOMS = 100;

const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const adFormElements = adForm.querySelectorAll(`fieldset`);
const filtersForm = document.querySelector(`.map__filters`);
const pin = document.querySelector(`.map__pin--main`);
const address = adForm.querySelector(`#address`);
const rooms = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

const activateForm = function () {
  map.classList.remove(`map--faded`);

  adForm.classList.remove(`ad-form--disabled`);

  adFormElements.forEach(function (el) {
    el.removeAttribute(`disabled`);
  });

  filtersForm.classList.remove(`map__filters--disabled`);

  address.value = `${(parseInt(pin.style.left, 10) + PIN_WIDTH / 2).toFixed()} , ${(parseInt(pin.style.top, 10) + PIN_HEIGHT + PIN_POINTER_HEIGHT).toFixed()}`;
};

const checkRoomsValidity = function () {
  if (capacity.value > rooms.value && rooms.value !== `100`) {
    capacity.setCustomValidity(`Нельзя разместить столько гостей`);
  } else if (rooms.value === `100` && capacity.value !== `0`) {
    capacity.setCustomValidity(`Вашему помещению можно поставить только "Не для гостей"`);
  } else {
    capacity.setCustomValidity(``);
  }
};

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getRandomItem = (arr) => {
  return arr[randomInteger(0, arr.length - 1)];
};

const getSeveralItems = (arr) => {
  let itemsQuantity = randomInteger(1, arr.length);
  let output = [];

  for (let i = 0; i < itemsQuantity; i++) {
    output.push(getRandomItem(arr));
  }

  return output;
};

const generatePhotos = (pattern, ext, quantity) => {
  let output = [];
  for (let i = 0; i < quantity; i++) {
    output.push(pattern + randomInteger(0, MOCK_MAX) + ext);
  }

  return output;
};

const generateOffer = () => {
  let obj =
  {
    title: `заголовок`,
    address: randomInteger(MIN_ADDRESS, MAX_ADDRESS),
    price: randomInteger(MIN_PRICE, MAX_PRICE),
    type: getRandomItem(PLACE_TYPES),
    rooms: randomInteger(MIN_ROOMS, MAX_ROOMS),
    guests: randomInteger(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomItem(CHECKIN_OPTIONS),
    checkout: getRandomItem(CHECKOUT_OPTIONS),
    features: getSeveralItems(FEATURES_OPTIONS),
    description: `описание`,
    photos: generatePhotos(PHOTO_PATTERN, PHOTO_EXT, randomInteger(1, MOCK_MAX)),
  };

  return obj;
};

const generateLocation = (xMax, yMin, yMax) => {
  return {
    x: randomInteger(0, xMax),
    y: randomInteger(yMin, yMax),
  };
};


const generatePlace = (author, offer, location) => {
  return {
    author,
    offer,
    location
  };
};

const renderPlace = function (place) {
  let placeElement = placeTemplate.cloneNode(true);
  let placeImg = placeElement.querySelector(`img`);

  placeElement.style.left = `${place.location.x - (PIN_WIDTH / 2)}px`;
  placeElement.style.top = `${place.location.y - PIN_HEIGHT}px`;
  placeImg.setAttribute(`src`, place.author.avatar);
  placeImg.setAttribute(`alt`, place.offer.title);

  return placeElement;
};

const placeTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

let fragment = document.createDocumentFragment();

for (let i = 1; i <= MOCK_MAX; i++) {
  let author = {
    avatar: `img/avatars/user0${i}.png`
  };
  fragment.appendChild(renderPlace(generatePlace(author, generateOffer(), generateLocation(map.offsetWidth, LOCATION_Y_MIN, LOCATION_Y_MAX))));
}

const places = document.querySelector(`.map__pins`);

places.appendChild(fragment);


adFormElements.forEach(function (el) {
  el.setAttribute(`disabled`, `disabled`);
});

filtersForm.classList.add(`map__filters--disabled`);

pin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    activateForm();
  }
});


pin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    activateForm();
  }
});


address.value = `${(parseInt(pin.style.left, 10) + PIN_WIDTH / 2).toFixed()} , ${(parseInt(pin.style.top, 10) + PIN_HEIGHT / 2).toFixed()}`;

checkRoomsValidity();

capacity.addEventListener(`change`, function () {
  checkRoomsValidity();
});

rooms.addEventListener(`change`, function () {
  checkRoomsValidity();
});

