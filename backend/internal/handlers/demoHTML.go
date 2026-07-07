package handlers

import (
	"net/http"

	"github.com/bhavyaa1801/submitify-v2/internal/renderer"
	"github.com/bhavyaa1801/submitify-v2/internal/sample"
)

func DemoHTML(w http.ResponseWriter, r *http.Request) {

	doc := sample.NewProgrammingDocument()

	rend := renderer.New()

	html, err := rend.RenderDocument(doc)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")

	w.Write([]byte(html))
}