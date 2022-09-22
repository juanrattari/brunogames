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
                        <button id="botonAgregar${element.id}" class="btnCarrito">Agregar al carrito</button>`
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
    div.innerHTML +=`<img class="img-pendrive" src="./img/PENDRIVE.PNG" alt="Pendrive">
                    <p>Versión: ${productoAgregar.version}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="cant${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                    <button class="boton-eliminar" id="${productoAgregar.id}"><iconify-icon icon="ep:delete-filled" width="20" height="20"></iconify-icon></button>`
    contenedorCarrito.appendChild(div)
} 

contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.className === "boton-eliminar") {
        carritoDeCompras = carritoDeCompras.filter((item) => item.id != e.target.id);
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

document.getElementById("btnVaciarCarrito").onclick = () => {
    Swal.fire({
        title: '¿Seguro querés vaciar el carrito?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
      }).then((result) => {
       
        if (result.isConfirmed) {
          Swal.fire('Carrito vaciado', '', 'Vacío')
          carritoDeCompras = [];
          
          actualizarCarrito ();
          localStorage.removeItem("ListadoCarrito");
          contenedorCarrito.innerHTML = ``;
        } else if (result.isDenied) {
          Swal.fire('¡Continua tu compra!', '', 'info')
        }
      })
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
              Swal.fire('Te redireccionaremos a los métodos de pago. Cargando...', '', 'Comprando')
              setTimeout(function(){location.href = "./pages/compra.html#contenedor-compra";} ,2000);
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
            carritoDeCompras.push(new Consola(elemento));
        }

        contadorCarrito.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.cantidad, 0)
        precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)

        carritoDeCompras.forEach(productoAgregar => {
            let div = document.createElement("div")
            div.className = "producto-en-carrito"
            div.innerHTML +=`<img class="img-pendrive" src="./img/PENDRIVE.PNG" alt="Pendrive">
                            <p>Versión: ${productoAgregar.version}</p>
                            <p>Precio: $${productoAgregar.precio}</p>
                            <p id="cant${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                            <button class="boton-eliminar" id="${productoAgregar.id}"><iconify-icon icon="ep:delete-filled" width="20" height="20"></iconify-icon></button>`
            contenedorCarrito.appendChild(div)
        });
    }
}



/* FETCH */
const clientes = document.getElementById("clientes")

fetch ("https://631918178e51a64d2bde8344.mockapi.io/api/v1/users")
.then ((resp) => resp.json())
.then ((data) => {
   for(let i = 25 ; i < 35 ; i++){

    let div = document.createElement("div")
    div.className = "cliente"
    div.innerHTML = `   <h2>${data[i].firstName} ${data[i].lastName}</h2>
                        <h2>Edad: ${data[i].age}</h2>
                        <img src="${data[i].avatar}">
    `
    clientes.appendChild(div) 

   }
})
