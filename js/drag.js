'use strict';
(function () {
  const PIN_WIDTH = 62;
  const MAX_Y = 630;
  const MIN_Y = 130;

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

        const clientWindow = document.documentElement.offsetWidth;
        const container = handleElement.parentElement.offsetWidth;
        const minX = ((clientWindow - container) / 2) - PIN_WIDTH / 4;
        const maxX = minX + container;

        let moveX = moveEvt.clientX;
        let moveY = moveEvt.clientY;

        if (moveX > maxX) {
          moveX = maxX;
        } else if (moveX < minX) {
          moveX = minX;
        }

        if (moveY > MAX_Y) {
          moveY = MAX_Y;
        } else if (moveY < MIN_Y) {
          moveY = MIN_Y;
        }

        let shift = {
          x: startCoords.x - moveX,
          y: startCoords.y - moveY,
        };

        startCoords = {
          x: moveX,
          y: moveY
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
