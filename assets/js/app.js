import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyAAQoXIvjZhkYg-bzHNx8gjUVCF5lVtSk4",
    authDomain: "bioknee-e363d.firebaseapp.com",
    projectId: "bioknee-e363d",
    storageBucket: "bioknee-e363d.firebasestorage.app",
    messagingSenderId: "564547432281",
    appId: "1:564547432281:web:dbf8cbb4f0420847896648", 
    measurementId: "G-SWD8RQ5Z5V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Variables Globales
let chart;
let modoLogin = false;
let usuarioActivo = null;

// --- FUNCIONES DE GRÁFICA Y DATOS ---

function actualizarGrafica(fechas, dolores) {
    const canvas = document.getElementById('graficaDolor');
    if (!canvas) return; // Evita error si no encuentra el elemento
    const ctx = canvas.getContext('2d');

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Nivel de dolor',
                data: dolores,
                borderWidth: 3,
                fill: false,
                tension: 0.3
            }]
        }
    });
}

// Nota: He comentado cargarDatos y cargarTablaMedico porque usan 'db', 'collection' y 'getDocs' 
// que NO están importados arriba. Si usas Firebase Firestore, debes importarlos.
async function cargarDatos() {
    console.log("Cargando datos...");
    // Aquí iría la lógica de Firebase Firestore si la necesitas.
}

// --- FUNCIONES DE AUTENTICACIÓN (Lógica Limpia) ---

window.abrirAuth = function() {
    console.log("Icono clickeado");
    const modal = document.getElementById('pantalla-acceso');
    if (usuarioActivo) {
        let confirmar = confirm(`Usuario activo: ${usuarioActivo}. ¿Deseas cerrar sesión?`);
        if (confirmar) cerrarSesion();
    } else {
        if (modal) modal.style.display = 'flex';
    }
};

window.cerrarAuth = function() {
    const modal = document.getElementById('pantalla-acceso');
    if (modal) modal.style.display = 'none';
};

window.toggleAuth = function() {
    modoLogin = !modoLogin;
    const titulo = document.getElementById('auth-titulo');
    const boton = document.getElementById('btn-auth');
    const texto = document.getElementById('toggle-text');

    if (modoLogin) {
        titulo.innerText = "Iniciar Sesión";
        boton.innerText = "Entrar";
        texto.innerText = "¿No tienes cuenta? Regístrate";
    } else {
        titulo.innerText = "Crear Cuenta";
        boton.innerText = "Registrarse";
        texto.innerText = "¿Ya tienes cuenta? Inicia Sesión";
    }
};

window.ejecutarAuth = function() {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios_bioknee')) || {};

    if (!user || !pass) {
        alert("Por favor completa los campos");
        return;
    }

    if (modoLogin) {
        if (usuarios[user] && usuarios[user].pass === pass) {
            alert("¡Bienvenido de nuevo!");
            usuarioActivo = user;
            entrarApp(user);
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    } else {
        if (usuarios[user]) {
            alert("El usuario ya existe");
        } else {
            usuarios[user] = { pass: pass, registros: [] };
            localStorage.setItem('usuarios_bioknee', JSON.stringify(usuarios));
            alert("Registro exitoso. Ahora inicia sesión.");
            window.toggleAuth();
        }
    }
};

function entrarApp(user) {
    usuarioActivo = user;
    window.cerrarAuth();
    const icon = document.querySelector('.icon-user');
    if (icon) icon.style.color = '#7a4a91'; 
    alert("Sesión iniciada como: " + user);
}

function cerrarSesion() {
    usuarioActivo = null;
    const icon = document.querySelector('.icon-user');
    if (icon) icon.style.color = 'white'; 
    alert("Sesión cerrada");
}

// --- MENÚ LATERAL ---

window.toggleMenuLateral = function() {
    const menu = document.getElementById("menu-lateral");
    if (!menu) return;
    if (menu.style.width === "250px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "250px";
    }
};

window.navegarMenu = function(idSeccion) {
    const menu = document.getElementById("menu-lateral");
    if (menu) menu.style.width = "0";
    // Llama a la función global del HTML
    if (typeof window.mostrarSeccion === 'function') {
        window.mostrarSeccion(idSeccion);
    }
};

// Inicialización
cargarDatos();