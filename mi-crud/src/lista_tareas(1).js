let tareas=[];
let listaTareas=document.getElementById("listaTareas");
//console.log(listatareas);
listarTareas(tareas);

function listarTareas(t){
    listaTareas.innerHTML="";
    t.forEach(tarea => {
        li=document.createElement("li");
        li.textContent=tarea;
        listaTareas.appendChild(li);
        li.className="list-group-item";
    });
}

let btnAgregar = document.getElementById("btnAgregar"); //capura el botón
btnAgregar.addEventListener("click", agregarTarea);  //agrega un evento click al botón agregar q activa la función agregar tarea
//función q agrega tareas
function agregarTarea() {
    let tarea = document.getElementById("txtTarea").value; //captura el valor del input
    tareas.push(tarea);  //agrega la tarea al array
    listarTareas(tareas); //llama función para mostrar tareas en ul
    let btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click", buscarTarea); 
    function buscarTarea() {
        let tareaBuscada = document.getElementById("txtTarea").value; //captura input
        if (tareaBuscada == "") { //si input está vacío
            listarTareas(tareas);
        }else { //si no está vacío
        tareasEncontradas = tareas.filter((tarea) => tarea == tareaBuscada); //filtra q concidan cn lo q buscaron lol
        if (tareasEncontradas.length > 0){ //si se encuentra algo
            listarTareas(tareasEncontradas);
        } else { //si no se encuentra nada
            Swal.fire({
                icon: "error", //tipo msj
                title: "Oops...", //título msj
                text: "No se encontró NADOTA!!!", //txt del msj
                footer: "", //pie del msj
            });
        }
    }
}
}
let modalEditar = new bootstrap.Modal(document.getElementById("modalEditar")); //crea modal de bootstrap
let btnEditar = document.getElementById("btnEditar"); //captura btn
btnEditar.addEventListener("click", buscarTareaEditar);
let i = 0;
function buscarTareaEditar(){
    let tarea_buscada = document.getElementById("txtTarea").value; //captura input
    i = tareas.findIndex((tarea) => tarea == tarea_buscada); //busca la tarea en el array
    if (i == -1) { //si no se encuentra nd
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No hay tarea para editar con ese nombre",
            footer: "",
        });
     } else {
        let tituloModal = document.getElementById("modalEditarLabel"); //captura título d modal
        tituloModal.textContent = "Editando " + tareas[i]; //asigna titulo
        modalEditar.show(); //lomuestralol
     };
}

let btnGuardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener("click", guardarTarea);
function guardarTarea(){
    let tarea_nueva = document.getElementById("tarea_nueva").value; //captura input
    modalEditar.hide(); //oculta modal
    tareas[i] = tarea_nueva; //asigna tarea en posición i
    listarTareas(tareas); //llama a listar tareas para listar las tareas xdxd ejjjeje
}


let modalEliminar = new bootstrap.Modal(
    document.getElementById("modalEliminar")
);
let btnEliminar = document.getElementById("btnEliminar");
btnEliminar.addEventListener("click", eliminarTarea);
function eliminarTarea(){
    let tarea_buscada = document.getElementById("txtTarea").value;
    i = tareas.findIndex((tarea) => tarea == tarea_buscada);
    if (i == -1){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No existe esa tarea que quieres eliminar.",
            footer: "",
        });
    } else {
        let tituloModal = document.getElementById("modalEliminarLabel");
        tituloModal.textContent = "Eliminando " + tareas[i];
        modalEliminar.show()
    }
}

let btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", deleteTarea);
function deleteTarea(){
    modalEditar.hide();
    tareas = tareas.filter(t=>t!=tareas[i]); //asigna tarea nueva pos i
    listarTareas(tareas);
}