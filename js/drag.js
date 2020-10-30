'use strict';
(function () {
  const adForm = document.querySelector(`.ad-form`);
  const address = adForm.querySelector(`#address`);
  const pin = document.querySelector(`.map__pin--main`);

  const dragHandler = (handleElement, activateHandler) => {

    handleElement.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        address.value = window.map.setAddress(window.map.getAddressCoords(pin)[`x`], window.map.getAddressCoords(pin)[`y`]);

        dragged = true;

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        handleElement.style.top = (handleElement.offsetTop - shift.y) + `px`;
        handleElement.style.left = (handleElement.offsetLeft - shift.x) + `px`;
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        address.value = window.map.setAddress(window.map.getAddressCoords(pin)[`x`], window.map.getAddressCoords(pin)[`y`]);

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        if (dragged) {
          handleElement.removeEventListener(`click`, activateHandler);
        } else {
          handleElement.addEventListener(`click`, activateHandler);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.drag = {
    dragHandler
  };
})();
