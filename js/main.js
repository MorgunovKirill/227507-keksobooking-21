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
  const housingType = document.getElementById(`housing-type`);

  const map = document.querySelector(`.map`);
  const pin = document.querySelector(`.map__pin--main`);
  let offers = [];

  const successHandler = (data) => {
    offers = [...data];
  };

  const init = () => {
    address.value = window.map.setAddress(window.map.getAddressCoords(pin)[`x`], window.map.getAddressCoords(pin)[`y`]);
    filtersForm.classList.add(`map__filters--disabled`);
    window.form.addAttributeDisabled(adFormElements);
    window.form.addAttributeDisabled(filtersFormFields);
    window.form.addAttributeDisabled(filtersFormSelects);
  };

  const activate = () => {

    if (map.classList.contains(`map--faded`)) {
      window.map.renderFragment(offers);
    }

    map.classList.remove(`map--faded`);

    adForm.classList.remove(`ad-form--disabled`);

    window.form.removeAttributeDisabled(adFormElements);
    window.form.removeAttributeDisabled(filtersFormFields);
    window.form.removeAttributeDisabled(filtersFormSelects);

    filtersForm.classList.remove(`map__filters--disabled`);

    address.value = window.map.setAddress(window.map.getAddressCoords(pin)[`x`], window.map.getAddressCoords(pin)[`y`]);
  };

  window.form.checkRoomsValidity();
  capacity.addEventListener(`change`, window.form.checkRoomsValidity);
  rooms.addEventListener(`change`, window.form.checkRoomsValidity);

  pin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      activate();
    }
  });

  pin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activate();
    }
  });

  housingType.addEventListener(`change`, () => {
    window.map.renderFragment(offers, window.filter.filterHousing);
  });

  init();
  window.backend.load(successHandler, window.backend.errorHandler);
})();
