'use strict';

(function () {
  const MAX_ROOMS = 100;
  const PALACE_TYPE = `palace`;
  const HOUSE_TYPE = `house`;
  const FLAT_TYPE = `flat`;
  const BUNGALOW_TYPE = `bungalow`;
  const VALUE_ANY = `any`;
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;


  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.querySelectorAll(`fieldset`);
  const rooms = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const title = adForm.querySelector(`#title`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);
  const filtersForm = document.querySelector(`.map__filters`);
  const filtersFormFields = filtersForm.querySelectorAll(`fieldset`);
  const filtersFormSelects = filtersForm.querySelectorAll(`select`);
  const formResetButton = adForm.querySelector(`.ad-form__reset`);
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeaturesContainer = document.querySelector(`#housing-features`);
  const housingFeatures = housingFeaturesContainer.querySelectorAll(`input`);
  const map = document.querySelector(`.map`);
  const pinPlaces = document.querySelector(`.map__pins`);
  const pin = document.querySelector(`.map__pin--main`);
  const initialPinX = parseInt(pin.style.left, 10);
  const initialPinY = parseInt(pin.style.top, 10);

  const priceMinMap = {
    [PALACE_TYPE]: 10000,
    [HOUSE_TYPE]: 5000,
    [FLAT_TYPE]: 1000,
    [BUNGALOW_TYPE]: 0,
  };

  let offers = [];

  const successHandler = (data) => {
    offers = [...data];
  };

  const addAttributeDisabled = (array) => {
    array.forEach(function (element) {
      element.setAttribute(`disabled`, true);
    });
  };

  const removeAttributeDisabled = (array) => {
    array.forEach(function (element) {
      element.removeAttribute(`disabled`);
    });
  };

  const titleHandler = () => {
    if (title.value.length < MIN_TITLE_LENGTH) {
      title.setCustomValidity(`минимальная длина - 30 символов`);
    } else if (title.value.length > MAX_TITLE_LENGTH) {
      title.setCustomValidity(`максимальная длина - 100 символов`);
    } else {
      title.setCustomValidity(``);
    }
  };

  const typeHandler = () => {
    if (type.value === `bungalow`) {
      price.setAttribute(`placeholder`, `0`);
    }

    if (type.value === PALACE_TYPE && price.value < priceMinMap[PALACE_TYPE]) {
      price.setAttribute(`placeholder`, `10000`);
      price.setCustomValidity(`Минимальная цена за ночь: 10 000`);
    } else if (type.value === HOUSE_TYPE && price.value < priceMinMap[HOUSE_TYPE]) {
      price.setAttribute(`placeholder`, `5000`);
      price.setCustomValidity(`Минимальная цена за ночь: 5 000`);
    } else if (type.value === FLAT_TYPE && price.value < priceMinMap[FLAT_TYPE]) {
      price.setAttribute(`placeholder`, `1000`);
      price.setCustomValidity(`Минимальная цена за ночь: 1 000`);
    } else if (price.value.length === 0) {
      price.setCustomValidity(`Нужно задать цену за ночь`);
    } else {
      price.setCustomValidity(``);
    }
  };

  const timeInHandler = () => {
    timeOut.value = timeIn.value;
  };

  const timeOutHandler = () => {
    timeIn.value = timeOut.value;
  };

  const roomsValidityHandler = () => {
    if (rooms.value === `${MAX_ROOMS}` && capacity.value !== `0`) {
      capacity.setCustomValidity(`Не для гостей`);
    } else if (rooms.value === `1` && capacity.value !== `1`) {
      capacity.setCustomValidity(`для 1 гостя`);
    } else if (rooms.value === `2`) {
      capacity.setCustomValidity(`для 2 гостей или для 1 гостя`);
      if (capacity.value === `1` || capacity.value === `2`) {
        capacity.setCustomValidity(``);
      }
    } else if (rooms.value === `3`) {
      capacity.setCustomValidity(`для 3 гостей, для 2 гостей или для 1 гостя`);
      if (capacity.value === `1` || capacity.value === `2` || capacity.value === `3`) {
        capacity.setCustomValidity(``);
      }
    } else {
      capacity.setCustomValidity(``);
    }
  };

  const enterPressHandler = (evt) => {
    window.util.isEnterEvent(evt, activate);
  };

  const mouseMainButtonHandler = (evt) => {
    window.util.isMouseMainButton(evt, activate);
  };

  const activate = () => {
    formResetButton.addEventListener(`click`, init);
    pin.removeEventListener(`mousedown`, mouseMainButtonHandler);
    pin.removeEventListener(`keydown`, enterPressHandler);

    if (map.classList.contains(`map--faded`)) {
      window.map.renderFragment(offers);
    }

    window.map.setAddress(window.map.getAddressCoords(pin)[`x`], window.map.getAddressCoords(pin)[`y`]);

    map.classList.remove(`map--faded`);

    adForm.classList.remove(`ad-form--disabled`);

    removeAttributeDisabled(adFormElements);
    removeAttributeDisabled(filtersFormFields);
    removeAttributeDisabled(filtersFormSelects);

    titleHandler();
    title.addEventListener(`input`, titleHandler);

    typeHandler();
    type.addEventListener(`change`, typeHandler);
    price.addEventListener(`input`, typeHandler);

    roomsValidityHandler();
    capacity.addEventListener(`change`, roomsValidityHandler);
    rooms.addEventListener(`change`, roomsValidityHandler);

    timeIn.addEventListener(`change`, timeInHandler);
    timeOut.addEventListener(`change`, timeOutHandler);

    filtersForm.classList.remove(`map__filters--disabled`);
  };

  const init = () => {
    formResetButton.removeEventListener(`click`, init);
    pin.addEventListener(`mousedown`, mouseMainButtonHandler);
    pin.addEventListener(`keydown`, enterPressHandler);
    window.map.clearPins(pinPlaces);
    map.classList.add(`map--faded`);
    pin.style.top = initialPinY + `px`;
    pin.style.left = initialPinX + `px`;
    filtersForm.classList.add(`map__filters--disabled`);
    adForm.classList.add(`ad-form--disabled`);
    adForm.reset();
    window.map.setAddress((initialPinX + (MAIN_PIN_WIDTH / 2)), (initialPinY - (MAIN_PIN_HEIGHT / 2)));
    housingType.value = VALUE_ANY;
    housingPrice.value = VALUE_ANY;
    housingRooms.value = VALUE_ANY;
    housingGuests.value = VALUE_ANY;
    housingFeatures.forEach((element)=> {
      element.checked = false;
    });
    title.removeEventListener(`input`, titleHandler);
    type.removeEventListener(`change`, typeHandler);
    price.removeEventListener(`input`, typeHandler);
    capacity.removeEventListener(`change`, roomsValidityHandler);
    rooms.removeEventListener(`change`, roomsValidityHandler);
    timeIn.removeEventListener(`change`, timeInHandler);
    timeOut.removeEventListener(`change`, timeOutHandler);
    addAttributeDisabled(adFormElements);
    addAttributeDisabled(filtersFormFields);
    addAttributeDisabled(filtersFormSelects);
  };


  housingType.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  housingPrice.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  housingRooms.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  housingGuests.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  housingFeaturesContainer.addEventListener(`change`, () => {
    window.util.debounce(window.map.filterFragments(offers, window.filter.filterPlaces));
  });

  window.backend.load(successHandler, window.backend.errorHandler);

  window.form = {
    init,
  };

})();
