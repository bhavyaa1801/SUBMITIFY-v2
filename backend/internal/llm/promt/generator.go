package prompt

import (
	"fmt"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

type GeneratorPrompt struct {
	Question string
	Profile  models.ProfileDefinition
}

func BuildGeneratorPrompt(p GeneratorPrompt) (string, error) {

	schema, err := buildJSONSchema(p.Profile)
	if err != nil {
		return "", err
	}

	instructions := buildSectionInstructions(p.Profile)

	prompt := fmt.Sprintf(`You are an AI academic document generator.

Generate content for the following academic question.

Question:

%s

Return ONLY valid JSON.

The JSON object MUST exactly match the following schema:

%s

%s

General Rules:

1. Return ONLY valid JSON.
2. Do NOT wrap the response in markdown.
3. Do NOT use code fences.
4. Do NOT add explanations.
5. Do NOT add extra keys.
6. Preserve the exact key names.
7. Every key must exist.
8. If you cannot generate a section, leave its value empty.
9. Ensure all content is academically correct.
10. The response must be valid JSON that can be parsed directly.

`, p.Question, schema, instructions)

	return prompt, nil
}