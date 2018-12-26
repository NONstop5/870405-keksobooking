'use strict';

(function () {
  var JSON_LOAD_TIMEOUT = 5000;
  var STATUS_OK = 200;

  // Загружаем данные с сервера в формате JSON
  var getServerDataJSON = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;

    xhr.open('GET', url);
    xhr.send();
  };

  // Отправляем данные на сервер в формате JSON
  var sendServerDataJSON = function (url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = JSON_LOAD_TIMEOUT;

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    getServerDataJSON: getServerDataJSON,
    sendServerDataJSON: sendServerDataJSON
  };
})();
