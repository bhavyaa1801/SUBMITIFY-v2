package prompt

import (
	"bytes"
	"text/template"
)

type QuestionParserPrompt struct {
	RawQuestions string
}

const questionParserTemplate = `
You are an expert academic question parser.

Extract every question from the given text.

Rules:
- Preserve the original order.
- Preserve multiline questions exactly as written.
- Ignore page numbers.
- Ignore headers and footers.
- Ignore blank lines.
- Do not rewrite or summarize.
- Do not merge questions.
- Do not split a single question.
- Return ONLY valid JSON.
- Do not wrap the response in markdown.

Return ONLY this format:

[
  {
    "text": "First question"
  },
  {
    "text": "Second question"
  }
]

Input:

{{.RawQuestions}}
`

func BuildQuestionParserPrompt(data QuestionParserPrompt) (string, error) {
	tmpl, err := template.New("question-parser").Parse(questionParserTemplate)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer

	if err := tmpl.Execute(&buf, data); err != nil {
		return "", err
	}

	return buf.String(), nil
}