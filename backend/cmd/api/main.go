package main

import (
	"fmt"
	"net/http"

	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/config"
	"github.com/bhavyaa1801/submitify-v2/internal/expoter/pdf"
	"github.com/bhavyaa1801/submitify-v2/internal/handlers"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/generator"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/groq"
	"github.com/bhavyaa1801/submitify-v2/internal/renderer"
	"github.com/bhavyaa1801/submitify-v2/internal/service"
)

func main() {

	cfg := config.Load()

	llm := groq.New(
		cfg.GroqAPIKey,
		cfg.GroqModel,
	)

	gen := generator.New(llm)

	docBuilder := builder.New()

	r := renderer.New()

	exporter := pdf.New("wkhtmltopdf")

	generateService := service.NewGenerateService(
		gen,
		docBuilder,
	)

	exportService := service.NewExportService(
		r,
		exporter,
	)

	handler := handlers.New(
		generateService,
		exportService,
	)

	http.HandleFunc("/generate", handler.Generate)
	http.HandleFunc("/export/pdf", handler.ExportPDF)

	// Demo routes
	http.HandleFunc("/demo", handlers.DemoDocument)
	http.HandleFunc("/demo/html", handlers.DemoHTML)
	http.HandleFunc("/demo/pdf", handlers.DemoPDF)

	fmt.Println(" Submitify V2 running on :8080")

	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}