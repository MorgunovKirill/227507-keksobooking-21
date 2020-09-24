'use strict';

const PLACE_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_OPTIONS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_OPTIONS = [`12:00`, `13:00`, `14:00`];
const FEATURES_OPTIONS = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const map = document.querySelector(`.map`);

const getRandomItem = (arr) => {
  return arr[Math.floor(arr.length * Math.random())];
};

const getSeveralItems = (arr) => {
  let output = [getRandomItem(arr)];
  arr.forEach((element) => {
    if (!(output.includes(element)) && (Math.random() < 0.5)) {
      output.push(element);
    }
  });
  return output;
};

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// const generateAuthor = (maxNumber) => {
//   return {
//     avatar: `img/avatars/user0${Math.ceil(Math.random() * maxNumber)}.png`
//   };
// };

// const generateOffer = (title, locationX, locationY, price, type, rooms, guests, checkin, checkout, features, description, photos) => {
//   return {
//     title: title.toString(),
//     address: `${locationX}, ${locationY}`,
//     price: parseInt(price, 10),
//     type: getRandomItem(type),
//     rooms: parseInt(rooms, 10),
//     guests: parseInt(guests, 10),
//     checkin: getRandomItem(checkin),
//     checkout: getRandomItem(checkout),
//     features: getSeveralItems(features),
//     description: description.toString(),
//     photos: getSeveralItems(photos),
//   };
// };

// const generateAuthor = () => {
//   return {
//     avatar: `img/avatars/user0${Math.ceil(Math.random() * 9)}.png`
//   };
// };

const generateOffer = () => {
  return {
    title: `заголовок`,
    address: `${Math.ceil(Math.random() * 1000)}, ${Math.ceil(Math.random() * 1000)}`,
    price: randomInteger(20000, 100000),
    type: getRandomItem(PLACE_TYPE),
    rooms: randomInteger(1, 5),
    guests: randomInteger(1, 8),
    checkin: getRandomItem(CHECKIN_OPTIONS),
    checkout: getRandomItem(CHECKOUT_OPTIONS),
    features: getSeveralItems(FEATURES_OPTIONS),
    description: `описание`,
    photos: getSeveralItems(PHOTOS),
  };
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

for (let i = 1; i < 9; i++) {
  let author = {
    avatar: `img/avatars/user0${i}.png`
  };
  fragment.appendChild(renderPlace(generatePlace(author, generateOffer(), generateLocation(map.offsetWidth, LOCATION_Y_MIN, LOCATION_Y_MAX))));
}

const places = document.querySelector(`.map__pins`);

places.appendChild(fragment);

map.classList.remove(`map--faded`);
