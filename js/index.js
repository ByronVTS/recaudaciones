// const { format } = require("mysql");

function adjustTextAreaSize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight + 0) + 'px';
}

function calcularTotales() {
  var monedasInputs = document.querySelectorAll('.monedas-table input');
  var billetesInputs = document.querySelectorAll('.billetes-table input');

  calcularTabla(monedasInputs);
  calcularTabla(billetesInputs);

  calcularTotalFilas('.egresos-table');
  calcularTotalFilas('.monedas-table');
  calcularTotalFilas('.billetes-table');
}

function calcularTabla(inputs) {
  var tableRows = inputs[0].closest('table').querySelectorAll('tr');

  for (var i = 1; i < tableRows.length - 1; i++) {
    var input = inputs[i - 1];
    var tdValue = tableRows[i].querySelector('td:first-child').innerText;
    var numericValue = parseFloat(tdValue.replace(/[^0-9.-]+/g,""));

    if (!isNaN(numericValue)) {
      var total = numericValue * input.value;
      tableRows[i].querySelector('td:last-child').innerText = total.toFixed(2);
    }
  }
}


function calcularTotalFilas(tableClass) {
  var table = document.querySelector(tableClass);
  var rows = table.querySelectorAll('tr');
  var totalRow = rows[rows.length - 1];
  var total = 0;

  for (var i = 1; i < rows.length - 1; i++) {
    var cell = rows[i].querySelector('td:last-child');
    var value;

    if (cell.querySelector('input')) {
      value = parseFloat(cell.querySelector('input').value);
    } else {
      value = parseFloat(cell.innerText);
    }

    if (!isNaN(value)) {
      total += value;
    }
  }

  totalRow.querySelector('td:last-child').innerText = total.toFixed(2);
}



// Llama a la función cuando se produce un cambio en los inputs
var inputs = document.querySelectorAll('.no-spinner');
inputs.forEach(function(input) {
  input.addEventListener('input', calcularTotales);
});


//AGREGAR FILA

function agregarFila() {
  // Obtener la tabla
  var tabla = document.querySelector(".egresos-table");
  console.log(tabla)

  //inserta fila
  var nuevaFila = tabla.insertRow(tabla.rows.length-1)

   // Inserta celdas en la nueva fila
   var celda1 = nuevaFila.insertCell(0);
   var celda2 = nuevaFila.insertCell(1);
   // Crea un elemento textarea
  var textarea = document.createElement("textarea");
  var input = document.createElement("input")

  textarea.setAttribute("oninput","adjustTextAreaSize(this)")

  input.setAttribute("type", "number");
    input.classList.add("egresos__valor", "no-spinner");

  // Agrega el textarea a la primera celda
  celda1.appendChild(textarea);

  //agregar input segunda celda
  celda2.appendChild(input)
}


//------------ SUMA DE VALOR PARA EL INPUT DE VALOR A ENTREGAR

// Obtener los elementos por su clase
const monedasValorTotal = document.querySelector('.monedas_valor_total');
const billetesValorTotal = document.querySelector('.billetes_valor_total');
const egresosValorTotal = document.querySelector('.egresos_valor_total');
const valorAEntregar = document.querySelector('.valor_a_entregar');
// const valorRecaudadoWisphub = document.querySelector('.valor_recaudado_wisphub');
const calcularBtn = document.querySelector('#calcular-btn');
const valorRecaudadoInput = document.querySelector(".valor_recaudado_wisphub");
const valorAEntregarTeorico = document.querySelector(".valor_a_entregar_teorico");
const cajaInicialInput = document.querySelector(".caja_inicial");
const diferenciaInput = document.querySelector(".diferencia");
const cajaFinalinput = document.querySelector(".caja_final")

