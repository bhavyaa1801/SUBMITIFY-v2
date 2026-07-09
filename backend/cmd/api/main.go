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
	"github.com/bhavyaa1801/submitify-v2/internal/middleware"
	"github.com/bhavyaa1801/submitify-v2/internal/parser/question"
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

	parser := question.New(gen)

	parseService := service.NewParseService(
		parser,
	)

	generateService := service.NewGenerateService(
		gen,
		docBuilder,
	)

	exportService := service.NewExportService(
		r,
		exporter,
	)

	handler := handlers.New(
		parseService,
		generateService,
		exportService,
	)

	// Create router
	mux := http.NewServeMux()

	mux.HandleFunc("/parse", handler.Parse)
	mux.HandleFunc("/generate", handler.Generate)
	mux.HandleFunc("/export/pdf", handler.ExportPDF)

	mux.HandleFunc("/demo", handlers.DemoDocument)
	mux.HandleFunc("/demo/html", handlers.DemoHTML)
	mux.HandleFunc("/demo/pdf", handlers.DemoPDF)

	fmt.Println("Submitify V2 running on :8080")

	if err := http.ListenAndServe(
		":8080",
		middleware.CORS(mux),
	); err != nil {
		panic(err)
	}
}