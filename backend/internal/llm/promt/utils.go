package prompt

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/bhavyaa1801/submitify-v2/internal/models"
)

func buildJSONSchema(profile models.ProfileDefinition) (string, error) {

	schema := make(map[string]string)

	for _, section := range profile.Sections {
		schema[section.Title] = ""
	}

	data, err := json.MarshalIndent(schema, "", "    ")
	if err != nil {
		return "", err
	}

	return string(data), nil
}

func buildSectionInstructions(profile models.ProfileDefinition) string {

	var builder strings.Builder

	builder.WriteString("Section Instructions:\n\n")

	for _, section := range profile.Sections {

		builder.WriteString(fmt.Sprintf("- %s (%s): %s\n",
			section.Title,
			section.Type,
			getTypeInstruction(section.Type),
		))
	}

	return builder.String()
}

func getTypeInstruction(t models.SectionType) string {

	switch t {

	case models.Paragraph:
		return "Write clear academic paragraphs."

	case models.Code:
		return "Return only clean, compilable source code. Do not include explanations."

	case models.List:
		return "Return an ordered list of concise steps."

	case models.Table:
		return "Return data suitable for rendering as a table."

	case models.Equation:
		return "Return mathematical equations in LaTeX format."

	default:
		return "Return appropriate academic content."
	}
}