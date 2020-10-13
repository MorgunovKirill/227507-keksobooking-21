'use strict';

(function () {
  const MOCK_MAX = 8;
  const PLACE_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const CHECKIN_OPTIONS = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT_OPTIONS = [`12:00`, `13:00`, `14:00`];
  const FEATURES_OPTIONS = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTO_PATTERN = `http://o0.github.io/assets/images/tokyo/hotel`;
  const PHOTO_EXT = `.jpg`;
  const MIN_ADDRESS = 0;
  const MAX_ADDRESS = 1000;
  const MIN_PRICE = 0;
  const MAX_PRICE = 1000000;
  const MIN_GUESTS = 1;
  const MAX_GUESTS = 100;
  const MIN_ROOMS = 1;
  const MAX_ROOMS = 100;

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

  window.data = {
    generateOffer,
    generateLocation,
    generatePlace,
    MAX_ROOMS,
    MOCK_MAX,
  };
})();
