'use strict';
(function () {
  const URL_SEND = `https://21.javascript.pages.academy/keksobooking`;
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  const successMessage = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);
  const uploadErrorMessage = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

  const successHandler = () => {
    document.body.insertAdjacentElement(`afterbegin`, successMessage);
    document.addEventListener(`keydown`, (e)=>{
      window.util.isEscEvent(e, () => {
        successMessage.remove();
      });
    });
    document.addEventListener(`click`, ()=> {
      successMessage.remove();
    });
  };

  const uploadErrorHandler = () => {
    document.body.insertAdjacentElement(`afterbegin`, uploadErrorMessage);
    document.addEventListener(`keydown`, (e)=>{
      window.util.isEscEvent(e, () => {
        uploadErrorMessage.remove();
      });
    });
    document.addEventListener(`click`, ()=> {
      uploadErrorMessage.remove();
    });
  };


  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.classList.add(`server-error`);

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };


  const statusHandler = (xhr, loadCb, errorCb) => {
    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        loadCb(xhr.response);
      } else {
        errorCb(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      errorCb(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      errorCb(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

  };

  const load = (loadCb, errorCb) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`GET`, URL_GET);
    xhr.timeout = TIMEOUT_IN_MS;

    statusHandler(xhr, loadCb, errorCb);
    xhr.send();
  };

  const upload = (data, loadCb, errorCb) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, URL_SEND);
    xhr.timeout = TIMEOUT_IN_MS;

    statusHandler(xhr, loadCb, errorCb);

    xhr.send(data);
  };


  window.backend = {
    load,
    upload,
    errorHandler,
    successHandler,
    uploadErrorHandler
  };
})();
