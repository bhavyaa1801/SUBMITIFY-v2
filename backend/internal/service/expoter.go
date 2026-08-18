package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

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

	client := &http.Client{
		Timeout: 60 * time.Second,
	}

	const maxAttempts = 3

	var lastErr error

	for attempt := 1; attempt <= maxAttempts; attempt++ {

		fmt.Printf(
			"PDF export attempt %d/%d\n",
			attempt,
			maxAttempts,
		)

		req, err := http.NewRequest(
			http.MethodPost,
			s.exportURL,
			bytes.NewReader(payload),
		)

		if err != nil {
			return nil, err
		}

		req.Header.Set("Content-Type", "application/json")

		resp, err := client.Do(req)

		if err != nil {
			lastErr = err

			fmt.Printf(
				"PDF export attempt %d failed: %v\n",
				attempt,
				err,
			)

		} else {

			body, readErr := io.ReadAll(resp.Body)
			resp.Body.Close()

			if readErr != nil {
				lastErr = readErr
			} else if resp.StatusCode == http.StatusOK {
				fmt.Printf(
					"PDF export successful on attempt %d\n",
					attempt,
				)

				return body, nil
			} else {
				lastErr = fmt.Errorf(
					"export service returned HTTP %d: %s",
					resp.StatusCode,
					string(body),
				)

				fmt.Printf(
					"PDF export attempt %d returned HTTP %d\n",
					attempt,
					resp.StatusCode,
				)

				// Don't retry normal client errors.
				if resp.StatusCode >= 400 && resp.StatusCode < 500 {
					return nil, lastErr
				}
			}
		}

		if attempt < maxAttempts {
			wait := time.Duration(attempt*2) * time.Second

			fmt.Printf(
				"Retrying PDF export in %v...\n",
				wait,
			)

			time.Sleep(wait)
		}
	}

	return nil, fmt.Errorf(
		"PDF export failed after %d attempts: %w",
		maxAttempts,
		lastErr,
	)
}