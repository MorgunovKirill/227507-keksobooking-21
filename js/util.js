'use strict';

(function () {
  const ESC_KEYCODE = 27;
  const DEBOUNCE_INTERVAL = 500; // ms
  let lastTimeout;

  const isEscEvent = (evt, action) => {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      action();
    }
  };

  const isEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      action();
    }
  };

  const isMouseMainButton = (evt, action) => {
    if (evt.which === 1) {
      action();
    }
  };

  const debounce = (cb) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.util = {
    isEscEvent,
    isEnterEvent,
    isMouseMainButton,
    debounce
  };
})();
