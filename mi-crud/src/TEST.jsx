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
                <h1>Chapuzas</h1>
                <div className="card text-center">
                <div className="card-header">
                    <h3>Administrador de productos chapuzas</h3>
                </div>
                <div className="card-body">
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
                        <input ref={nombreRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Precio</span>
                        <input ref={precioRef}  type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">stock</span>
                        <input ref={stockRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Descripcion</span>
                        <input ref={descripcionRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                    <button onClick={agregarProducto} className="btn btn-success w-100">
                        Añadir Producto
                    </button>
                    </div>
                </div>
        </>
    );
};
export default TEST;