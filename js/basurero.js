
function agregarFila() {
    // Obtener la tabla
    var tabla = document.querySelector(".egresos-table");
 
    // Crear una nueva fila
    var fila = document.createElement("tr");
 
    // Crear las celdas de la fila
    var descripcionCelda = document.createElement("td");
    var totalCelda = document.createElement("td");
 
    // Crear el textarea y el input
    var textarea = document.createElement("textarea");
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.classList.add("egresos__valor", "no-spinner");
 
    // Agregar el textarea y el input a las celdas correspondientes
    descripcionCelda.appendChild(textarea);
    totalCelda.appendChild(input);
 
    // Agregar las celdas a la fila
    fila.appendChild(descripcionCelda);
    fila.appendChild(totalCelda);
 
    // Obtener la última fila de la tabla
    var ultimaFila = tabla.rows[tabla.rows.length - 3];
 
    // Insertar la nueva fila antes de la última fila
    tabla.insertBefore(fila, ultimaFila);
 
  }
  // Obtener el botón fuera de la tabla
  var boton = document.querySelector(".agregar-fila-boton");
  // Agregar un controlador de eventos al botón
  boton.addEventListener("click", agregarFila);