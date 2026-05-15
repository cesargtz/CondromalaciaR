-- Activar llaves foráneas
PRAGMA foreign_keys = ON;

-- Tabla principal de pacientes
CREATE TABLE pacientes (
    id_paciente INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edad INTEGER NOT NULL,
    sexo TEXT,
    email TEXT UNIQUE
);

-- Formulario de salud inicial
CREATE TABLE formularios_salud (
    id_formulario INTEGER PRIMARY KEY AUTOINCREMENT,
    id_paciente INTEGER NOT NULL,
    diagnostico_confirmado BOOLEAN NOT NULL,
    sintomas TEXT NOT NULL,
    tiempo_lesion TEXT,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
);

-- Registro diario de dolor
CREATE TABLE registros_dolor (
    id_registro INTEGER PRIMARY KEY AUTOINCREMENT,
    id_paciente INTEGER NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    nivel_dolor INTEGER CHECK(nivel_dolor >= 0 AND nivel_dolor <= 10),
    observaciones TEXT,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
);

-- Ejercicios / videos
CREATE TABLE ejercicios (
    id_ejercicio INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    video_url TEXT
);

-- Registro de ejercicios realizados
CREATE TABLE ejercicios_realizados (
    id_realizado INTEGER PRIMARY KEY AUTOINCREMENT,
    id_paciente INTEGER NOT NULL,
    id_ejercicio INTEGER NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
    FOREIGN KEY (id_ejercicio) REFERENCES ejercicios(id_ejercicio)
);