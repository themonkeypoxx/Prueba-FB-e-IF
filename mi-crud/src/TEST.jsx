import { useState,useRef,useEffect } from "react";
import {v4 as uuid} from 'uuid';//npm i uuid

const KEY="todolist-todos";//el nombre que tendrá el arreglo en el localStorage


function TEST(){

    const [todos,setTodos]=useState(
        JSON.parse(localStorage.getItem(KEY))?JSON.parse(localStorage.getItem(KEY)):[]
    );

    const taskRef=useRef();

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
            <h1>Listado de Tareas</h1>
            <div className="input-group mb-3 mt-4">
                <input ref={taskRef} placeholder="Ingrese una tarea" className="form-control" type="text" name="" id="">
                </input>{/*  soy un comentario  */}
                <button onClick={agregarTarea} className="btn btn-success ms-2"><i className="bi bi-plus-circle-fill">
                    </i></button>
                <button onClick={eliminarTareasCompletadas} className="btn btn-danger ms-2"><i className="bi bi-trash">
                    </i></button>
            </div>
            <ul className="list-group">
                {todos.map((todo)=><ToDoItem todo={todo} key={todo.id} cambiarEstado={cambiarEstadoTarea}></ToDoItem>)}
                {/*soy comentario*/}
            </ul>
            <ResumenTareas/>
        </>
    );
};
export default TEST;