package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/bhavyaa1801/submitify-v2/internal/sample"
)

func DemoDocument(w http.ResponseWriter, r *http.Request) {

	doc := sample.NewProgrammingDocument()

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(doc)
}