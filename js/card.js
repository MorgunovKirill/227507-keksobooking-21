'use strict';


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

const escPressHandler = (evt) => {
  window.util.isEscEvent(evt, closePopup);
};

const resetActiveClass = () => {
  let activePin = pinPlaces.querySelector(`.map__pin--active`);
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};

const closePopup = () => {
  resetActiveClass();
  const card = document.querySelector(`.map__card`);

  if (card) {
    card.classList.add(`hidden`);
    card.querySelector(`.popup__close`).removeEventListener(`keydown`, closePopup);
  }
  document.removeEventListener(`keydown`, escPressHandler);
};


const checkData = (data, element) => {

  if (!data) {
    element.innerHTML = ``;
    return false;
  }
  return true;
};

const cardHandler = (object) => {
  const card = document.querySelector(`.map__card`);

  if (!card) {
    pinPlaces.appendChild(createCard(object));
  } else {
    card.classList.add(`hidden`);
    createCard(object);
    card.classList.remove(`hidden`);
  }

  document.querySelector(`.popup__close`).addEventListener(`click`, closePopup);
  document.addEventListener(`keydown`, escPressHandler);
};

const createCard = (object) => {
  let card = document.querySelector(`.map__card`);

  if (!card) {
    card = cardTemplate.cloneNode(true);
  }

  const cardPhotos = card.querySelector(`.popup__photos`);
  const cardFeatures = card.querySelector(`.popup__features`);

  const features = object.offer.features;
  const photos = object.offer.photos;

  cardFeatures.innerHTML = ``;
  cardPhotos.innerHTML = ``;

  if (checkData(object.offer.title, card.querySelector(`.popup__title`))) {
    card.querySelector(`.popup__title`).textContent = object.offer.title;
  }

  if (checkData(object.offer.address, card.querySelector(`.popup__text--address`))) {
    card.querySelector(`.popup__text--address`).textContent = object.offer.address;
  }

  if (checkData(object.offer.price, card.querySelector(`.popup__text--price`))) {
    card.querySelector(`.popup__text--price`).textContent = `${object.offer.price} ₽/ночь`;
  }


  if (checkData(object.offer.type, card.querySelector(`.popup__type`))) {
    card.querySelector(`.popup__type`).textContent = PlaceTypes[object.offer.type];
  }

  if (checkData(object.offer.rooms, card.querySelector(`.popup__text--capacity`))) {
    if (object.offer.guests) {
      card.querySelector(`.popup__text--capacity`).textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
    } else {
      card.querySelector(`.popup__text--capacity`).remove();
    }
  }

  if (checkData(object.offer.checkin, card.querySelector(`.popup__text--time`))) {
    if (object.offer.checkout) {
      card.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
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

  if (checkData(object.offer.description, card.querySelector(`.popup__description`))) {
    card.querySelector(`.popup__description`).textContent = object.offer.description;
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


  if (checkData(object.author.avatar, card.querySelector(`.popup__avatar`))) {
    card.querySelector(`.popup__avatar`).src = object.author.avatar;
  }

  return card;
};


window.card = {
  cardHandler,
  resetActiveClass
};
