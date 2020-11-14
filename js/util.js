'use strict';


const DEBOUNCE_INTERVAL = 500; // ms
let lastTimeout;

const isEscEvent = (evt, action) => {
  if (evt.key === `Escape`) {
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
