let carritoDeCompras = []

const contenedorProductos = document.getElementById("contenedorDeProductos");
const contenedorCarrito = document.getElementById("carritoContenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");

const mostrarConsolas = () => {
    arrayConsolas.forEach((element) => {
        let div = document.createElement("div")
        div.className = "producto"
        div.innerHTML=` <h2>Versión: ${element.version}</h2>
                        <div class="producto-info">
                        <h3>Precio: $${element.precio}</h3>
                        <h4>${element.capacidad}</h4>
                        <h4>${element.cantidad}</h4>
                        <h4>Juegos Online</h4>
                        <h4>Elección extra de ${element.cantidadJuegosExtras} juegos</h4>
                        </div>
                        <button id="botonAgregar${element.id}" class="botonAgregarAlCarrito">Agregar al carrito</button>`
        contenedorProductos.appendChild(div)

        let btnAgregar = document.getElementById(`botonAgregar${element.id}`)
        btnAgregar.addEventListener("click",()=>{
            agregarAlCarrito(element.id)
            Toastify({
                text:"¡BrunoGames agregado al carrito!",
                duration: 3000,
                style: {
                    background: "rgb(118, 96, 98, 0.93)",
                  },
            }).showToast();

        })

    })
}
mostrarConsolas()

const mostrarEnCarrito = (productoAgregar) => {
    let div = document.createElement("div")
    div.className = "producto-en-carrito"
    div.innerHTML +=`<img class="img-pendrive" src="./img/PENDRIVE.jpg" alt="Pendrive">
                    <p>Versión: ${productoAgregar.version}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="cant${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                    <button class="boton-eliminar" id="${productoAgregar.id}"><iconify-icon icon="ep:delete-filled" width="20" height="20"></iconify-icon></button>`
    contenedorCarrito.appendChild(div)
} 

contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        carritoDeCompras = carritoDeCompras.filter(
            (element) => element.id != e.target.id);
        e.target.parentElement.remove();
        actualizarCarrito();
    }
    Guardar()
});

function agregarAlCarrito(id){
    let existe = carritoDeCompras.find(element => element.id == id)
    if (existe){
        existe.cantidad = existe.cantidad + 1
        document.getElementById(`cant${existe.id}`).innerHTML = `<p id="cant${existe.id}">cantidad: ${existe.cantidad}</p>` 
    }else{
        let productoAgregar = arrayConsolas.find(element=> element.id == id)
        productoAgregar.cantidad = 1
        carritoDeCompras.push(productoAgregar)
        mostrarEnCarrito (productoAgregar)
    }
    actualizarCarrito()
    Guardar()
}

function actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}

document.getElementById("btnConfirmarCompra").onclick = () => {
    Swal.fire({
        title: '¿Seguro querés confirmar la compra?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '¡Si!',
        denyButtonText: `No...`,
      }).then((result) => {
       
        if (result.isConfirmed) {
          Swal.fire('Te redireccionaremos a los métodos de pago', '', 'Compra pendiente de pago')
        } else if (result.isDenied) {
          Swal.fire('¡Regresa pronto!', '', 'info')
        }
      })
}

/* LOCALSTORAGE */

class Consola {
    constructor(obj){
        this.id = obj.id;
        this.version = obj.version;
        this.cantidad = parseFloat(obj.cantidad);
        this.precio = parseFloat(obj.precio);
    }
}
let ArrayDeCarrito = []
Verificar()

function Guardar (){
    localStorage.setItem("ListadoCarrito",JSON.stringify(carritoDeCompras));
}

function Verificar (){
    let arrayAuxiliar = JSON.parse(localStorage.getItem("ListadoCarrito"));
    if (arrayAuxiliar){
        for (elemento of arrayAuxiliar){
            ArrayDeCarrito.push(new Consola(elemento));
        }
        let largo = arrayAuxiliar.length;
        console.log("tiene "+ largo + " elementos");
    }
    else{
        console.log("el carrrito esta vacío");
    }
}


/* FETCH */
const clientes = document.getElementById("clientes")

fetch ("https://631918178e51a64d2bde8344.mockapi.io/api/v1/users")
.then ((resp) => resp.json())
.then ((data) => {
   
    let div = document.createElement("div")
    div.className = "cliente"
    div.innerHTML = `   <h2>Nombre: ${data[0].firstName}</h2>
                        <h2>Apellido: ${data[0].lastName}</h2>
                        <h2>Edad: ${data[0].age}</h2>
                        <img src="${data[0].avatar}">
    `
    clientes.appendChild(div) 

})