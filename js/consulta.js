// ---------CONSULTA A BASE DE DATOS 

  var dbName = 'registro_diario';
  var objectStoreName = 'registro';
  var button = document.querySelector('.consulta__btn');
  var input = document.querySelector('#consulta__input');
  var respuesta = document.querySelector('.consulta__respuesta');

  button.addEventListener('click', function() {
    var valueToSearch = input.value;

    var request = indexedDB.open(dbName);

    request.onsuccess = function(event) {
      var db = event.target.result;
      var transaction = db.transaction([objectStoreName], 'readonly');
      var objectStore = transaction.objectStore(objectStoreName);
      var cursorRequest = objectStore.openCursor();
      var foundObjects = [];

      cursorRequest.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          var data = cursor.value;
          for (var key in data) {
            if (data[key] === valueToSearch) {
              foundObjects.push(data);
              break;
            }
          }
          cursor.continue();
        } else {
          if (foundObjects.length > 0) {
            var formattedData = JSON.stringify(foundObjects, null, 2);
            respuesta.textContent = formattedData;
          } else {
            respuesta.textContent = 'No se encontró información para el valor especificado.';
          }
        }
      };
    };
  });
