'use strict';

(function () {
  const housingType = document.querySelector(`#housing-type`);

  const filterHousing = (arr) => {
    if (housingType.value === `any`) {
      return arr;
    }
    let filtered = arr.filter((element) => {
      return element.offer.type === housingType.value;
    });

    return filtered;
  };

  window.filter = {
    filterHousing,
  };
})();
