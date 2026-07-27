package models

import "time"

type CacheEntry struct {
	ID                 string    `db:"id"`
	CacheKey           string    `db:"cache_key"`

	Subject            string    `db:"subject"`
	NormalizedQuestion string    `db:"normalized_question"`

	Profile        string    `db:"profile"`
	PromptVersion  string    `db:"prompt_version"`

	ResponseJSON []byte    `db:"response_json"`

	HitCount int       `db:"hit_count"`

	CreatedAt time.Time `db:"created_at"`
	LastUsed  time.Time `db:"last_used"`
}