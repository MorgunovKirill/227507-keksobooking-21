'use strict';
(function () {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const MAIN_PIN_POINTER_HEIGHT = 22;
  const MAX_Y = 630;
  const MIN_Y = 130;
  const MAP_MIN_X = 0;


  const map = document.querySelector(`.map`);
  const MAP_MAX_X = map.offsetWidth;

  const dragHandler = (handleElement) => {

    handleElement.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };


      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let newPositionY = handleElement.style.top = (handleElement.offsetTop - shift.y);
        let newPositionX = handleElement.style.left = (handleElement.offsetLeft - shift.x);

        if (newPositionY <= (MIN_Y - MAIN_PIN_HEIGHT)) {
          newPositionY = MIN_Y - MAIN_PIN_HEIGHT;
        } else if (newPositionY >= MAX_Y) {
          newPositionY = MAX_Y;
        }

        if (newPositionX <= (MAP_MIN_X - MAIN_PIN_WIDTH / 2)) {
          newPositionX = MAP_MIN_X - MAIN_PIN_WIDTH / 2;
        } else if (newPositionX > (MAP_MAX_X - MAIN_PIN_WIDTH - MAIN_PIN_POINTER_HEIGHT / 2)) {
          newPositionX = MAP_MAX_X - MAIN_PIN_WIDTH - MAIN_PIN_POINTER_HEIGHT / 2;
        }

        handleElement.style.top = newPositionY + `px`;
        handleElement.style.left = newPositionX + `px`;

        window.map.setAddress(newPositionX, newPositionY);
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  window.drag = {
    dragHandler
  };
})();
