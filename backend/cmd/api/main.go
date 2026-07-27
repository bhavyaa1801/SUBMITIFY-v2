package main

import (
	"fmt"
	"net/http"
	"log"

	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/config"
	"github.com/bhavyaa1801/submitify-v2/internal/database"
	"github.com/bhavyaa1801/submitify-v2/internal/handlers"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/generator"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/groq"
	"github.com/bhavyaa1801/submitify-v2/internal/middleware"
	"github.com/bhavyaa1801/submitify-v2/internal/parser/question"
	"github.com/bhavyaa1801/submitify-v2/internal/service"
	"github.com/bhavyaa1801/submitify-v2/internal/cache"
    "github.com/bhavyaa1801/submitify-v2/internal/repository"
)

func main() {

	cfg := config.Load()

	llm := groq.New(
		cfg.GroqAPIKey,
		cfg.GroqModel,
	)
	db, err := database.New(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("database connection failed: %v", err)
	}
	defer db.Close()

	cacheRepository := repository.NewPostgresCacheRepository(db)

    cacheService := cache.NewCacheService(
	cacheRepository,
    )

	gen := generator.New(llm)

	docBuilder := builder.New()

	parser := question.New(gen)

	parseService := service.NewParseService(
		parser,
	)

	generateService := service.NewGenerateService(
		gen,
		docBuilder,
		cacheService,
	)

	exportService := service.NewExportService()

	handler := handlers.New(
		parseService,
		generateService,
		exportService,
	)

	// ---------------- Router ----------------

	mux := http.NewServeMux()

	mux.HandleFunc("/parse", handler.Parse)
	mux.HandleFunc("/generate", handler.Generate)
	mux.HandleFunc("/export/pdf", handler.ExportPDF)

	// Image Upload
	mux.HandleFunc("/upload", handler.UploadImage)

	// Serve uploaded images
	mux.Handle(
		"/uploads/",
		http.StripPrefix(
			"/uploads/",
			http.FileServer(
				http.Dir("assets/uploads"),
			),
		),
	)

	// Demo Routes
	mux.HandleFunc("/demo", handlers.DemoDocument)
	// mux.HandleFunc("/demo/html", handlers.DemoHTML)
	// mux.HandleFunc("/demo/pdf", handlers.DemoPDF)

	fmt.Println("Submitify V2 running on :8080")

	if err := http.ListenAndServe(
		":8080",
		middleware.CORS(mux),
	); err != nil {
		panic(err)
	}
}
