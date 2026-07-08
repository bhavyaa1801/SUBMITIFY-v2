package api

import "github.com/bhavyaa1801/submitify-v2/internal/models"

type GenerateRequest struct {
    Metadata     models.Metadata `json:"metadata"`
    Profile      models.Profile  `json:"profile"`
    RawQuestions string          `json:"rawQuestions"`
}