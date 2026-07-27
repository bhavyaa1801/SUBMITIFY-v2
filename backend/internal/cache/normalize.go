package cache

import (
	"regexp"
	"strings"
)

var multipleSpaces = regexp.MustCompile(`\s+`)

func NormalizeQuestion(question string) string {
	question = strings.ToLower(question)
	question = strings.TrimSpace(question)

	// Collapse multiple spaces into one
	question = multipleSpaces.ReplaceAllString(question, " ")

	// Remove trailing punctuation
	question = strings.TrimRight(question, ".!?")

	return question
}