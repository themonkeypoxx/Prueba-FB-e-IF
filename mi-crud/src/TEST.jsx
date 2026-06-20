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

    const [idEditando, setIdEditando] = useState(null);

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

    //Carga los datos del producto elegido en los inputs
    const cargarProductoEditar = (producto) => {
        setIdEditando(producto.id);
        
        nombreRef.current.value = producto.nombre;
        precioRef.current.value = producto.precio;
        stockRef.current.value = producto.stock;
        descripcionRef.current.value = producto.descripcion || "";
    };

    //Procesa la actualización del producto editado
    const actualizarProducto = () => {
        const nombre = nombreRef.current.value;
        const precio = precioRef.current.value;
        const stock = stockRef.current.value;
        const descripcion = descripcionRef.current.value;

        if (nombre === '' || precio === '') return;

        const productosActualizados = productos.map((prod) => {
            if (prod.id === idEditando) {
                return { ...prod, nombre, precio, stock, descripcion };
            }
            return prod;
        });

        setProductos(productosActualizados);
        cancelarEdicion(); // Limpia los campos y sale del modo edición
    };

    //Limpia el formulario si desisten de editar
    const cancelarEdicion = () => {
        setIdEditando(null);
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
        <>
            <header>
                <h1><img id="logo-esquina" src="/logo_enclave.jpg" alt="Logo Enclave" />Direccion de Experimentos ENCLAVE</h1>
                <ul>
                    <li>© 2026 Ismael Figueroa, Francisco Briones</li>
                </ul>
            </header>
            <div className="card text-center">
                <div className="card-header" id="headCaja">
                    <h3>Administrador de Refugios vault-Tec</h3>
                </div>
                <div className="card-body" id="cajaInputs">
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Nombre</span>
                        <input ref={nombreRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Precio</span>
                        <input ref={precioRef} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Cantidad/Personas</span>
                        <input ref={stockRef} type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Descripción</span>
                        <input ref={descripcionRef} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>

                    {/*Si está editando muestra "Guardar", si no, muestra tu botón de siempre */}
                    {idEditando ? (
                        <>
                            <button onClick={actualizarProducto} className="btn btn-primary w-100 mb-2">
                                <i class="bi bi-floppy2"></i>
                                Guardar Cambios
                            </button>
                            <button onClick={cancelarEdicion} className="btn btn-secondary w-100 mb-3">
                                <i class="bi bi-x-octagon-fill"></i>
                                Cancelar Edición
                            </button>
                        </>
                    ) : (
                        <button onClick={agregarProducto} className="btn btn-success w-100">
                            <i className="bi bi-plus-circle"></i>
                            Añadir Producto
                        </button>
                    )}

                    <div className="card mt-3">
                        <div className="card-header bg-secondary text-white" id="preTabla">
                            <h5><img src="/logo_vaul.png" alt="Logo Vault-Tec" />Lista de Refugios en Inventario Vault-Tec</h5>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-dark table-hover" id="Tabla">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Cantidad/Personas</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col" colSpan="2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productos.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted p-3">No hay productos registrados.</td>
                                            </tr>
                                        ) : (
                                            productos.map((producto) => (
                                                <ProductoRow
                                                    key={producto.id}
                                                    producto={producto}
                                                    eliminarProducto={eliminarProducto}
                                                    editarProducto={cargarProductoEditar} 
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
}
export default TEST;