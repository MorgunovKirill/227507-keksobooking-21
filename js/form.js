'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const rooms = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const title = adForm.querySelector(`#title`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);
  const MAX_ROOMS = 100;
  const PALACE_TYPE = `palace`;
  const HOUSE_TYPE = `house`;
  const FLAT_TYPE = `flat`;
  const BUNGALOW_TYPE = `bungalow`;

  const priceMinMap = {
    [PALACE_TYPE]: 10000,
    [HOUSE_TYPE]: 5000,
    [FLAT_TYPE]: 1000,
    [BUNGALOW_TYPE]: 0,
  };


  const addAttributeDisabled = (arr) => {
    arr.forEach(function (el) {
      el.setAttribute(`disabled`, true);
    });
  };

  const removeAttributeDisabled = (arr) => {
    arr.forEach(function (el) {
      el.removeAttribute(`disabled`);
    });
  };

  const checkTitle = () => {
    if (title.value.length < 30) {
      title.setCustomValidity(`минимальная длина - 30 символов`);
    } else if (title.value.length > 100) {
      title.setCustomValidity(`максимальная длина - 100 символов`);
    } else {
      title.setCustomValidity(``);
    }
  };

  const checkType = () => {
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

  const checkTimeIn = () => {
    timeOut.value = timeIn.value;
  };

  const checkTimeOut = () => {
    timeIn.value = timeOut.value;
  };

  const checkRoomsValidity = () => {
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

  window.form = {
    addAttributeDisabled,
    removeAttributeDisabled,
    checkRoomsValidity,
    checkTitle,
    checkType,
    checkTimeIn,
    checkTimeOut
  };

})();
