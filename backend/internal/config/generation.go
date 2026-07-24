package config

import(
	"time"
)

const (
	MaxGenerationRetries = 2
	RetryDelay           = 500 * time.Millisecond
	WorkerCount          = 3
)