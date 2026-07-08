package service

import (
	"github.com/bhavyaa1801/submitify-v2/internal/api"
	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/expoter/pdf"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/generator"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
	"github.com/bhavyaa1801/submitify-v2/internal/renderer"
)

type GenerateService struct {
	generator *generator.Generator
	builder   *builder.Builder
	renderer  *renderer.Renderer
	exporter  *pdf.Exporter
}

func NewGenerateService(
	generator *generator.Generator,
	builder *builder.Builder,
	renderer *renderer.Renderer,
	exporter *pdf.Exporter,
) *GenerateService {

	return &GenerateService{
		generator: generator,
		builder:   builder,
		renderer:  renderer,
		exporter:  exporter,
	}
}

func (s *GenerateService) Generate(req api.GenerateRequest) ([]byte, error) {

	profile := models.GetProfileDefinition(req.Profile)

	var contents []builder.QuestionContent

	for i, question := range req.Questions {

		content, err := s.generator.Generate(
			i+1,
			question,
			profile,
		)

		if err != nil {
			return nil, err
		}

		contents = append(contents, content)
	}

	document := s.builder.Build(
		req.Metadata,
		req.Profile,
		contents,
	)

	html, err := s.renderer.RenderDocument(document)
	if err != nil {
		return nil, err
	}

	return s.exporter.Export(html)
}