//Script para consumir el API de libros
//Todas las peticiones se realizan desde la url http://localhost:3000/libros

//Funcion para manejar los formularios de registrar y actualizar libros
function manejarFormularios() {
  const form = document.getElementById("crear-form");
  if (!form) return;
  //Agregar un evento de submit al formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    //Convertir el FormData a un objeto
    const data = Object.fromEntries(formData.entries());
    //Convertir el idgenero a un numero entero
    data.idgenero = parseInt(data.idgenero);
    //Obtener el idlibro
    const idlibro = data.idlibro;
    //Eliminarlo del objeto para no se envie en el cuerpo de la solicitud
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

      if (res.ok) {
        alert(
          idlibro ? "Libro actualizado con éxito" : "Libro creado con éxito",
        );
        window.location.href = "index.html"; //Redirigir a la página de libros después de crear o actualizar
      } else {
        const error = await res.json();
        alert("Error al actualizar libro:", error);
      }
    } catch (e) {
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

  //Llenar la tabla con los libros
  data.forEach((element) => {
    librosTable.innerHTML += `<tr>
      <td>${element.idlibro}</td>
      <td>${element.nombre}</td>
      <td>${element.autor}</td>
      <td>${element.descripcion}</td>
      <td>${element.fechapublicacion.split("T")[0]}</td>
      <td>${element.generos?.nombre || element.nombre_genero}</td>
      <td>
        <button class="editar-btn" onclick="editarLibro(${element.idlibro})">Actualizar</button>
        <button class="eliminar-btn" onclick="eliminarLibro(${element.idlibro})">Eliminar</button>
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
          libroeliminado.value = "";
          window.location.href = "index.html"; //Redirigir a la página de libros después de eliminar
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
        document.getElementById("libro-list").innerHTML = ""; //Limpiar la tabla antes de mostrar los resultados filtrados
        FormatearLibro(data); //Actualizar la tabla de libros con los resultados filtrados
      });
  } else {
    document.getElementById("libro-list").innerHTML = ""; //Limpiar la tabla antes de mostrar todos los libros
    getLibros(); //Si no hay filtros, mostrar todos los libros
  }
}

//Funcion para editar un libro por ID
async function editarLibro(idlibro) {
  try {
    const res = await fetch(`http://localhost:3000/libros/${idlibro}`);
    const libro = await res.json();
    //Llenar el formulario con los datos del libro
    document.getElementById("idlibro").value = libro.idlibro;
    document.getElementById("nombre").value = libro.nombre;
    document.getElementById("autor").value = libro.autor;
    document.getElementById("descripcion").value = libro.descripcion;
    document.getElementById("fechapublicacion").value = libro.fechapublicacion.split("T")[0];
    document.getElementById("genero-select").value = libro.idgenero;
    //Cambiar el titulo del formulario a "Actualizar Libro"
    document.getElementById("titulo-form").textContent = "Actualizar Libro";
  } catch (e) {
    console.error("Error al obtener libro por ID: ", e);
  }
}

//Cargar los generos y los libros al iniciar la pagina
document.addEventListener("DOMContentLoaded", () => {
  cargarGeneros();

  manejarFormularios();

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
