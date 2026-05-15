erDiagram
    PACIENTE ||--o{ REGISTRO_DOLOR : "registra"
    PACIENTE ||--|| FORMULARIO_SALUD : "completa"
    PACIENTE ||--o{ EJERCICIO_REALIZADO : "realiza"
    EJERCICIO ||--o{ EJERCICIO_REALIZADO : "se registra en"

    PACIENTE {
        int id_paciente PK
        string nombre
        int edad
        string sexo
        string email
    }

    FORMULARIO_SALUD {
        int id_formulario PK
        int id_paciente FK
        boolean diagnostico_confirmado
        string sintomas
        string tiempo_lesion
    }

    REGISTRO_DOLOR {
        int id_registro PK
        int id_paciente FK
        date fecha
        int nivel_dolor
        string observaciones
    }

    EJERCICIO {
        int id_ejercicio PK
        string nombre
        string descripcion
        string video_url
    }

    EJERCICIO_REALIZADO {
        int id_realizado PK
        int id_paciente FK
        int id_ejercicio FK
        date fecha
    }