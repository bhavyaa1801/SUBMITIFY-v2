package handlers

import (
	"net/http"

	pdf "github.com/bhavyaa1801/submitify-v2/internal/expoter/pdf"
	"github.com/bhavyaa1801/submitify-v2/internal/renderer"
	"github.com/bhavyaa1801/submitify-v2/internal/sample"
)

func DemoPDF(w http.ResponseWriter, r *http.Request) {

	// Sample Document
	doc := sample.NewProgrammingDocument()

	// Render HTML
	render := renderer.New()

	html, err := render.RenderDocument(doc)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// PDF Exporter
	exporter := pdf.New(
		`C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe`,
	)

	pdfBytes, err := exporter.Export(html)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", `attachment; filename="demo.pdf"`)

	w.WriteHeader(http.StatusOK)
	w.Write(pdfBytes)
}