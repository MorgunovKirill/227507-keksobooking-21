'use strict';

(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.querySelectorAll(`fieldset`);
  const filtersForm = document.querySelector(`.map__filters`);
  const filtersFormFields = filtersForm.querySelectorAll(`fieldset`);
  const filtersFormSelects = filtersForm.querySelectorAll(`select`);
  const address = adForm.querySelector(`#address`);

  const rooms = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);


  window.form = {
    addAttributeDisabled: (arr) => {
      arr.forEach(function (el) {
        el.setAttribute(`disabled`, true);
      });
    },
    removeAttributeDisabled: (arr) => {
      arr.forEach(function (el) {
        el.removeAttribute(`disabled`);
      });
    },
    checkRoomsValidity: () => {
      if (rooms.value === `${window.util.maxrooms}` && capacity.value !== `0`) {
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
      // if (rooms.value === `${MAX_ROOMS}` && capacity.value !== `0`) {
      //   capacity.setCustomValidity(`"Не для гостей"`);
      // } else if (rooms.value !== `${MAX_ROOMS}` && capacity.value === `0`) {
      //   capacity.setCustomValidity(`"Не для гостей" нельзя поставить для Вашего помещения`);
      // } else if (rooms.value < capacity.value) {
      //   capacity.setCustomValidity(`Нельзя разместить столько гостей`);
      // } else {
      //   capacity.setCustomValidity(``);
      // }
    },
    address,
    rooms,
    capacity,
    form: adForm,
    adFormElements,
    filtersForm,
    filtersFormFields,
    filtersFormSelects
  };

})();
