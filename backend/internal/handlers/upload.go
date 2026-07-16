package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
)

type UploadResponse struct {
	URL string `json:"url"`
}

func (h *Handler) UploadImage(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20) // 10 MB
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	file, header, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "image is required", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Validate image
	contentType := header.Header.Get("Content-Type")

	if !strings.HasPrefix(contentType, "image/") {
		http.Error(w, "invalid image", http.StatusBadRequest)
		return
	}

	// Ensure uploads folder exists
	err = os.MkdirAll("assets/uploads", os.ModePerm)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate filename
	ext := filepath.Ext(header.Filename)

	filename := uuid.New().String() + ext

	dstPath := filepath.Join(
		"assets",
		"uploads",
		filename,
	)

	dst, err := os.Create(dstPath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := UploadResponse{
		URL: "/uploads/" + filename,
	}

	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(response)
}