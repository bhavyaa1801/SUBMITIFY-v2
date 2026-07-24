package service

import (
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

func (s *ParseService) Parse(rawQuestions string) ([]models.Question, error) {

	return s.parser.Parse(rawQuestions)

}