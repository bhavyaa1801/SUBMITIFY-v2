package api

import "github.com/bhavyaa1801/submitify-v2/internal/models"

type GenerateResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}

type ParseResponse struct {
	Questions []models.Question `json:"questions"`
}