import React from 'react';

function ProductoRow({ producto, eliminarProducto, editarProducto }) {
    const { id, nombre, precio, stock, descripcion } = producto;

    return (
        <tr>
            <td>{nombre}</td>
            <td>${precio}</td>
            <td>{stock || 0} u.</td>
            <td>{descripcion || <i>Sin descripción</i>}</td>
            
            <td>
                <button onClick={() => editarProducto(producto)} className="btn btn-warning btn-sm">
                    <i className="bi bi-pencil-square me-1"></i>
                    Editar
                </button>
            </td>

            <td>
                <button onClick={() => eliminarProducto(id)} className="btn btn-danger btn-sm">
                    <i className="bi bi-trash3-fill me-1"></i>
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

export default ProductoRow;