// Función para calcular y actualizar el valor a entregar
function calcularValorAEntregar() {
  // Obtener los valores de las clases y convertirlos a números
  const monedasTotal = parseFloat(monedasValorTotal.textContent);
  const billetesTotal = parseFloat(billetesValorTotal.textContent);
  const egresosTotal = parseFloat(egresosValorTotal.textContent);
  const valorRecaudado = parseFloat(valorRecaudadoInput.value)
  const cajaInicial = parseFloat(cajaInicialInput.value)

  // Realizar el cálculo
  const conteoEfectivo = billetesTotal + monedasTotal
  const resultado = (monedasTotal + billetesTotal) -cajaInicial;
  const valorTeorico = valorRecaudado - egresosTotal ;
  const diferencia = valorTeorico - resultado
  const cajaFinal =  conteoEfectivo - valorTeorico

  //bloqueo de valor a entregar
  valorAEntregar.readOnly = true;
  diferenciaInput.readOnly = true;
  valorAEntregarTeorico.readOnly = true;
  cajaFinalinput.readOnly = true;
  // Asignar el resultado
    valorAEntregar.value = resultado;
    valorAEntregarTeorico.value = valorTeorico;
    diferenciaInput.value = diferencia;
    cajaFinalinput.value = cajaFinal;
}


// Event listener para el botón "Calcular"
calcularBtn.addEventListener('click', calcularValorAEntregar);



// ------GUARDAR DATOS  DE DINERO A ENTREGAR EN LOCAL STORAGE

