// Clase y array de Prendas y Accesorios a vender:

class Articulos {
    constructor(tipo, precio, stock, imagen) {
        this.tipo = tipo;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
    restarStock() {
        if (this.stock > 0){
            this.stock--;
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No quedan mas productos en stock!",
            });
        }
    }
};

// Funcion para traer elementos de data.json

const crearListadoArticulos = async () => {
    const response = await fetch("../data.json");
    const data = await response.json();
    const articulos = [];
    for (const item of data){
        articulos.push(new Articulos(item.tipo, item.precio, item.stock, item.imagen)); 
    };
    return articulos;
};

const promesaArticulos = crearListadoArticulos();

promesaArticulos.then( listadoArticulos => {

    // Funcion para guardar en storage productos enviados al carrito:

    const guardarEnStorage = (accesorio) => {
        let carritoStorage = JSON.parse(localStorage.getItem("accesorios"));
        if (carritoStorage == null) {
            let carrito = [];
            carrito.push(accesorio);
            localStorage.setItem("accesorios", JSON.stringify(carrito));
        } else {
            carritoStorage.push(accesorio);
            localStorage.setItem("accesorios", JSON.stringify(carritoStorage));
        }
    }

    // Funciones del bonton (resta el stock, y guarda en storage):

    const gestionarCompra = (accesorio, array) => {
        accesorio.restarStock();
        let stockActualizado = document.getElementById(`stock${array.indexOf(accesorio)}`);
        stockActualizado.innerHTML = `Stock: ${accesorio.stock}`;
        guardarEnStorage(accesorio);

    };

    // Agrego elementos a las Pagina Accesorios y Ropa:

    let contenedorArticulos = document.getElementById("contenedorAccesorios");
    let filtroArticulos;

    if (contenedorArticulos) {
        filtroArticulos = listadoArticulos.filter((item) => item.tipo == "Elasticos" || item.tipo == "Mancuernas" || item.tipo == "Tobilleras" || item.tipo == "Colchonetas");
    } else {
        contenedorArticulos = document.getElementById("contenedorRopa");
        filtroArticulos = listadoArticulos.filter((item) => item.tipo == "Tops" || item.tipo == "Calzas" || item.tipo == "Polleras" || item.tipo == "Buzos");
    };

    contenedorArticulos.className = "gridImagenes";

    const cargarArticulos = (arrayArticulos) => {
        for (let i=0; i < arrayArticulos.length; i++){
            let item = arrayArticulos[i];
            let div = document.createElement("div");
            let boton = document.createElement("button");
            boton.innerHTML = "Agregar al carrito";
            boton.className = "botonCarrito";
            boton.addEventListener("click", () => gestionarCompra(item, arrayArticulos));
            let tipo = document.createElement("h3");
            tipo.innerHTML = item.tipo;
            tipo.className = "centrarTitulo";
            let imagen = document.createElement("img");
            imagen.src = item.imagen;
            let precio = document.createElement("p");
            precio.innerHTML = `Precio: $ ${item.precio}`;
            let stock = document.createElement("p");
            stock.innerHTML = `Stock: ${item.stock}`;
            stock.id = `stock${i}`;
            div.append(tipo, imagen, precio, stock, boton);  
            contenedorArticulos.append(div);
        };
    };
    cargarArticulos(filtroArticulos);

    // Select: para permitir al usuario filtrar por tipo de Articulo o de Ropa :

    const selectArticulos = ["Todos","Elasticos","Mancuernas","Tobilleras","Colchonetas"];
    const selectRopa = ["Todos","Tops","Calzas","Polleras","Buzos"];
    let contenedorSelectAccesorios = document.getElementById("contenedorSelectAccesorios");
    let seleccion = document.createElement("select");

    if (contenedorSelectAccesorios){
        contenedorSelectAccesorios.className = "botonSelect";
        for (const accesorio of selectArticulos){
            let opcion = document.createElement("option");
            opcion.value = accesorio;
            opcion.innerHTML = accesorio;
            seleccion.append(opcion);
        };
        contenedorSelectAccesorios.append(seleccion);
    } else{
        let contenedorSelectRopa = document.getElementById("contenedorSelectRopa");
        contenedorSelectRopa.className = "botonSelect";
        for (const accesorio of selectRopa){
            let opcion = document.createElement("option");
            opcion.value = accesorio;
            opcion.innerHTML = accesorio;
            seleccion.append(opcion);
        };
        contenedorSelectRopa.append(seleccion);
    }

    // Switch para el Select:

    let arrayArticulos;
    const seleccionAccesorio = (e) => {
        const opcion = e.target.value; 
        console.log(opcion);
        let contenedorArticulos = document.getElementById("contenedorAccesorios");
        if (contenedorArticulos){
            if (opcion == "Elasticos" || opcion == "Mancuernas" || opcion == "Tobilleras" || opcion == "Colchonetas") {
                contenedorArticulos.innerHTML = "";
                arrayArticulos = filtroArticulos.filter((item) => item.tipo == opcion);
                cargarArticulos(arrayArticulos);
            }   else {
                contenedorArticulos.innerHTML = "";
                cargarArticulos(filtroArticulos);
            }
        } 
        else {
            contenedorArticulos = document.getElementById("contenedorRopa");
            if (opcion == "Tops" || opcion == "Calzas" || opcion == "Polleras" || opcion == "Buzos") {
                contenedorArticulos.innerHTML = "";
                arrayArticulos = filtroArticulos.filter((item) => item.tipo == opcion);
                cargarArticulos(arrayArticulos);
            }   else {
                contenedorArticulos.innerHTML = "";
                cargarArticulos(filtroArticulos);
            };
        };
    };

    seleccion.addEventListener("change", (e)=> seleccionAccesorio(e));


});



