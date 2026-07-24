package question

import "github.com/bhavyaa1801/submitify-v2/internal/models"

type normalizer struct{}

func newNormalizer() *normalizer {
	return &normalizer{}
}

func (n *normalizer) Normalize(questions []models.Question) []models.Question {

	for i := range questions {
		questions[i].Number = i + 1
	}

	return questions
}