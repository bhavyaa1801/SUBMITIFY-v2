package service

import (
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

func (s *GenerateService) Generate(req api.GenerateRequest) (models.Document, error) {

	profile := models.GetProfileDefinition(req.Profile)

	var contents []builder.QuestionContent

	for i, question := range req.Questions {

		content, err := s.generator.Generate(
			i+1,
			question,
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