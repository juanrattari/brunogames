let carritoDeCompras = [];

const productos = document.getElementById("productos");//agregamos un div que contenga a todas las cards, para asingarle un evento principal
const contenedorCarrito = document.getElementById("carrito-contenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");

// CONSOLA - BRUNO GAMES

// Poniendo en el DOM

const ponerConsolas = () => {
  arrayConsolas.forEach((item) => {
    let div = document.createElement("div");
    div.className = "producto"; // producto col
    div.innerHTML = `  <div class="card mb-4 rounded-3 shadow-sm">
                        <div class="card-header py-3">
                          <h4 class="my-0 fw-normal">Versión: ${item.version}</h4>
                        </div>
                        <div class="card-body">
                          <h1 class="card-title pricing-card-title">$${item.precio}<small class="text-muted fw-light"></small></h1>
                          <ul class="list-unstyled mt-3 mb-4">
                            <li>${item.capacidad}</li>
                            <li>${item.cantidad}</li>
                            <li>Juegos Online</li>
                            <li>Elección extra de ${item.cantidadJuegosExtras} juegos</li>
                          </ul>
                          <button id=botonAgregar${item.id} type="button" class="w-100 btn btn-lg btn-outline-primary">Agregar al carrito</button>
                        </div>
                      </div>`;
    productos.appendChild(div);
  });
};
ponerConsolas();

const ponerEnCarrito = (agregaProducto) => {
  let div = document.createElement("div");
  div.className = "productoEnCarrito";
  div.innerHTML += `<p>Versión: ${agregaProducto.version}</p>
                    <p id="cant${agregaProducto.id}">Cantidad: ${agregaProducto.cantidad}</p>
                    <p>Precio: $${agregaProducto.precio}</p>
                    <button class="boton-eliminar" id="${agregaProducto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    </button>`;
  contenedorCarrito.appendChild(div);
};

/* Manejo de eventos*/

// Productos
//al div principal , le asignamos este evento
productos.addEventListener("click", (e) => {
  const idClickeado = parseInt(e.target.id.charAt(e.target.id.length - 1));
  //idClickeado seria el id que tiene los botones, al ser un string tenemos que pasarlo a entero y para obtenerlo usamos el charAt

  const idObtenido = arrayConsolas.find(
    //en base al id clickeado  lo comparamos con los id del array consola
    (consola) => consola.id === idClickeado
  ).id;//como nos devuelve un objeto, lo que necesitamos es su id x eso el .id
//si el evento se da sobre un elemento tipo BUTTOn ejecutamos agregar carrito
  if (e.target.tagName === "BUTTON") agregarAlCarrito(idObtenido);
});

// Carrito
contenedorCarrito.addEventListener("click", (e) => {
// de esta forma ya borramos el elemento acorde a su seleccion
  if (e.target.tagName === "BUTTON") {
    carritoDeCompras = carritoDeCompras.filter(
      (item) => item.id != e.target.id
    );
    e.target.parentElement.remove();
    actualizarCarrito();
  }
});

function agregarAlCarrito(id) {
  let existe = carritoDeCompras.find((produc) => produc.id == id);
  if (existe) {
    existe.cantidad = existe.cantidad + 1;
    document.getElementById(
      `cant${existe.id}`
    ).innerHTML = `<p id="cant${existe.id}">cantidad: ${existe.cantidad}</p>`;
    actualizarCarrito();
  } else {
    let agregaProducto = arrayConsolas.find((item) => item.id == id);
    agregaProducto.cantidad = 1;
    carritoDeCompras.push(agregaProducto);
    ponerEnCarrito(agregaProducto);
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras
    .reduce((acc, el) => acc + el.cantidad, 0)
    .toString();
  precioTotal.innerText = carritoDeCompras
    .reduce((acc, el) => acc + el.precio * el.cantidad, 0)
    .toString();
}

// function mostrarCarrito(agregaProducto){

//   // eliminar()
// }

// function eliminar(){
//   let btnEliminar = document.getElementsByClassName("boton-eliminar")
//   for (const btn of btnEliminar){
//     btn.addEventListener("click",(e)=>{
//       console.log(btn.parentElement)
//       btn.parentElement.remove();
//       console.log(e.target.parentElement.id)
//       carritoDeCompras = carritoDeCompras.filter(item => item.id !== e.target.parentElement.id)
//       actualizarCarrito()
//     })
//   }
// }
