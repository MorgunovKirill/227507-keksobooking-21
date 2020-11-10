'use strict';
(function () {
  const VALUE_ANY = `any`;
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const adForm = document.querySelector(`.ad-form`);
  const adFormElements = adForm.querySelectorAll(`fieldset`);
  const filtersForm = document.querySelector(`.map__filters`);
  const filtersFormFields = filtersForm.querySelectorAll(`fieldset`);
  const filtersFormSelects = filtersForm.querySelectorAll(`select`);
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeaturesContainer = document.querySelector(`#housing-features`);
  const housingFeatures = housingFeaturesContainer.querySelectorAll(`input`);
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
  const formResetButton = adForm.querySelector(`.ad-form__reset`);
  const map = document.querySelector(`.map`);

  const pinPlaces = document.querySelector(`.map__pins`);
  const pin = document.querySelector(`.map__pin--main`);
  const initialPinX = parseInt(pin.style.left, 10);
  const initialPinY = parseInt(pin.style.top, 10);


  address.setAttribute(`readonly`, true);

  const init = () => {
    pin.addEventListener(`mousedown`, window.form.mouseMainButtonHandler);
    pin.addEventListener(`keydown`, window.form.enterPressHandler);
    window.map.clearPins(pinPlaces);
    map.classList.add(`map--faded`);
    pin.style.top = initialPinY + `px`;
    pin.style.left = initialPinX + `px`;
    filtersForm.classList.add(`map__filters--disabled`);
    adForm.classList.add(`ad-form--disabled`);
    adForm.reset();
    window.map.setAddress((initialPinX + (MAIN_PIN_WIDTH / 2)), (initialPinY + (MAIN_PIN_HEIGHT / 2)));
    housingType.value = VALUE_ANY;
    housingPrice.value = VALUE_ANY;
    housingRooms.value = VALUE_ANY;
    housingGuests.value = VALUE_ANY;
    housingFeatures.forEach((element)=> {
      element.checked = false;
    });
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

  avatar.setAttribute(`accept`, `image/png, image/jpeg`);
  images.setAttribute(`accept`, `image/png, image/jpeg`);

  // pin.addEventListener(`click`, window.form.activate);

  // pin.addEventListener(`keydown`, function (evt) {
  //   if (evt.key === `Enter`) {
  //     window.form.activate();
  //   }
  // });

  window.drag.dragHandler(pin);

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), () => {
      init();
      window.backend.successHandler();
    }, window.backend.uploadErrorHandler);
  });

  init();
})();


