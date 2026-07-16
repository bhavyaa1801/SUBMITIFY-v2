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
11. Source Code must be properly formatted and compilable.
12. Preserve all indentation and line breaks exactly as normal source code.
13. Do NOT compress source code into a single line.
14. Algorithm must be written as one numbered step per line.
15. Each numbered step must start on a new line.
16. Preserve whitespace and line breaks inside all generated content.
17. Output should appear exactly as printed on the terminal.
18. Output must contain only realistic sample program output.
19. Aim must be concise.
20. Ensure the JSON is directly parsable.

`, p.Question, schema, instructions)

	return prompt, nil
}