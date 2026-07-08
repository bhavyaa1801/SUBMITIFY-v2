package handlers

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/bhavyaa1801/submitify-v2/internal/api"
	"github.com/bhavyaa1801/submitify-v2/internal/service"
)

type Handler struct {
	generateService *service.GenerateService
}

func New(generateService *service.GenerateService) *Handler {
	
	return &Handler{
		generateService: generateService,
	}
}

func (h *Handler) Generate(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req api.GenerateRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	pdf, err := h.generateService.Generate(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("Content-Disposition", `attachment; filename="submitify.pdf"`)
    os.WriteFile("generated.pdf", pdf, 0644)

    w.Write([]byte("PDF Generated Successfully"))
	w.Write(pdf)
}