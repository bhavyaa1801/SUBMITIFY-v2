package question

import (
	"regexp"
	"strconv"
	"strings"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type RegexParser struct{}

func NewRegexParser() *RegexParser {
	return &RegexParser{}
}

// Supported formats:
//
// 1.
// 1)
// 1:
// Q1.
// Q1)
// Question 1
//

var questionRegex = regexp.MustCompile(
	`(?im)^(?:\s*)(?:Q(?:uestion)?\s*)?(\d+)\s*(?:[.):]|\s+)?`,
)

func (p *RegexParser) Parse(raw string) ([]models.Question, error) {

	raw = normalize(raw)

	matches := questionRegex.FindAllStringSubmatchIndex(raw, -1)

	if len(matches) == 0 {
		return nil, nil
	}

	questions := make([]models.Question, 0, len(matches))

	for i, m := range matches {

		headerEnd := m[1]

		numberStart := m[2]
		numberEnd := m[3]

		textStart := headerEnd
		textEnd := len(raw)

		if i != len(matches)-1 {
			textEnd = matches[i+1][0]
		}

		number, _ := strconv.Atoi(raw[numberStart:numberEnd])

		text := strings.TrimSpace(raw[textStart:textEnd])

		if text == "" {
			continue
		}

		questions = append(questions, models.Question{
			Number: number,
			Text:   text,
		})
	}

	return questions, nil
}

func normalize(s string) string {

	s = strings.ReplaceAll(s, "\r\n", "\n")
	s = strings.ReplaceAll(s, "\r", "\n")
	s = strings.ReplaceAll(s, "\t", " ")

	lines := strings.Split(s, "\n")

	for i := range lines {
		lines[i] = strings.TrimRight(lines[i], " ")
	}

	return strings.Join(lines, "\n")
}