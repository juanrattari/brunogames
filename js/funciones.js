let carritoDeCompras = []

const contenedorProductos = document.getElementById("contenedorDeProductos");
const contenedorCarrito = document.getElementById("carritoContenedor");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");

//mostrarProductos(arrayConsolas)

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
        })
    })
}
mostrarConsolas()

/*function mostrarProductos(arrayConsolas){
    contenedorProductos.innerHTML=""
    arrayConsolas.forEach(element => {
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
        })
    })
    
}*/

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

//contenedorProductos.addEventListener("click", (e) => {
//    const idClickeado = parseInt (e.target.id.charAt (e.target.id.length - 1))
//    const idObtenido = arrayConsolas.find((consola) =>
//    consola.id === idClickeado
//    ).id
//    if (e.target.tagName === "BUTTON") agregarAlCarrito (idObtenido)
//})

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
        title: '¿Seguro queres confirmar la compra?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '¡Si!',
        denyButtonText: `No...`,
      }).then((result) => {
       
        if (result.isConfirmed) {
          Swal.fire('Te redireccionaremos a los metodos de pago', '', 'Compra pendiente de pago')
        } else if (result.isDenied) {
          Swal.fire('¡Regresa pronto!', '', 'info')
        }
      })
}

/*function agregarAlCarrito(id){
    let existe = carritoDeCompras.find(element => element.id == id)
    if (existe){
        existe.cantidad = existe.cantidad + 1
        document.getElementById(`cant${existe.id}`).innerHTML = `<p id="cant${existe.id}">cantidad: ${existe.cantidad}</p>`
        
    }else{
        let productoAgregar = arrayConsolas.find(element=> element.id == id)
        productoAgregar.cantidad = 1
        carritoDeCompras.push(productoAgregar)
        mostrarCarrito(productoAgregar)
      
    }
    actualizarCarrito()
    Guardar()
}*/

/*function mostrarCarrito(productoAgregar){
    let div = document.createElement("div")
    div.className = "producto-en-carrito"
    div.innerHTML =`<img class="img-pendrive" src="./img/PENDRIVE.jpg" alt="Pendrive">
                    <p>Versión: ${productoAgregar.version}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="cant${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                    <button class="boton-eliminar" id="${productoAgregar.id}"><iconify-icon icon="ep:delete-filled" width="20" height="20"></iconify-icon></button>`
    contenedorCarrito.appendChild(div)
    eliminar()
}*/

/*
function eliminar (){
    let btnEliminar = document.getElementsByClassName("boton-eliminar")
    for (const btn of btnEliminar){
        btn.addEventListener("click",(e)=>{
            btn.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(element=> element.id != e.target.parentElement.id)
            actualizarCarrito()
        })
    }
}

function actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}
*/
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
