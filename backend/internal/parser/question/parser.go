package question

import (
	"fmt"

	"github.com/bhavyaa1801/submitify-v2/internal/llm/generator"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type Parser struct {
	regex     *RegexParser
	normalizer *normalizer
	validator *validator
	generator *generator.Generator
}

func New(generator *generator.Generator) *Parser {
	return &Parser{
		regex:     NewRegexParser(),
		normalizer: newNormalizer(),
		validator: newValidator(),
		generator: generator,
	}
}

func (p *Parser) Parse(rawQuestions string) ([]models.Question, error) {

	// First attempt: Regex parser
	questions, err := p.regex.Parse(rawQuestions)
	if err != nil {
		return nil, err
	}

	// norm and Validate regex output
	questions = p.normalizer.Normalize(questions)
	result := p.validator.Validate(questions)

	if result.Valid {
		return questions, nil
	}

	// Fallback to AI parser
	if p.generator == nil {
		return nil, fmt.Errorf(
			"regex parser validation failed: %v and AI parser unavailable",
			result.Reasons,
		)
	}

	return p.generator.ParseQuestions(rawQuestions)
}