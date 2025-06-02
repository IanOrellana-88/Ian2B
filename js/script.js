//URL de la API - Endpoint
const API_URL = "https://retoolapi.dev/BuWOdF/Expo";

//Funcion para llamara a la API y traer el JSON
async function ObtenerPersonas() {
    //Obtener la respuesta del servidor 
    const res = await fetch(API_URL); //Obtener datos de la API

    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json();

    CrearTabla(data); //Enviamos el JSON a la funcion "CrearTabla"
}

//Funcion que creara las filas de las tablas en base a los reguistros de la API

function CrearTabla(datos) {//"Datos" respresenta al JSON que viene de la api
    //se llama "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.Nombre}</td>
            <td>${persona.Apellido}</td>
            <td>${persona.Edad}</td>
            <td>${persona.Correo}</td>
        <td> 
            <button>Editar</button>
            <button>Eliminar</button>
        </td>
        </tr>
        `
    });
}

ObtenerPersonas();



//proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", () => {
    modal.showModal();
});


btnCerrar.addEventListener("click", () => {
    modal.close();
});


//Agregar nuevo integrante desde el fomrulario

document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e => {
    e.preventDefault();


    const Nombre = document.getElementById("nombre").value.trim();
    const Apellido = document.getElementById("apellido").value.trim();
    const Edad = document.getElementById("edad").value.trim();
    const Correo = document.getElementById("email").value.trim();


    if(!Nombre || !Apellido || !Correo || !Edad){
        alert("Complete todos los campos");
        return;


    }
    //Lllamar a la API para enviar el usuario

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({Nombre, Apellido, Edad, Correo})

    });


    if(respuesta.ok){
        alert("El Registro fue agregado correctamente");


        document.getElementById("frmAgregarIntegrante").reset();

        modal.close();


        ObtenerPersonas();
    }

    else{
        alert("Haguio un error al agregar");
    }


}); //Fin del formularios

