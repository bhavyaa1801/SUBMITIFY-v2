package validator

import (
	"fmt"
	"strings"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

func ValidateSections(
	sections map[string]string,
	profile models.ProfileDefinition,
) error {

	for _, sec := range profile.Sections {

		content, ok := sections[sec.Title]

		if !ok {
			return fmt.Errorf("missing required section: %s", sec.Title)
		}

		if strings.TrimSpace(content) == "" {
			return fmt.Errorf("empty section: %s", sec.Title)
		}
	}

	return nil
}