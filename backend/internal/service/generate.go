package service

import (
	"context"
	"fmt"
	"time"
	"sort"
	"sync"

	"github.com/bhavyaa1801/submitify-v2/internal/api"
	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/config"
	"github.com/bhavyaa1801/submitify-v2/internal/llm/generator"
	"github.com/bhavyaa1801/submitify-v2/internal/metrics"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type GenerateService struct {
	generator *generator.Generator
	builder   *builder.Builder
}

func NewGenerateService(
	generator *generator.Generator,
	builder *builder.Builder,
) *GenerateService {

	return &GenerateService{
		generator: generator,
		builder:   builder,
	}
}

func (s *GenerateService) Generate(
	ctx context.Context,
	req api.GenerateRequest,
) (models.Document, error) {

	profile := models.GetProfileDefinition(req.Profile)

	jobs := make(chan generationJob)
	results := make(chan generationResult)

	var wg sync.WaitGroup

	// Start workers
	for i := 0; i < config.WorkerCount; i++ {
		wg.Add(1)

		go func() {
			defer wg.Done()

			s.worker(
				ctx,
				profile,
				jobs,
				results,
			)
		}()
	}

	// Send jobs
	go func() {
		defer close(jobs)

		for _, q := range req.Questions {

			select {

			case <-ctx.Done():
				return

			case jobs <- generationJob{
				Question: q,
			}:
			}
		}
	}()

	// Close results after all workers finish
	go func() {
		wg.Wait()
		close(results)
	}()

	var contents []builder.QuestionContent

	for result := range results {

		if result.Err != nil {
			return models.Document{}, result.Err
		}

		contents = append(contents, result.Content)
	}

	// Preserve original order
	sort.Slice(contents, func(i, j int) bool {
		return contents[i].Number < contents[j].Number
	})

	document := s.builder.Build(
		req.Metadata,
		req.Profile,
		contents,
	)

	return document, nil
}

func (s *GenerateService) generateQuestion(
	ctx context.Context,
	q models.Question,
	profile models.ProfileDefinition,
) (builder.QuestionContent, error) {

	var lastErr error

	for attempt := 1; attempt <= config.MaxGenerationRetries+1; attempt++ {

		// Stop immediately if the request has been cancelled.
		select {
		case <-ctx.Done():
			return builder.QuestionContent{}, ctx.Err()
		default:
		}

		start := time.Now()

		content, err := s.generator.Generate(
			ctx,
			q.Number,
			q.Text,
			profile,
		)

		metrics.LogGeneration(
			q.Number,
			attempt,
			time.Since(start),
			err,
		)

		if err == nil {
			return content, nil
		}

		lastErr = err
	}

	return builder.QuestionContent{}, fmt.Errorf(
		"question #%d failed after %d attempts: %w",
		q.Number,
		config.MaxGenerationRetries+1,
		lastErr,
	)
}