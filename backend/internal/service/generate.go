package service

import (
	"fmt"
	"github.com/bhavyaa1801/submitify-v2/internal/api"
	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/generator"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type GenerateService struct {
	generator *generator.Generator
	builder   *builder.Builder
}

func NewGenerateService(
	generator *generator.Generator,
	builder *builder.Builder,
) *GenerateService {

	return &GenerateService{
		generator: generator,
		builder:   builder,
	}
}

func (s *GenerateService) Generate(
	req api.GenerateRequest,
) (models.Document, error) {
    fmt.Println("REQUEST PROFILE:", req.Profile)
	profile := models.GetProfileDefinition(req.Profile)

	fmt.Println("PROFILE:", profile.Name)

	for _, s := range profile.Sections {
		fmt.Println(s.Title)
	}

	contents := make([]builder.QuestionContent, 0, len(req.Questions))

	for _, q := range req.Questions {

		content, err := s.generator.Generate(
			q.Number,
			q.Text,
			profile,
		)
		if err != nil {
			return models.Document{}, err
		}

		contents = append(contents, content)
	}

	document := s.builder.Build(
		req.Metadata,
		req.Profile,
		contents,
	)

	return document, nil
}
