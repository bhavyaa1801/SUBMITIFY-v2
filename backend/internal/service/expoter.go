package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type ExportService struct {
	exportURL string
}

func NewExportService(exportURL string) *ExportService {
	return &ExportService{
		exportURL: exportURL,
	}
}

func (s *ExportService) ExportPDF(document models.Document) ([]byte, error) {

	payload, err := json.Marshal(document)
	if err != nil {
		return nil, err
	}

	resp, err := http.Post(
		s.exportURL,
		"application/json",
		bytes.NewBuffer(payload),
	)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {

		body, _ := io.ReadAll(resp.Body)

		return nil, fmt.Errorf("%s", body)
	}

	return io.ReadAll(resp.Body)
}
