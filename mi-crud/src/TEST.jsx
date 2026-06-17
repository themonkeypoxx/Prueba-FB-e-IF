import { useState,useRef,useEffect } from "react";
import { v4 as uuid } from "uuid";
import ToDoItem from "./ToDoItem";

const KEY="chapuzas-productos";//el nombre que tendrá el arreglo en el localStorage


function TEST(){
    //ESTA SE QUEDA (es lo que revisa q la lista este vacía o no)
    const [todos,setTodos]=useState(
        JSON.parse(localStorage.getItem(KEY))?JSON.parse(localStorage.getItem(KEY)):[]
    );
    // ESTO SE CLONÓ VARIAS VECES. El coso original usa solo 1 campo, pero nosotros ocupamos 4
    const nombreRef = useRef();
    const precioRef = useRef();
    const stockRef = useRef();
    const descripcionRef = useRef();

    // ESTA SE QUEDA (es el guardado automático)
    useEffect(()=>{
        localStorage.setItem(KEY,JSON.stringify(todos));
        },[todos]);//cuando cambie el todos lo guarda en localStorage
    
    const agregarTarea=()=>{
        const task=taskRef.current.value;
        const id=uuid();
        console.log(id);
        if(task==='')return;
        setTodos((prevTodos)=>{
            const newTask = {
                id: id,
                task: task,
                complete:false
            }
            return [...prevTodos, newTask]
        });
        taskRef.current.value="";
    }
    
    const eliminarTareasCompletadas=()=>{
        const newTodos=todos.filter((todo)=>!todo.complete);
        setTodos(newTodos);
    }

    const cambiarEstadoTarea=(id)=>{
        
        const newTodos=[...todos];
        const todo=newTodos.find((todo)=>todo.id===id);
        todo.complete=!todo.complete;
        setTodos(newTodos);
    }
    
    const cantidadTareas=()=>{
        return todos.filter((todo)=>!todo.complete).length;
    }
    const ResumenTareas=()=>{
        const cantidad=cantidadTareas();
        if(cantidad>1){
            return (<div className="alert alert-info mt-3">
            Te quedan {cantidad} tareas pendientes!
            </div>);
        }else if(cantidad===1){
            return (<div className="alert alert-info mt-3">
            Te queda {cantidad} tarea pendiente!
            </div>);
        }else{
            return (<div className="alert alert-info mt-3">
            No te quedan tareas pendientes!
        </div>);
        }   
    }
    
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