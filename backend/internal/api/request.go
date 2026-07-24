package api

import "github.com/bhavyaa1801/submitify-v2/internal/models"

type ParseRequest struct {
	RawQuestions string `json:"rawQuestions"`
}

type GenerateRequest struct {
	Metadata  models.Metadata   `json:"metadata"`
	Profile   models.Profile    `json:"profile"`
	Questions []models.Question `json:"questions"`
}