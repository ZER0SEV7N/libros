//Script para consumir el API de libros
//Todas las peticiones se realizan desde la url http://localhost:3000/libros

//Funcion para obtener un libro por ID y llenar el formulario para actualizarlo
async function obtenerLibroParaEditar(){
  //Obtener el id del libro a editar desde la url
  const params = new URLSearchParams(window.location.search);
  const idlibro = params.get("idlibro");
  if (idlibro) {
    try {
      //Peticion para obtener el libro
      const res = await fetch(`http://localhost:3000/libros/${idlibro}`);
      if (res.ok) {
        //Llenar los elemetos del formulario con los datos del libro
        const libro = await res.json();
        document.getElementById("idlibro").value = libro.idlibro;
        document.getElementById("nombre").value = libro.nombre;
        document.getElementById("autor").value = libro.autor;
        document.getElementById("descripcion").value = libro.descripcion;
        document.getElementById("fechapublicacion").value = libro.fechapublicacion.split("T")[0];
        document.getElementById("genero-select").value = libro.idgenero; 
        document.getElementById('titulo-form').textContent = 'Actualizar Libro';
        document.getElementById('registrar-btn').textContent = 'Actualizar libro';
      } else {
        alert("Error al obtener el libro para editar");
      }
    } catch (e) {
      console.error("Error al obtener libro para editar: ", e);
    }
  }
}

//Funcion para manejar los formularios de registrar y actualizar libros
function manejarFormularios() {
  const form = document.getElementById("crear-form");
  if (!form) return;
  //Agregar un evento de submit al formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.idgenero = parseInt(data.idgenero);
    //Obtener el idlibro
    const idlibro = data.idlibro;
    delete data.idlibro;

    try {
      let res;
      //Si se manda el id, se maneja el formulario como actualizacion
      if (idlibro) {
        res = await fetch(`http://localhost:3000/libros/${idlibro}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
        //Si no se manda el id, se maneja el formulario como creacion
      } else {
        res = await fetch("http://localhost:3000/libros", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      //Si se crea o se actualiza, mostrar un mensaje
      if (res.ok) {
        alert(
          idlibro ? "Libro actualizado con éxito" : "Libro creado con éxito",
        );
        //Redirigir a la página de libros después de crear o actualizar
        window.location.href = "index.html"; 
      } else {
        const error = await res.json();
        alert(idlibro ? `Error al actualizar libro: ${error.message}` : `Error al crear libro: ${error.message}`);
      }
    } catch (e) {
      alert("Error al manejar el formulario, por favor intente de nuevo");
      console.error("Error al manejar formularios: ", e);
    }
  });
}

//Funcion para Obtener los libros del backend
async function getLibros() {
  try {
    const res = await fetch("http://localhost:3000/libros");
    const data = await res.json();
    FormatearLibro(data);
  } catch (e) {
    console.error("Error al obtener libros: ", e);
  }
}

//Funcion para obtener todos los libros y mostrarlos en la tabla
function FormatearLibro(data) {
  const librosTable = document.getElementById("libro-list");
  //Limpiar la tabla antes de llenarla con los libros
  librosTable.innerHTML = "";

  //Llenar la tabla con los libros
  data.forEach((element) => {
    librosTable.innerHTML += `<tr>
      <td>${element.idlibro}</td>
      <td>${element.nombre}</td>
      <td>${element.autor}</td>
      <td>${element.descripcion}</td>
      <td>${element.fechapublicacion.split("T")[0]}</td>
      <td>${element.generos?.nombre || element.nombre_genero || 'No cargado'}</td>
      <td>
        <div class="d-flex gap-2">
          <button class="editar-btn btn btn-outline-primary" onclick="editarLibro(${element.idlibro})">Actualizar</button>
          <button class="eliminar-btn btn btn-outline-danger" onclick="eliminarLibro(${element.idlibro})">Eliminar</button>
        </div>
      </td>
    </tr>`;
  });
}

//Funcion para cargar los generos en el select
function cargarGeneros() {
  //Realizar una solicitud al backend
  fetch("http://localhost:3000/generos")
    .then((response) => response.json())
    .then((data) => {
      //Llenar el select con los generos
      const generoSelect = document.getElementById("genero-select");
      generoSelect.innerHTML = `<option value="">Seleccione un genero</option>`;
      data.forEach((element) => {
        generoSelect.innerHTML += `<option value="${element.idgenero}">${element.nombre}</option>`;
      });
    });
}

//Funcion para eliminar un libro por ID
function eliminarLibro(idlibro) {
  const confirmacion = confirm("¿Estas seguro de eliminar este libro?");
  if (confirmacion) {
    fetch(`http://localhost:3000/libros/${idlibro}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert(`Libro con ID: ${idlibro} eliminado con exito`);
          //Redirigir a la página de libros después de eliminar
          window.location.href = "index.html";
        } else {
          alert("Error al eliminar el libro");
        }
      })
    .catch((e) => console.error("Error al eliminar: ", e));
  }
}

