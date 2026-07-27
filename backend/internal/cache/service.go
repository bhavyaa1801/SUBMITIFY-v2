package cache

import (
	"context"
	"encoding/json"

	"fmt"

	"github.com/google/uuid"

	"github.com/bhavyaa1801/submitify-v2/internal/builder"
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
	question string,
	profile models.ProfileDefinition,
) (*builder.QuestionContent, error) {

	cacheKey := BuildKey(
		subject,
		question,
		string(profile.Name),
	)
	fmt.Println("========== CACHE FIND ==========")
	fmt.Println("Key     :", cacheKey)
	fmt.Println("Subject :", subject)
	fmt.Println("Question:", question)
	fmt.Println("Profile :", string(profile.Name))
	fmt.Println("===============================")

	entry, err := s.repo.FindByKey(
		ctx,
		cacheKey,
	)
	if err != nil {
		return nil, err
	}

	if entry == nil {
		fmt.Println("[CACHE MISS]")
		return nil, nil
	}

	if err := s.repo.IncrementHit(
		ctx,
		cacheKey,
	); err != nil {
		return nil, err
	}

	var content builder.QuestionContent

	if err := json.Unmarshal(
		entry.ResponseJSON,
		&content,
	); err != nil {
		return nil, err
	}
	fmt.Println("[CACHE HIT]")

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

	fmt.Println("========== CACHE SAVE ==========")
	fmt.Println("Key     :", cacheKey)
	fmt.Println("Subject :", subject)
	fmt.Println("Question:", question)
	fmt.Println("Profile :", string(profile.Name))
	fmt.Println("===============================")

	data, err := json.Marshal(content)
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

	return s.repo.Save(
		ctx,
		entry,
	)
}
