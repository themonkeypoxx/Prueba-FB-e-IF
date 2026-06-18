import { useState,useRef,useEffect } from "react";
import { v4 as uuid } from "uuid";
import ProductoRow from "./ProductoRow";

const KEY="chapuzas-productos";//el nombre que tendrá el arreglo en el localStorage

//////////////////////ya le meti el crud josue

//SOLO FALTA UN HTML CONECTADO A ESTO Y QUE EL PRODUCTOROW RENDERIZE LOS COSOS EN LA TABLA QUE TENDRA EL HTML
//pq aun no estan conectados ejejjejej
function TEST(){
    //ESTA SE QUEDA (es lo que revisa q la lista este vacía o no)
    const [productos, setProductos]=useState(
        JSON.parse(localStorage.getItem(KEY))?JSON.parse(localStorage.getItem(KEY)):[]
    );
    // ESTO SE CLONÓ VARIAS VECES. El coso original usa solo 1 campo, pero nosotros ocupamos 4
    const nombreRef = useRef();
    const precioRef = useRef();
    const stockRef = useRef();
    const descripcionRef = useRef();

    // ESTA SE QUEDA (es el guardado automático)
    useEffect(()=>{
        localStorage.setItem(KEY,JSON.stringify(productos));
        },[productos]);//cuando cambie el array d los productos lo guarda en localStorage
    
    const agregarProducto = () => {
        const nombre = nombreRef.current.value;
        const precio = precioRef.current.value;
        const stock = stockRef.current.value;
        const descripcion = descripcionRef.current.value;

        // Validación básica (que los campos obligatorios no estén vacíos)
        if (nombre === '' || precio === '') return;

        setProductos((prevProductos) => {
            const nuevoProducto = {
                id: uuid(), // ID único
                nombre: nombre,
                precio: precio,
                stock: stock,
                descripcion: descripcion
            };
            return [...prevProductos, nuevoProducto];
        });

        nombreRef.current.value = "";
        precioRef.current.value = "";
        stockRef.current.value = "";
        descripcionRef.current.value = "";
    };

    const eliminarProducto = (id) => {
        const nuevosProductos = productos.filter((prod) => prod.id !== id);
        setProductos(nuevosProductos);
    };
    
    return (
        ////////////////////////////
        ///// ESTE ES EL HTML /////
        ///////////////////////////
        <>
            <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous"></link>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </head>
            <body>
 
                <h1>Chapuzas</h1>
                <div class="card text-center">
                <div class="card-header">
                    <h3>Administrador de productos chapuzas</h3>
                </div>
                <div class="card-body">
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Precio</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">stock</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Descripcion</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                </div>
                <div class="card-footer text-body-secondary">
                    2 days ago
                </div>
                </div>
            </body>
            </html>
        </>
    );
};
export default TEST;