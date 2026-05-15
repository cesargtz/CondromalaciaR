package main

import (
	"html/template"
	"net/http"
	"path/filepath"
)

// HandlerHola procesa la petición y saluda al usuario
func HandlerHola(w http.ResponseWriter, r *http.Request) {
	// Obtener query param nombre=juan
	nombre := r.URL.Query().Get("nombre")
	if nombre == "" {
		nombre = "Invitado"
	}

	// Datos para el template
	data := map[string]any{
		"Nombre": nombre,
	}

	// Construir ruta al template (relativa a la raíz del proyecto)
	tmplPath := filepath.Join("htmltmpl", "index.html")
	
	tmpl, err := template.ParseFiles(tmplPath)
	if err != nil {
		http.Error(w, "Error al cargar plantilla: "+err.Error(), http.StatusInternalServerError)
		return
	}

	tmpl.Execute(w, data)
}
