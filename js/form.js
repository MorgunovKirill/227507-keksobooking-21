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

    if (type.value === `palace` && price.value < 10000) {
      price.setAttribute(`placeholder`, `10000`);
      price.setCustomValidity(`Минимальная цена за ночь: 10 000`);
    } else if (type.value === `house` && price.value < 5000) {
      price.setAttribute(`placeholder`, `5000`);
      price.setCustomValidity(`Минимальная цена за ночь: 5 000`);
    } else if (type.value === `flat` && price.value < 1000) {
      price.setAttribute(`placeholder`, `1000`);
      price.setCustomValidity(`Минимальная цена за ночь: 1 000`);
    } else if (price.value.length === 0) {
      price.setCustomValidity(`Нужно задать цену за ночь`);
    } else {
      price.setCustomValidity(``);
    }
  };

  const checkPrice = () => {
    if (price.value > 1000000) {
      price.setCustomValidity(`Максимальная цена за ночь: 1 000 000`);
    }
  };

  const checkTimeIn = () => {
    if (timeIn.value === `12:00`) {
      timeOut.value = `12:00`;
    } else if (timeIn.value === `13:00`) {
      timeOut.value = `13:00`;
    } else if (timeIn.value === `14:00`) {
      timeOut.value = `14:00`;
    }
  };

  const checkTimeOut = () => {
    if (timeOut.value === `12:00`) {
      timeIn.value = `12:00`;
    } else if (timeOut.value === `13:00`) {
      timeIn.value = `13:00`;
    } else if (timeOut.value === `14:00`) {
      timeIn.value = `14:00`;
    }
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
    checkPrice,
    checkTimeIn,
    checkTimeOut
  };

})();
