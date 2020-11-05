'use strict';

(function () {
  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelector(`#housing-features`);

  const filterPlaces = (arr) => {
    let filtered = [...arr];
    let housingFeaturesList = [...housingFeatures.querySelectorAll(`input:checked`)];
    let housingFeaturesListValues = housingFeaturesList.map((el) => {
      return el.value;
    });


    if (housingType.value !== `any`) {
      filtered = filtered.filter((element) => {
        return element.offer.type === housingType.value;
      });
    }

    if (housingPrice.value !== `any`) {
      switch (housingPrice.value) {
        case `low`:
          filtered = filtered.filter((element) => {
            return element.offer.price < 10000;
          });
          break;
        case `middle`:
          filtered = filtered.filter((element) => {
            return (element.offer.price >= 10000 && element.offer.price < 50000);
          });
          break;
        case `high`:
          filtered = filtered.filter((element) => {
            return (element.offer.price > 50000);
          });
          break;
      }
    }

    if (housingRooms.value !== `any`) {
      switch (housingRooms.value) {
        case `1`:
          filtered = filtered.filter((element) => {
            return element.offer.rooms === 1;
          });
          break;
        case `2`:
          filtered = filtered.filter((element) => {
            return element.offer.rooms === 2;
          });
          break;
        case `3`:
          filtered = filtered.filter((element) => {
            return element.offer.rooms === 3;
          });
          break;
      }
    }

    if (housingGuests.value !== `any`) {
      switch (housingGuests.value) {
        case `1`:
          filtered = filtered.filter((element) => {
            return element.offer.guests === 1;
          });
          break;
        case `2`:
          filtered = filtered.filter((element) => {
            return element.offer.guests === 2;
          });
          break;
        case `3`:
          filtered = filtered.filter((element) => {
            return element.offer.guests === 3;
          });
          break;
        case `0`:
          filtered = filtered.filter((element) => {
            return element.offer.guests > 3;
          });
          break;
      }
    }

    if (housingFeaturesListValues.length) {
      housingFeaturesListValues.forEach((el)=>{
        filtered = filtered.filter((element) => {
          return element.offer.features.includes(el);
        });
      });
    }

    return filtered;
  };

  // const filterHousing = (arr) => {
  //   if (housingType.value === `any`) {
  //     return arr;
  //   }
  //   let filtered = arr.filter((element) => {
  //     return element.offer.type === housingType.value;
  //   });

  //   return filtered;
  // };

  // const filterPrice = (arr) => {
  //   let filtered;
  //   switch (housingPrice.value) {
  //     case `any`:
  //       return arr;
  //     case `low`:
  //       filtered = arr.filter((element) => {
  //         return element.offer.price < 10000;
  //       });
  //       break;
  //     case `middle`:
  //       filtered = arr.filter((element) => {
  //         return (element.offer.price >= 10000 && element.offer.price < 50000);
  //       });
  //       break;
  //     case `high`:
  //       filtered = arr.filter((element) => {
  //         return (element.offer.price >= 10000 && element.offer.price < 50000);
  //       });
  //       break;
  //   }

  //   return filtered;
  // };

  window.filter = {
    filterPlaces,
  };
})();
