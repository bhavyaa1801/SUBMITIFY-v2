package main

import (
	"fmt"
	"net/http"

	"github.com/bhavyaa1801/submitify-v2/internal/handlers"
)

func main() {

	http.HandleFunc("/demo", handlers.DemoDocument)
	http.HandleFunc("/demo/pdf", handlers.DemoPDF)
	http.HandleFunc("/demo/html", handlers.DemoHTML)

	fmt.Println("Server running on :8080")

	err := http.ListenAndServe(":8080", nil)

	if err != nil {
		panic(err)
	}
}