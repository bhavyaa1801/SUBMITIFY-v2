package pdf

import (
	"fmt"
	"os"
	"os/exec"
)

type Exporter struct {
	binary string
}

func New(binary string) *Exporter {
	return &Exporter{
		binary: binary,
	}
}

func (e *Exporter) Export(html string) ([]byte, error) {

	htmlFile, err := os.CreateTemp("", "submitify-*.html")
	if err != nil {
		return nil, fmt.Errorf("failed to create temp html: %w", err)
	}
	defer os.Remove(htmlFile.Name())

	_, err = htmlFile.WriteString(html)
	if err != nil {
		htmlFile.Close()
		return nil, fmt.Errorf("failed to write html: %w", err)
	}

	htmlFile.Close()

	pdfFile, err := os.CreateTemp("", "submitify-*.pdf")
	if err != nil {
		return nil, fmt.Errorf("failed to create temp pdf: %w", err)
	}

	pdfPath := pdfFile.Name()

	pdfFile.Close()

	defer os.Remove(pdfPath)

	cmd := exec.Command(
		e.binary,
		"--enable-local-file-access",
		htmlFile.Name(),
		pdfPath,
	)

	output, err := cmd.CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf(
			"wkhtmltopdf failed: %v\n%s",
			err,
			string(output),
		)
	}

	pdfBytes, err := os.ReadFile(pdfPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read pdf: %w", err)
	}

	return pdfBytes, nil
}