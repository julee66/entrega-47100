
let objetosDelCarrito = document.getElementById("contenedorCarrito");
let carrito = JSON.parse(localStorage.getItem("accesorios"));

// Funcion sumatoria de productos seleccionados:

const sumarTotal = (arrayArticulos) => {
    let total = 0;
    arrayArticulos.forEach((item) => {
        total += item.precio;
    });
    let contenedorTotal = document.getElementById("sumatoriaTotal");
    contenedorTotal.innerHTML = `$ ${total}`;
};

sumarTotal(carrito);

// Funcion para eliminar productos agregados al carrito:

const eliminarProducto = (productoSeleccionado,carrito, posicionProducto) => {
    productoSeleccionado.remove();
    delete carrito[posicionProducto];
    sumarTotal(carrito);
}

// Funcion para pasar productos guardados del storage al HTML Carrito:

const cargarCarrito = (arrayCarrito) => {
    for (let i=0; i < arrayCarrito.length; i++){
        let item = arrayCarrito[i];
        let div = document.createElement("div");
        let imagen = document.createElement("img");
        imagen.src = item.imagen;
        let precio = document.createElement("p");
        precio.innerHTML = `Precio: $ ${item.precio}`;
        let boton = document.createElement("button");
        boton.innerHTML = "Eliminar";
        boton.className = "botonEliminar";
        boton.addEventListener("click", () => eliminarProducto(div,arrayCarrito, i));
        div.append(imagen, precio, boton);  
        objetosDelCarrito.append(div);
    };
};
cargarCarrito(carrito);

// Boton comprar para cerrar operacion y limpiar storage:

let botonComprar = document.getElementById("ComprarFinalizar");

const agradecerPorCompra = () => {
    let finDeCompra = document.getElementById("contenedorCarrito");
    finDeCompra.innerHTML = "Gracias por su compra!";
    finDeCompra.className = "agradecimiento"
    let sacarTitulo = document.getElementById("tituloDetalle");
    sacarTitulo.innerHTML = "";
    botonComprar.innerHTML = "";
    botonComprar.style.backgroundColor = "white";
    botonComprar.style.border = "none";
    localStorage.clear();
}

botonComprar.addEventListener("click", agradecerPorCompra);

