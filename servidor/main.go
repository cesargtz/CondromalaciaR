package main

import (
	"log"
	"net/http"
)

func main() {
	// 1. Servir archivos estáticos de la carpeta /assets/
	// Importante: Como ejecutaremos desde la raíz, la ruta es "assets"
	fs := http.FileServer(http.Dir("assets"))
	http.Handle("/assets/", http.StripPrefix("/assets/", fs))

	// 2. Registrar el handler definido en handler-hola.go
	http.HandleFunc("/", HandlerHola)

	// 3. Iniciar servidor
	log.Println("Servidor iniciado en http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Error al iniciar servidor: ", err)
	}
}
