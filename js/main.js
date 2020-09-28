'use strict';

const PLACE_OFFERS = 8;
const PLACE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_OPTIONS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_OPTIONS = [`12:00`, `13:00`, `14:00`];
const FEATURES_OPTIONS = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTO_PATTERN = `http://o0.github.io/assets/images/tokyo/hotel`;
const PHOTO_EXT = `.jpg`;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;


const map = document.querySelector(`.map`);

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
    let item = getRandomItem(arr);

    while (output.includes(item)) {
      item = getRandomItem(arr);
    }

    output.push(item);
  }

  return output;
};

const getPhotos = (pattern, ext, quantity) => {
  let output = [];
  for (let i = 0; i < quantity; i++) {
    let item = pattern + randomInteger(0, PLACE_OFFERS) + ext;
    while (output.includes(item)) {
      item = pattern + randomInteger(0, PLACE_OFFERS) + ext;
    }
    output.push(item);
  }

  return output;
}

const generateOffer = () => {
  let obj =
   {
    title: `заголовок`,
    address: `${randomInteger(0, 1000)}, ${randomInteger(0, 1000)}`,
    price: randomInteger(20000, 100000),
    type: getRandomItem(PLACE_TYPES),
    rooms: randomInteger(1, 5),
    guests: randomInteger(1, 8),
    checkin: getRandomItem(CHECKIN_OPTIONS),
    checkout: getRandomItem(CHECKOUT_OPTIONS),
    features: getSeveralItems(FEATURES_OPTIONS),
    description: `описание`,
    photos: getPhotos(PHOTO_PATTERN, PHOTO_EXT, randomInteger(1, PLACE_OFFERS)),
  };
  console.log(obj);
  return obj;
};

const generateLocation = (xMax, yMin, yMax) => {
  return {
    x: Math.floor(Math.random() * xMax),
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

for (let i = 1; i <= PLACE_OFFERS; i++) {
  let author = {
    avatar: `img/avatars/user0${i}.png`
  };
  fragment.appendChild(renderPlace(generatePlace(author, generateOffer(), generateLocation(map.offsetWidth, LOCATION_Y_MIN, LOCATION_Y_MAX))));
}

const places = document.querySelector(`.map__pins`);

places.appendChild(fragment);

map.classList.remove(`map--faded`);
