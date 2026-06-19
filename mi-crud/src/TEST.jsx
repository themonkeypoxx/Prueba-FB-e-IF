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
                <header>
                    <h1>Chapuzas</h1>
                    <ul>
                        <li>© 2026 Ismael Figueroa, Francico Briones</li>
                    </ul>
                </header>
                <div className="card text-center">
                <div className="card-header" id="headCaja">
                    <h3>Administrador de productos chapuzas</h3>
                </div>
                <div className="card-body" id="cajaInputs">
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
                        <i class="bi bi-plus-circle"></i>
                        Añadir Producto
                    </button>
                    <div className="card">
                <div className="card-header bg-secondary text-white" id="preTabla">
                    <h5>Lista de Productos en Inventario</h5>
                </div>
                        <div className="card-body p-0">
                            <table className="table table-dark table-hover" id="Tabla">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col" colSpan="2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productos.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center text-muted p-3">No hay productos registrados.</td>
                                            </tr>
                                        ) : (
                                            productos.map((producto) => (
                                                <ProductoRow 
                                                    key={producto.id} 
                                                    producto={producto} 
                                                    eliminarProducto={eliminarProducto} 
                                                />
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TEST;