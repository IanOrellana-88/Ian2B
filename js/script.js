// URL de la API - Endpoint
const API_URL = "https://retoolapi.dev/BuWOdF/Expo";

// Función para llamar a la API y traer el JSON
async function ObtenerPersonas() {
  try {
    // Obtener la respuesta del servidor
    const res = await fetch(API_URL); // Obtener datos de la API

    // Verificar si la respuesta es exitosa
    if (!res.ok) {
      throw new Error("Error al obtener datos de la API");
    }

    // Convertir la respuesta del servidor a formato JSON
    const data = await res.json();

    // Mostrar los datos en la tabla
    CrearTabla(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un problema al obtener los datos.");
  }
}

// Función que creará las filas de la tabla en base a los registros de la API
function CrearTabla(datos) {
  const tabla = document.querySelector("#tabla tbody");

  // Vaciar el contenido de la tabla
  tabla.innerHTML = "";

  datos.forEach((persona) => {
    tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.Nombre}</td>
            <td>${persona.Apellido}</td>
            <td>${persona.Edad}</td>
            <td>${persona.Correo}</td>
            <td> 
                <button onclick="AbrirModalEditar('${persona.Nombre}', '${persona.Apellido}', ${persona.Edad}, '${persona.Correo}', ${persona.id})">Editar</button>
                <button onClick="EliminarRegistro(${persona.id})">Eliminar</button>
            </td>
        </tr>
    `;
  });
}

ObtenerPersonas();

// Proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
  modal.showModal();
});

btnCerrar.addEventListener("click", () => {
  modal.close();
});

// Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async (e) => {
  e.preventDefault();

  const Nombre = document.getElementById("nombre").value.trim();
  const Apellido = document.getElementById("apellido").value.trim();
  const Edad = document.getElementById("edad").value.trim();
  const Correo = document.getElementById("email").value.trim();

  if (!Nombre || !Apellido || !Correo || !Edad) {
    alert("Complete todos los campos");
    return;
  }

  // Validar que la edad sea un número válido
  if (isNaN(Edad) || Edad <= 0) {
    alert("La edad debe ser un número válido");
    return;
  }

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Nombre, Apellido, Edad, Correo }),
    });

    if (respuesta.ok) {
      alert("El Registro fue agregado correctamente");

      // Limpiar el formulario
      document.getElementById("frmAgregarIntegrante").reset();

      modal.close();

      // Actualizar la lista de personas
      ObtenerPersonas();
    } else {
      alert("Hubo un error al agregar");
    }
  } catch (error) {
    console.error("Error al agregar:", error);
    alert("Hubo un problema al agregar el registro.");
  }
});

// Para eliminar registros
async function EliminarRegistro(id) {
  if (confirm("¿Seguro que quieres borrar este registro?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      ObtenerPersonas();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Hubo un problema al eliminar el registro");
    }
  }
}

// Proceso para editar registros
const modalEditar = document.getElementById("modalEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

btnCerrarEditar.addEventListener("click", () => {
  modalEditar.close();
});

function AbrirModalEditar(Nombre, Apellido, Edad, Correo, id) {
  document.getElementById("idEditar").value = id;
  document.getElementById("nombreEditar").value = Nombre;
  document.getElementById("apellidoEditar").value = Apellido;
  document.getElementById("EdadEditar").value = Edad;
  document.getElementById("emailEditar").value = Correo;

  modalEditar.showModal();
}

document.getElementById("frmEditarIntegrante").addEventListener("submit", async (e) => {
  e.preventDefault();

  const Nombre = document.getElementById("nombreEditar").value.trim();
  const Apellido = document.getElementById("apellidoEditar").value.trim();
  const Edad = document.getElementById("EdadEditar").value.trim();
  const Correo = document.getElementById("emailEditar").value.trim();
  const id = document.getElementById("idEditar").value.trim();

  if (!Nombre || !Apellido || !Edad || !Correo || !id) {
    alert("Complete todos los campos");
    return;
  }

  // Validar que la edad sea un número válido
  if (isNaN(Edad) || Edad <= 0) {
    alert("La edad debe ser un número válido");
    return;
  }

  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Edad, Correo, Nombre, Apellido }),
    });

    if (respuesta.ok) {
      alert("Registro actualizado correctamente");
      modalEditar.close();
      ObtenerPersonas();
    } else {
      alert("Error al actualizar");
    }
  } catch (error) {
    console.error("Error al actualizar:", error);
    alert("Hubo un problema al actualizar el registro.");
  }
});
