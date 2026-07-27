package repository

import (
	"context"
	"errors"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CacheRepository interface {
	FindByKey(
		ctx context.Context,
		cacheKey string,
	) (*models.CacheEntry, error)

	Save(
		ctx context.Context,
		entry *models.CacheEntry,
	) error

	IncrementHit(
		ctx context.Context,
		cacheKey string,
	) error
}

type PostgresCacheRepository struct {
	db *pgxpool.Pool
}

func NewPostgresCacheRepository(
	db *pgxpool.Pool,
) *PostgresCacheRepository {

	return &PostgresCacheRepository{
		db: db,
	}
}

func (r *PostgresCacheRepository) FindByKey(
	ctx context.Context,
	cacheKey string,
) (*models.CacheEntry, error) {

	const query = `
	SELECT
		id,
		cache_key,
		subject,
		normalized_question,
		profile,
		prompt_version,
		response_json,
		hit_count,
		created_at,
		last_used
	FROM ai_generation_cache
	WHERE cache_key = $1
	`

	var entry models.CacheEntry

	err := r.db.QueryRow(
		ctx,
		query,
		cacheKey,
	).Scan(
		&entry.ID,
		&entry.CacheKey,
		&entry.Subject,
		&entry.NormalizedQuestion,
		&entry.Profile,
		&entry.PromptVersion,
		&entry.ResponseJSON,
		&entry.HitCount,
		&entry.CreatedAt,
		&entry.LastUsed,
	)

	if err != nil {

		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}

		return nil, err
	}

	return &entry, nil
}

func (r *PostgresCacheRepository) Save(
	ctx context.Context,
	entry *models.CacheEntry,
) error {

	const query = `
	INSERT INTO ai_generation_cache (
		id,
		cache_key,
		subject,
		normalized_question,
		profile,
		prompt_version,
		response_json,
		hit_count
	)
	VALUES (
		$1,$2,$3,$4,$5,$6,$7,$8
	)
	`

	_, err := r.db.Exec(
		ctx,
		query,
		entry.ID,
		entry.CacheKey,
		entry.Subject,
		entry.NormalizedQuestion,
		entry.Profile,
		entry.PromptVersion,
		entry.ResponseJSON,
		entry.HitCount,
	)

	return err
}

func (r *PostgresCacheRepository) IncrementHit(
	ctx context.Context,
	cacheKey string,
) error {

	const query = `
	UPDATE ai_generation_cache
	SET
		hit_count = hit_count + 1,
		last_used = NOW()
	WHERE cache_key = $1
	`

	_, err := r.db.Exec(
		ctx,
		query,
		cacheKey,
	)

	return err
}