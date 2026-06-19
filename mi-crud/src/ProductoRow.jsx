import React from 'react';

function ProductoRow({ producto, eliminarProducto }) {
    const { id, nombre, precio, stock, descripcion } = producto;

    return (
        <tr>
            <td>{nombre}</td>
            <td>${precio}</td>
            <td>{stock || 0} u.</td>
            <td>{descripcion || <i>Sin descripción</i>}</td>
            <td>
                <button 
                    onClick={() => eliminarProducto(id)} 
                    className="btn btn-danger btn-sm"
                >
                    Eliminar
                </button>
            </td>
            <td>
                <button 
                    onClick={() => eliminarProducto(id)} 
                    className="btn btn-danger btn-sm"
                >
                    Editar
                </button>
            </td>
        </tr>
    );
}
export default ProductoRow;