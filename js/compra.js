const realizarCompra = document.getElementById("compra");
const precioTotal = document.getElementById("precioTotal");
const btnEfectivo = document.getElementById("btnEfectivo");
const btnTransferencia = document.getElementById("btnTransferencia");

let carritoDeCompras = []

class Consola {
    constructor(obj){
        this.id = obj.id;
        this.version = obj.version;
        this.cantidad = parseFloat(obj.cantidad);
        this.precio = parseFloat(obj.precio);
    }
}

function Comprar (){
    let arrayAuxiliar = JSON.parse(localStorage.getItem("ListadoCarrito"));
    if (arrayAuxiliar){
        for (elemento of arrayAuxiliar){
            carritoDeCompras.push(new Consola(elemento));}
            
            carritoDeCompras.forEach(elemento => {
                let div = document.createElement("div")
                div.className = "compra-item"
                div.innerHTML +=`<img class="img-pendrive" src="../img/PENDRIVE.PNG" alt="Pendrive">
                <p>Versión: ${elemento.version}</p>
                <p>Precio: $${elemento.precio}</p>
                <p id="cant${elemento.id}">Cantidad: ${elemento.cantidad}</p>`
                realizarCompra.appendChild(div)
            });
    }
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0);
}

Comprar();

btnEfectivo.addEventListener("click",()=> {
    Swal.fire(
        'Te esperamos en el local para pagar en Efectivo',
        'Muchas gracias!',
        'Exitoso'
      )
})
btnTransferencia.addEventListener("click",()=> {
    Swal.fire(
        'CBU: 1022115551458745232102 Titular: BrunoGames Inc. - - CUIT: 30-77777777-2',
        'Muchas gracias!',
        'Exitoso'
      )
})