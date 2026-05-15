// DENTRO DE TU HTML (en el script del formulario)
document.getElementById("formCuestionario").addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const p1 = parseInt(document.getElementById("pregunta1").value) || 0;
    const p2 = parseInt(document.getElementById("pregunta2").value) || 0;
    const p3 = parseInt(document.getElementById("pregunta3").value) || 0;
    const dolor = parseInt(document.getElementById("dolor").value) || 0;

    let puntaje = p1 + p2 + p3;
    let resultado = document.getElementById("resultado");
    
    // Limpiamos clases previas
    resultado.className = "resultado";

    let mensaje = "";
    let grado = "";

    if (puntaje >= 4 && dolor >= 7) {
        mensaje = "Posible condromalacia rotuliana (ALTA probabilidad)";
        grado = "Grado III - IV (Avanzado)";
        resultado.classList.add("alto");
    } else if (puntaje >= 2 && dolor >= 4) {
        mensaje = "Posible condromalacia (MODERADA)";
        grado = "Grado II";
        resultado.classList.add("medio");
    } else {
        mensaje = "Baja probabilidad de condromalacia";
        grado = "Grado I o sin lesión";
        resultado.classList.add("bajo");
    }

    resultado.innerHTML = `
        <h3>Resultado</h3>
        <p><strong>Paciente:</strong> ${nombre}</p>
        <p>${mensaje}</p>
        <p><strong>Evaluación:</strong> ${grado}</p>
        <p><strong>Recomendación:</strong><br>
        ${dolor >= 7 ? "⚠ Se recomienda acudir a un especialista lo antes posible." :
        "✔ Puedes iniciar ejercicios de rehabilitación y monitoreo."}
        </p>
    `;

    // ENVIAR AL SERVIDOR (Ajusta el puerto a 3000 que es el de tu Node.js)
    fetch("http://localhost:3000/guardar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, puntaje, dolor, grado })
    })
    .then(res => console.log("Datos guardados en DB"));
});




// Función para abrir el modal al picar el logo
function abrirAuth() {
    // Si ya hay un usuario logueado, podríamos mostrar su perfil o cerrar sesión
    if (usuarioActivo) {
        let confirmar = confirm(`Usuario activo: ${usuarioActivo}. ¿Deseas cerrar sesión?`);
        if (confirmar) cerrarSesion();
    } else {
        document.getElementById('pantalla-acceso').style.display = 'flex';
    }
}

// Función para cerrar el modal sin registrarse
function cerrarAuth() {
    document.getElementById('pantalla-acceso').style.display = 'none';
}

// Modificamos la función entrarApp que te di antes
function entrarApp(user) {
    usuarioActivo = user;
    cerrarAuth(); // Cerramos la ventana de login
    
    // Cambiamos el color del icono o mostramos el nombre para indicar que hay sesión
    document.querySelector('.icon-user').style.color = '#7a4a91'; 
    alert("Bienvenido, " + user);
    
    // Ahora el usuario puede usar el formulario de dolor y se guardará en su cuenta
    actualizarGrafica();
}