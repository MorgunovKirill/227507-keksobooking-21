'use strict';

const adForm = document.querySelector(`.ad-form`);
const address = adForm.querySelector(`#address`);
const avatar = adForm.querySelector(`#avatar`);
const images = adForm.querySelector(`#images`);
const pin = document.querySelector(`.map__pin--main`);

address.setAttribute(`readonly`, true);
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


