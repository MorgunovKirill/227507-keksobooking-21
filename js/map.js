'use strict';

(function () {
  const PIN_WIDTH = 62;
  const PIN_HEIGHT = 62;
  const PIN_POINTER_HEIGHT = 22;
  const MAX_PINS_TO_SHOW = 5;

  const pin = document.querySelector(`.map__pin--main`);
  const places = document.querySelector(`.map__pins`);

  const placeTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const renderPlace = (place) => {
    let placeElement = placeTemplate.cloneNode(true);
    let placeImg = placeElement.querySelector(`img`);

    placeElement.style.left = `${place.location.x - (PIN_WIDTH / 2)}px`;
    placeElement.style.top = `${place.location.y - PIN_HEIGHT}px`;
    placeImg.setAttribute(`src`, place.author.avatar);
    placeImg.setAttribute(`alt`, place.offer.title);

    return placeElement;
  };

  const getAddressCoords = (item) => {
    return {
      x: (parseInt(item.style.left, 10) + PIN_WIDTH / 2).toFixed(),
      y: (parseInt(pin.style.top, 10) + PIN_HEIGHT + PIN_POINTER_HEIGHT).toFixed(),
    };
  };
  const setAddress = (x, y) => {
    return x + ` , ` + y;
  };

  const renderFragment = (arr, filterCallback) => {

    if (filterCallback) {
      arr = window.filter.housingFilter(arr);
    }

    places.querySelectorAll(`.map__pin`).forEach(function (element) {
      if (!(element.classList.contains(`map__pin--main`))) {
        places.removeChild(element);
      }
    });

    const fragment = document.createDocumentFragment();

    const takeNumber = arr.length > MAX_PINS_TO_SHOW ? MAX_PINS_TO_SHOW : arr.length;

    for (let i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPlace(arr[i]));
    }

    places.appendChild(fragment);
  };

  window.map = {
    getAddressCoords,
    setAddress,
    renderFragment,
  };

})();
