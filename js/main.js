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
  const title = adForm.querySelector(`#title`);
  const type = adForm.querySelector(`#type`);
  const price = adForm.querySelector(`#price`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);
  const avatar = adForm.querySelector(`#avatar`);
  const images = adForm.querySelector(`#images`);
  const map = document.querySelector(`.map`);

  const pinPlaces = document.querySelector(`.map__pins`);
  const pin = document.querySelector(`.map__pin--main`);

  const init = () => {
    window.map.clearPins(pinPlaces);
    map.classList.add(`map--faded`);
    window.map.setAddress(window.map.getAddressCoords(pin)[`x`], window.map.getAddressCoords(pin)[`y`]);
    filtersForm.classList.add(`map__filters--disabled`);
    window.form.addAttributeDisabled(adFormElements);
    window.form.addAttributeDisabled(filtersFormFields);
    window.form.addAttributeDisabled(filtersFormSelects);
  };

  window.form.checkTitle();
  title.addEventListener(`input`, window.form.checkTitle);

  window.form.checkType();
  type.addEventListener(`change`, window.form.checkType);
  price.addEventListener(`input`, window.form.checkType);

  window.form.checkRoomsValidity();
  capacity.addEventListener(`change`, window.form.checkRoomsValidity);
  rooms.addEventListener(`change`, window.form.checkRoomsValidity);

  timeIn.addEventListener(`change`, window.form.checkTimeIn);
  timeOut.addEventListener(`change`, window.form.checkTimeOut);

  address.setAttribute(`readonly`, true);
  avatar.setAttribute(`accept`, `image/png, image/jpeg`);
  images.setAttribute(`accept`, `image/png, image/jpeg`);

  pin.addEventListener(`click`, window.form.activate);

  pin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.form.activate();
    }
  });

  window.drag.dragHandler(pin);

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), init);
  }, window.backend.errorHandler);

  init();
})();