document.getElementById("save-btn").addEventListener("click", function() {
  var monedasValorTotal = document.querySelector(".monedas_valor_total").textContent;
  var billetesValorTotal = document.querySelector(".billetes_valor_total").textContent;
  var egresosValorTotal = document.querySelector(".egresos_valor_total").textContent;
  var valorAEntregar = document.querySelector(".valor_a_entregar").value;
  var valorRecaudadoWisphub = document.querySelector(".valor_recaudado_wisphub").value;
  var valorAEntregarTeorico = document.querySelector(".valor_a_entregar_teorico").value;
  var diferencia = document.querySelector(".diferencia").value;
  var cajaInicial = document.querySelector(".caja_inicial").value;
  var cajaFinal = document.querySelector(".caja_final").value;
  var fechaEntrega = document.querySelector(".fecha-entrega").value;
  var cajeroSelector = document.getElementById("cajero-selector");
  var cajeroSeleccionado = cajeroSelector.value;

  // Generar un identificador único para el registro
  var id = Date.now();
  // Obtener la fecha y hora actual
  var fechaHoraActual = new Date();
  var registro = {
    id: id,
    Monedas_valor_total: monedasValorTotal,
    Billetes_valor_total: billetesValorTotal,
    Egresos_valor_total:egresosValorTotal,
    Valor_a_entregar:valorAEntregar,
    Valor_recaudado_wisphub:valorRecaudadoWisphub,
    date: fechaHoraActual,
    Valor_a_entregar_teorico:valorAEntregarTeorico,
    Diferencia:diferencia,
    Caja_inicial:cajaInicial,
    Caja_final:cajaFinal,
    Fecha_entrega:fechaEntrega,
    Cajero:cajeroSeleccionado
  };

  var request = indexedDB.open("registro_diario", 1);

  request.onsuccess = function(event) {
    var db = event.target.result;

    var transaction = db.transaction(["registro"], "readwrite");
    var objectStore = transaction.objectStore("registro");

    var requestAdd = objectStore.add(registro);

    requestAdd.onsuccess = function(event) {
      console.log("Los valores se han guardado correctamente en IndexedDB.");
    };

    requestAdd.onerror = function(event) {
      console.error("Error al guardar los valores en IndexedDB:", event.target.error);
    };
  };

  request.onerror = function(event) {
    console.error("Error al abrir la base de datos:", event.target.error);
  };

  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("registro", { keyPath: "id", autoIncrement: true });
  };


// ------GUARDAR DATOS DE LA TABLA  DE EGRESOS 

function obtenerDatosTabla() {
  var table = document.getElementById('egresos-table');
  var rows = table.getElementsByTagName('tr');
  var data = {};

  for (var i = 1; i < rows.length - 1; i++) {
    var cells = rows[i].getElementsByTagName('td');
    var descripcion = cells[0].getElementsByTagName('textarea')[0].value;
    var valor = cells[1].getElementsByTagName('input')[0].value;
    
    data[descripcion] = parseFloat(valor);
  }
  return data;
}


var egresos =obtenerDatosTabla()

var request = indexedDB.open("egresos_diario", 1);

request.onsuccess = function(event) {
  var db = event.target.result;

  var transaction = db.transaction(["egresos"], "readwrite");
  var objectStore = transaction.objectStore("egresos");

  var requestAdd = objectStore.add(egresos);

  requestAdd.onsuccess = function(event) {
    console.log("Los valores se han guardado correctamente en IndexedDB.");
  };

  requestAdd.onerror = function(event) {
    console.error("Error al guardar los valores en IndexedDB:", event.target.error);
  };
};

request.onerror = function(event) {
  console.error("Error al abrir la base de datos:", event.target.error);
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  if (!db.objectStoreNames.contains('egresos')) {
    var objectStore = db.createObjectStore('egresos', { keyPath: 'id', autoIncrement: true });
  }
};

function monedasObtenerDatostabla(){
  var table = document.getElementById("monedas-table");
  var rows = table.getElementsByTagName("tr");
  var data ={}

  for( var i = 1; i < rows.length - 1; i++){
    var cells = rows[i].getElementsByTagName("td")
    var key = cells[0].textContent.trim();
    var value = cells[1].getElementsByTagName('input')[0].value.trim();
    data[key] =parseFloat(value);
  }
  return data
}

var monedas = monedasObtenerDatostabla()
var request = indexedDB.open("monedas_diario", 1);

request.onsuccess = function(event) {
var db = event.target.result;

var transaction = db.transaction(["monedas"], "readwrite");
var objectStore = transaction.objectStore("monedas");

var requestAdd = objectStore.add(monedas);

requestAdd.onsuccess = function(event) {
  console.log("Los valores se han guardado correctamente en IndexedDB.");
};

requestAdd.onerror = function(event) {
  console.error("Error al guardar los valores en IndexedDB:", event.target.error);
};
};

request.onerror = function(event) {
console.error("Error al abrir la base de datos:", event.target.error);
};

request.onupgradeneeded = function(event) {
var db = event.target.result;
if (!db.objectStoreNames.contains('monedas')) {
  var objectStore = db.createObjectStore('monedas', { keyPath: 'id', autoIncrement: true });
}
};



function billetesObtenerDatostabla(){
  var table = document.getElementById("billetes-table");
  var rows = table.getElementsByTagName("tr");
  var data ={}

  for( var i = 1; i < rows.length - 1; i++){
    var cells = rows[i].getElementsByTagName("td")
    var key = cells[0].textContent.trim();
    var value = cells[1].getElementsByTagName('input')[0].value.trim();
    data[key] =parseFloat(value);
  }
  return data
}

var billetes = billetesObtenerDatostabla()

var request = indexedDB.open("billetes_diario", 1);

request.onsuccess = function(event) {
var db = event.target.result;

var transaction = db.transaction(["billetes"], "readwrite");
var objectStore = transaction.objectStore("billetes");

var requestAdd = objectStore.add(billetes);

requestAdd.onsuccess = function(event) {
  console.log("Los valores se han guardado correctamente en IndexedDB.");
};

requestAdd.onerror = function(event) {
  console.error("Error al guardar los valores en IndexedDB:", event.target.error);
};
};

request.onerror = function(event) {
console.error("Error al abrir la base de datos:", event.target.error);
};

request.onupgradeneeded = function(event) {
var db = event.target.result;
if (!db.objectStoreNames.contains('billetes')) {
  var objectStore = db.createObjectStore('billetes', { keyPath: 'id', autoIncrement: true });
}
};

});

// FUNCION PARA CAMBIAR DE TEMA

var btnDark = document.querySelector("#dark")
var body = document.querySelector("body")

load()

btnDark.addEventListener("click", e => {
  body.classList.toggle("darkmode");
  store(body.classList.contains("darkmode"))
});

function load(){
  const darkmode = localStorage.getItem("darkmode");
  if(!darkmode){
    store("false");
  }else if(darkmode == "true"){
    body.classList.add("darkmode")
  }
}

function store(value){
  localStorage.setItem("darkmode", value)
}