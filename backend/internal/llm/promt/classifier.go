package prompt

import "fmt"

func BuildClassifierPrompt(question string) string {

	return fmt.Sprintf(`You are an academic document classifier.

Classify the following question into EXACTLY ONE of these profiles:

- programming
- theory
- sql
- networking
- mathematics
- generic

Rules:

1. Return ONLY one word.
2. Do NOT explain your answer.
3. Do NOT add punctuation.
4. Output must be lowercase.
5. Choose the closest matching profile.

Question:

%s
`, question)

}