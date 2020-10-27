'use strict';

(function () {
  const ESC_KEYCODE = 27;
  const DEBOUNCE_INTERVAL = 300; // ms
  let lastTimeout;

  const isEscEvent = (evt, action) => {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
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
    debounce
  };
})();
