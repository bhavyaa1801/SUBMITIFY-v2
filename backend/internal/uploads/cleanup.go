package uploads

import (
	"log"
	"os"
	"path/filepath"
	"strings"
)

func Delete(path string) {

	if path == "" {
		return
	}

	// "/uploads/abc.png" -> "abc.png"
	filename := filepath.Base(strings.TrimPrefix(path, "/"))

	fullPath := filepath.Join(
		"tmp",
		"uploads",
		filename,
	)

	if err := os.Remove(fullPath); err != nil {
		log.Printf("failed to delete uploaded image %s: %v", fullPath, err)
	}
}