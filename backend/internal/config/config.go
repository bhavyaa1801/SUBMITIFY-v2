package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	GroqAPIKey string
	GroqModel  string
}

func Load() *Config {
	_ = godotenv.Load()

	cfg := &Config{
		GroqAPIKey: os.Getenv("GROQ_API_KEY"),
		GroqModel:  os.Getenv("GROQ_MODEL"),
	}

	if cfg.GroqAPIKey == "" {
		log.Fatal("GROQ_API_KEY not found")
	}

	if cfg.GroqModel == "" {
		cfg.GroqModel = "llama-3.3-70b-versatile"
	}

	return cfg
}