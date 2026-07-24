package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/bhavyaa1801/submitify-v2/internal/api"
	"github.com/bhavyaa1801/submitify-v2/internal/service"
)

type Handler struct {
	parseService    *service.ParseService
	generateService *service.GenerateService
	exportService   *service.ExportService
}

func New(
	parseService *service.ParseService,
	generateService *service.GenerateService,
	exportService *service.ExportService,
) *Handler {

	return &Handler{
		parseService: parseService,
		generateService: generateService,
		exportService: exportService,
	}
}

func (h *Handler) Generate(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	defer r.Body.Close()

	var req api.GenerateRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Printf("Metadata: %+v\n", req.Metadata)

	document, err := h.generateService.Generate(req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(document); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}