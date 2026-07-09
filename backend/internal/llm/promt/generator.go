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

	prompt := fmt.Sprintf(`You are an expert university professor.

Generate an academic document for the following question.

Question:
%s

Return ONLY valid JSON.

The JSON MUST exactly match this schema:

%s

%s

Rules:

1. Return ONLY JSON.
2. Do NOT use markdown.
3. Do NOT use code fences.
4. Do NOT add explanations.
5. Do NOT add extra keys.
6. Preserve key names exactly.
7. Every key MUST exist.
8. Every key MUST contain meaningful content.
9. Do NOT repeat the same content across multiple sections.
10. Generate content specifically for this question.
11. Source Code must contain only code.
12. Algorithm must contain only numbered steps.
13. Output must contain only realistic sample program output.
14. Aim must be concise.
15. Ensure the JSON is directly parsable.

`, p.Question, schema, instructions)

	return prompt, nil
}