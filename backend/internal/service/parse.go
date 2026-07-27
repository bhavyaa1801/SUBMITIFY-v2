package service

import (
	"context"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
	"github.com/bhavyaa1801/submitify-v2/internal/parser/question"
)

type ParseService struct {
	parser *question.Parser
}

func NewParseService(
	parser *question.Parser,
) *ParseService {

	return &ParseService{
		parser: parser,
	}
}

func (s *ParseService) Parse(
	ctx context.Context,
	rawQuestions string,
) ([]models.Question, error) {

	return s.parser.Parse(
		ctx,
		rawQuestions,
	)

}