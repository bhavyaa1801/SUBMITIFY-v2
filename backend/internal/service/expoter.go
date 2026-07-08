package service

import (
	"github.com/bhavyaa1801/submitify-v2/internal/expoter/pdf"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
	"github.com/bhavyaa1801/submitify-v2/internal/renderer"
)

type ExportService struct {
	renderer *renderer.Renderer
	exporter *pdf.Exporter
}

func NewExportService(
	renderer *renderer.Renderer,
	exporter *pdf.Exporter,
) *ExportService {

	return &ExportService{
		renderer: renderer,
		exporter: exporter,
	}
}

func (s *ExportService) ExportPDF(document models.Document) ([]byte, error) {

	html, err := s.renderer.RenderDocument(document)
	if err != nil {
		return nil, err
	}

	return s.exporter.Export(html)
}