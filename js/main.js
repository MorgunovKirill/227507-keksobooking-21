'use strict';
(function () {
  const init = () => {
    window.form.address.value = window.map.setAddress(window.map.getAddressCoords(window.map.pin)[`x`], window.map.getAddressCoords(window.map.pin)[`y`]);
    window.form.filtersForm.classList.add(`map__filters--disabled`);
    window.form.addAttributeDisabled(window.form.adFormElements);
    window.form.addAttributeDisabled(window.form.filtersFormFields);
    window.form.addAttributeDisabled(window.form.filtersFormSelects);
  };

  const activate = () => {
    if (window.map.map.classList.contains(`map--faded`)) {
      window.map.renderFragment(window.util.mockmax, window.map.places);
    }

    window.map.map.classList.remove(`map--faded`);

    window.form.form.classList.remove(`ad-form--disabled`);

    window.form.removeAttributeDisabled(window.form.adFormElements);
    window.form.removeAttributeDisabled(window.form.filtersFormFields);
    window.form.removeAttributeDisabled(window.form.filtersFormSelects);

    window.form.filtersForm.classList.remove(`map__filters--disabled`);

    window.form.address.value = window.map.setAddress(window.map.getAddressCoords(window.map.pin)[`x`], window.map.getAddressCoords(window.map.pin)[`y`]);
  };


  window.form.checkRoomsValidity();
  window.form.capacity.addEventListener(`change`, window.form.checkRoomsValidity);
  window.form.rooms.addEventListener(`change`, window.form.checkRoomsValidity);

  // capacity.addEventListener(`change`, function () {
  //   checkRoomsValidity();
  // });

  // rooms.addEventListener(`change`, function () {
  //   checkRoomsValidity();
  // });

  window.map.pin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      activate();
    }
  });

  window.map.pin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activate();
    }
  });

  init();
})();
