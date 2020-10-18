'use strict';

(function () {
  const housingType = document.getElementById(`housing-type`);

  const housingFilter = (arr) => {
    if (housingType.value === `any`) {
      return arr;
    }
    let filtered = arr.filter((element) => {
      return element.offer.type === housingType.value;
    });

    return filtered;
  };

  window.filter = {
    housingFilter,
  };
})();
