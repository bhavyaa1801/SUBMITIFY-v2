package cache

import (
	"crypto/sha256"
	"encoding/hex"
)

const PromptVersion = "v2.0"

func BuildKey(
	subject string,
	question string,
	profile string,
) string {

	normalized := NormalizeQuestion(question)

	data := subject +
		"|" +
		profile +
		"|" +
		PromptVersion +
		"|" +
		normalized

	hash := sha256.Sum256([]byte(data))

	return hex.EncodeToString(hash[:])
}