package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	GroqAPIKey string
	GroqModel  string

	DatabaseURL string
	Port string
	ExportServiceURL string
}

func Load() *Config {
	_ = godotenv.Load()

	cfg := &Config{
		GroqAPIKey: os.Getenv("GROQ_API_KEY"),
		GroqModel:  os.Getenv("GROQ_MODEL"),
		DatabaseURL: os.Getenv("DATABASE_URL"),
		Port:        os.Getenv("PORT"),
		ExportServiceURL: os.Getenv("EXPORT_SERVICE_URL"),
	}

	if cfg.GroqAPIKey == "" {
		log.Fatal("GROQ_API_KEY not found")
	}

	if cfg.GroqModel == "" {
		cfg.GroqModel = "llama-3.3-70b-versatile"
	}


	if cfg.DatabaseURL == "" {
	   log.Fatal("DATABASE_URL not found")
    }
	if cfg.ExportServiceURL == "" {
    cfg.ExportServiceURL = "http://localhost:3001/export"
}

	return cfg
}