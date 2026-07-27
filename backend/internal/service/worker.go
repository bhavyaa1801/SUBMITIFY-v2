package service

import (
	"context"

	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type generationJob struct {
	Subject string
	Question models.Question
}

type generationResult struct {
	Number  int
	Content builder.QuestionContent
	Err     error
}

func (s *GenerateService) worker(
	ctx context.Context,
	profile models.ProfileDefinition,
	jobs <-chan generationJob,
	results chan<- generationResult,
) {

	for job := range jobs {

		content, err := s.generateQuestion(
			ctx,
			job.Subject,
			job.Question,
			profile,
		)

		results <- generationResult{
			Number:  job.Question.Number,
			Content: content,
			Err:     err,
		}
	}
}