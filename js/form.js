'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const rooms = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const title = adForm.querySelector(`#title`);
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
    checkTitle
  };

})();
