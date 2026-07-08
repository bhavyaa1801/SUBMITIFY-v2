package service

import (
	"github.com/bhavyaa1801/submitify-v2/internal/api"
	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/generator"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
	"github.com/bhavyaa1801/submitify-v2/internal/parser/question"
)

type GenerateService struct {
	parser    *question.Parser
	generator *generator.Generator
	builder   *builder.Builder
}

func NewGenerateService(
	parser *question.Parser,
	generator *generator.Generator,
	builder *builder.Builder,
) *GenerateService {

	return &GenerateService{
		parser:    parser,
		generator: generator,
		builder:   builder,
	}
}

func (s *GenerateService) Generate(req api.GenerateRequest) (models.Document, error) {

	profile := models.GetProfileDefinition(req.Profile)

	questions, err := s.parser.Parse(req.RawQuestions)
	if err != nil {
		return models.Document{}, err
	}

	contents := make([]builder.QuestionContent, 0, len(questions))

	for _, q := range questions {

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