'use strict';

(function () {
  const VALUE_ANY = `any`;
  const MAX_PINS_TO_SHOW = 5;
  const PRICE_MAP = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  const housingType = document.querySelector(`#housing-type`);
  const housingPrice = document.querySelector(`#housing-price`);
  const housingRooms = document.querySelector(`#housing-rooms`);
  const housingGuests = document.querySelector(`#housing-guests`);
  const housingFeatures = document.querySelector(`#housing-features`);
  const filterWifiCheckbox = housingFeatures.querySelector(`#filter-wifi`);
  const dishwasherCheckbox = housingFeatures.querySelector(`#filter-dishwasher`);
  const parkingCheckbox = housingFeatures.querySelector(`#filter-parking`);
  const washerCheckbox = housingFeatures.querySelector(`#filter-washer`);
  const elevatorCheckbox = housingFeatures.querySelector(`#filter-elevator`);
  const conditionerCheckbox = housingFeatures.querySelector(`#filter-conditioner`);

  const getFilterType = (item) => {
    return housingType.value === VALUE_ANY ? true : item.offer.type === housingType.value;
  };

  const getFilterPrice = (item) => {
    return housingPrice.value === VALUE_ANY ? true :
      item.offer.price <= PRICE_MAP[housingPrice.value].max &&
      item.offer.price >= PRICE_MAP[housingPrice.value].min;
  };

  const getFilterRooms = (item) => {
    return housingRooms.value === VALUE_ANY ? true : item.offer.rooms === parseInt(housingRooms.value, 10);
  };

  const getFilterGuests = (item) => {
    return housingGuests.value === VALUE_ANY ? true : item.offer.guests === parseInt(housingGuests.value, 10);
  };

  const getFilterFeature = (item, feature) => {
    if (feature.checked && !item.offer.features.includes(feature.value)) {
      return false;
    }
    return true;
  };

  const filterPlaces = (arr) => {
    let filtered = [];

    for (let i = 0; i < arr.length; i++) {
      if (
        getFilterType(arr[i]) &&
        getFilterPrice(arr[i]) &&
        getFilterRooms(arr[i]) &&
        getFilterGuests(arr[i]) &&
        getFilterFeature(arr[i], filterWifiCheckbox) &&
        getFilterFeature(arr[i], dishwasherCheckbox) &&
        getFilterFeature(arr[i], parkingCheckbox) &&
        getFilterFeature(arr[i], washerCheckbox) &&
        getFilterFeature(arr[i], elevatorCheckbox) &&
        getFilterFeature(arr[i], conditionerCheckbox)
      ) {
        filtered.push(arr[i]);
        if (filtered.length === MAX_PINS_TO_SHOW) {
          break;
        }
      }
    }

    return filtered;
  };

  window.filter = {
    filterPlaces,
  };
})();
