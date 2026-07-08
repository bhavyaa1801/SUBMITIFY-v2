package question

import (
	"strconv"
	"strings"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

const (
	minQuestionLength = 10
	maxQuestions      = 100
)

type ValidationResult struct {
	Valid   bool     `json:"valid"`
	Reasons []string `json:"reasons,omitempty"`
}

type validator struct{}

func newValidator() *validator {
	return &validator{}
}

func itoa(i int) string {
	return strconv.Itoa(i)
}

func (v *validator) Validate(questions []models.Question) ValidationResult {

	result := ValidationResult{
		Valid: true,
	}

	// No questions found
	if len(questions) == 0 {
		result.Valid = false
		result.Reasons = append(result.Reasons, "no questions found")
		return result
	}

	// Suspiciously large number of questions , very small len of ques 
	if len(questions) > maxQuestions {
		result.Valid = false
		result.Reasons = append(result.Reasons, "too many questions extracted")
	}

	totalContent := 0

	for _, q := range questions {

		text := strings.TrimSpace(q.Text)

		if text == "" {
			result.Valid = false
			result.Reasons = append(
				result.Reasons,
				"question "+itoa(q.Number)+" is empty",
			)
		}

		if len([]rune(text)) < minQuestionLength {
			result.Valid = false
			result.Reasons = append(
				result.Reasons,
				"question "+itoa(q.Number)+" is too short",
			)
		}

		totalContent += len(text)
	}

	if totalContent < len(questions)*minQuestionLength {
		result.Valid = false
		result.Reasons = append(
			result.Reasons,
			"total extracted content is suspiciously small",
		)
	}

	return result
}