//Funcion para filtrar los libros por multitud de criterios
function filtrarLibros() {
  const nombre = document.getElementById("filtro-nombre").value.trim();
  const autor = document.getElementById("filtro-autor").value.trim();
  const fechapublicacion = document.getElementById(
    "filtro-fechapublicacion",
  ).value;
  const genero = document.getElementById("genero-select").value;

  console.log("Filtros aplicados: ", {
    nombre,
    autor,
    fechapublicacion,
    genero,
  });
  //Crear el params para la url
  const params = new URLSearchParams();

  //Agregar los params solo si tienen valor
  if (nombre) params.append("nombre", nombre);
  if (autor) params.append("autor", autor);
  if (fechapublicacion) params.append("fechapublicacion", fechapublicacion);
  if (genero) params.append("genero", genero);

  //Realizar la solicitud al backend con los filtros
  if (params.toString()) {
    fetch(`http://localhost:3000/libros/filtrar?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        //Limpiar la tabla y filtrar
        document.getElementById("libro-list").innerHTML = ""; 
        FormatearLibro(data); 
      });
  } else {
    //Limpiar la tabla y mostrar los libros
    document.getElementById("libro-list").innerHTML = "";
    getLibros(); 
  }
}

//Funcion para editar un libro por ID
async function editarLibro(idlibro) {
  window.location.href = `form.html?idlibro=${idlibro}`; 
}

//Funcion para cargar el navbar modularizado
async function cargarNavbar() {
  try {
    const res = await fetch('layout/navbar.html');
    if (res.ok) {
      const navbarHtml = await res.text();
      const navbarContainer = document.getElementById('navbar-container');
      if (navbarContainer) {
        navbarContainer.innerHTML = navbarHtml;
      }
    }
  } catch (e) {
    console.error("Error al cargar el navbar: ", e);
  }
}

//Cargar los generos y los libros al iniciar la pagina
document.addEventListener("DOMContentLoaded", () => {
  //Cargar generos para ambos
  cargarGeneros();
  cargarNavbar();

  const filtros = document.getElementById("filtro-form");
  if(filtros){
    document.addEventListener("reset", () => {
      //Limpiar los filtros y mostrar todos los libros
      document.getElementById("filtro-nombre").value = "";
      document.getElementById("filtro-autor").value = "";
      document.getElementById("filtro-fechapublicacion").value = "";
      document.getElementById("genero-select").value = "";
      getLibros();
    });
  }

  //Unicamente para formulario
  if(document.getElementById("crear-form")){
    manejarFormularios();
    obtenerLibroParaEditar();
  }

  //Unicamente para la lista de libros
  if (document.getElementById("libro-list")) {
    getLibros();
    //Recoger los elementos del filtro
    document
      .getElementById("filtro-nombre")
      .addEventListener("input", filtrarLibros);
    document
      .getElementById("filtro-autor")
      .addEventListener("input", filtrarLibros);
    document
      .getElementById("filtro-fechapublicacion")
      .addEventListener("input", filtrarLibros);
    document
      .getElementById("genero-select")
      .addEventListener("change", filtrarLibros);
  }
});
