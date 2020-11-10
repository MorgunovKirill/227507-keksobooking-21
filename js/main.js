'use strict';
(function () {
  const adForm = document.querySelector(`.ad-form`);

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
  const pin = document.querySelector(`.map__pin--main`);

  address.setAttribute(`readonly`, true);

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

  window.drag.dragHandler(pin);

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), () => {
      window.form.init();
      window.backend.successHandler();
    }, window.backend.uploadErrorHandler);
  });

  window.form.init();
})();


