'use strict'
const PLACE_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_OPTIONS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_OPTIONS = [`12:00`, `13:00`, `14:00`];
const FEATURES_OPTIONS = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

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
}

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const generateAuthor = (maxNumber) => {
  return {
    avatar: `img/avatars/user0${Math.ceil(Math.random() * maxNumber)}.png`
  }
}

const generateOffer = (title, locationX, locationY, price, type, rooms, guests, checkin, checkout, features, description, photos) => {
  return {
    title: title.toString(),
    address: `${locationX}, ${locationY}`,
    price: parseInt(price),
    type: getRandomItem(type),
    rooms: parseInt(rooms),
    guests: parseInt(guests),
    checkin: getRandomItem(checkin),
    checkout: getRandomItem(checkout),
    features: getSeveralItems(features),
    description: description.toString(),
    photos: getSeveralItems(photos),
  }
}

const generateLocation = (xMax, yMin, yMax) => {
  return {
    x: Math.floor(Math.random() * xMax),
    y: randomInteger(yMin, yMax),
  }
}

const generatePlace = (author, offer, location) => {
  return {
    author: author,
    offer: offer,
    location: location
  };
};

console.log(generatePlace(generateAuthor(6), generateOffer(`заголовок`, 25, 35, 500, PLACE_TYPE, 3, 6, CHECKIN_OPTIONS, CHECKOUT_OPTIONS, FEATURES_OPTIONS, `крутое место`, PHOTOS), generateLocation(300, 130, 630)));

map.classList.remove(`map--faded`);
