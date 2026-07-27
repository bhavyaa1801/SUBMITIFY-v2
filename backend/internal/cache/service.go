package cache

import (
	"context"
	"encoding/json"

	"time"

	"github.com/google/uuid"

	"github.com/bhavyaa1801/submitify-v2/internal/builder"
	"github.com/bhavyaa1801/submitify-v2/internal/metrics"
	"github.com/bhavyaa1801/submitify-v2/internal/models"
	"github.com/bhavyaa1801/submitify-v2/internal/repository"
)

type CacheService struct {
	repo repository.CacheRepository
}

func NewCacheService(
	repo repository.CacheRepository,
) *CacheService {

	return &CacheService{
		repo: repo,
	}
}

func (s *CacheService) Find(
	ctx context.Context,
	subject string,
	q models.Question,
	profile models.ProfileDefinition,
) (*builder.QuestionContent, error) {

	cacheKey := BuildKey(
		subject,
		q.Text,
		string(profile.Name),
	)
	lookupStart := time.Now()

	entry, err := s.repo.FindByKey(
		ctx,
		cacheKey,
	)
	if err != nil {
		return nil, err
	}

	if entry == nil {

		metrics.LogCacheMiss(
			q.Text,
			subject,
			string(profile.Name),
			time.Since(lookupStart),
		)

		return nil, nil
	}

	metrics.LogCacheHit(
		q.Text,
		subject,
		string(profile.Name),
		time.Since(lookupStart),
	)

	if err := s.repo.IncrementHit(
		ctx,
		cacheKey,
	); err != nil {
		return nil, err
	}

	var sections map[string]string

	if err := json.Unmarshal(
		entry.ResponseJSON,
		&sections,
	); err != nil {
		return nil, err
	}

	content := builder.QuestionContent{
		Number:   q.Number,
		Question: q.Text,
		Sections: sections,
	}

	return &content, nil
}

func (s *CacheService) Save(
	ctx context.Context,
	subject string,
	question string,
	profile models.ProfileDefinition,
	content builder.QuestionContent,
) error {

	cacheKey := BuildKey(
		subject,
		question,
		string(profile.Name),
	)

	data, err := json.Marshal(content.Sections)
	if err != nil {
		return err
	}

	entry := &models.CacheEntry{
		ID:                 uuid.New().String(),
		CacheKey:           cacheKey,
		Subject:            subject,
		NormalizedQuestion: NormalizeQuestion(question),

		Profile:       string(profile.Name),
		PromptVersion: PromptVersion,

		ResponseJSON: data,

		HitCount: 0,
	}

	saveStart := time.Now()

	err = s.repo.Save(
		ctx,
		entry,
	)

	if err == nil {
		metrics.LogCacheSave(
			question,
			subject,
			string(profile.Name),
			time.Since(saveStart),
		)
	}

	return err

}
