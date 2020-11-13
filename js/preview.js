'use strict';

(function () {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const imagePreviewHandler = (evt) => {
    const file = evt.target.files[0];
    let container = evt.target.closest(`.ad-form-header__upload`);

    if (!container) {
      container = evt.target.closest(`.ad-form__photo-container`);
      let newImg = document.createElement(`img`);
      newImg.width = `40`;
      newImg.height = `44`;
      container.querySelector(`.ad-form__photo`).innerHTML = ``;
      container.querySelector(`.ad-form__photo`).appendChild(newImg);
    }

    const image = container.querySelector(`img`);
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, function () {
        image.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.preview = {
    imagePreviewHandler
  };
})();
