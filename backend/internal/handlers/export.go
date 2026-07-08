package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

func (h *Handler) ExportPDF(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	defer r.Body.Close()

	var document models.Document

	if err := json.NewDecoder(r.Body).Decode(&document); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	pdf, err := h.exportService.ExportPDF(document)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", `attachment; filename="submitify.pdf"`)

	_, err = w.Write(pdf)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}