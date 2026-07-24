package generator

import (
	"encoding/json"
	"fmt"

	prompt "github.com/bhavyaa1801/submitify-v2/internal/llm/promt"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type aiQuestion struct {
	Text string `json:"text"`
}

func (g *Generator) ParseQuestions(
	rawQuestions string,
) ([]models.Question, error) {

	p, err := prompt.BuildQuestionParserPrompt(
		prompt.QuestionParserPrompt{
			RawQuestions: rawQuestions,
		},
	)
	if err != nil {
		return nil, err
	}

	response, err := g.llm.Generate(p)
	if err != nil {
		return nil, err
	}

	var parsed []aiQuestion

	if err := json.Unmarshal([]byte(response), &parsed); err != nil {
		return nil, fmt.Errorf(
			"invalid JSON returned by AI: %w",
			err,
		)
	}

	questions := make([]models.Question, 0, len(parsed))

	for i, q := range parsed {
		questions = append(questions, models.Question{
			Number: i + 1,
			Text:   q.Text,
		})
	}

	return questions, nil
}