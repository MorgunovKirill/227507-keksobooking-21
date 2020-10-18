'use strict';
(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.classList.add(`server-error`);

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };


  const statusHandler = (xhr, onLoad, onError) => {
    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

  };

  const load = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL);
    xhr.timeout = TIMEOUT_IN_MS;

    statusHandler(xhr, onLoad, onError);
    xhr.send();
  };

  const upload = (data, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, URL);
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.send(data);
  };

  window.backend = {
    load,
    upload,
    errorHandler
  };
})();
