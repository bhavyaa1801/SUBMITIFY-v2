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

	var b strings.Builder

	b.WriteString("Section Instructions:\n\n")

	for _, section := range profile.Sections {

		b.WriteString(fmt.Sprintf(
			"- %s: %s\n",
			section.Title,
			getSectionInstruction(section.Title, section.Type),
		))
	}

	return b.String()
}

func getSectionInstruction(
	title string,
	t models.SectionType,
) string {

	switch title {

	case "Aim":
		return "State the objective of the experiment in one or two concise academic sentences."

	case "Algorithm":
		return "Write a numbered step-by-step algorithm. Do NOT explain the theory. Each step should begin with a number."

	case "Source Code":
		return "Return ONLY a complete, compilable C program. Do not include explanations, markdown, or code fences."

	case "Output":
		return "Provide realistic sample console output produced by running the program."

	case "Theory":
		return "Explain the underlying concept in clear academic paragraphs with proper technical terminology."

	case "Answer":
		return "Write a complete academic answer in paragraph form."

	case "Configuration":
		return "Return only the required configuration or command-line commands. Do not explain."

	case "SQL Query":
		return "Return only valid SQL queries. Do not include explanations."

	case "Solution":
		return "Provide the complete mathematical solution with all intermediate steps."

	case "Content":
		return "Write complete academic content appropriate for the question."

	default:
		return getTypeInstruction(t)
	}
}

func getTypeInstruction(t models.SectionType) string {

	switch t {

	case models.Paragraph:
		return "Write academically correct paragraphs."

	case models.Code:
		return "Return the source code as a valid JSON string. Escape every quotation mark (\") and every newline (\n) so the entire response remains valid JSON."

	case models.List:
		return "Return a numbered list."

	case models.Table:
		return "Return tabular data."

	case models.Equation:
		return "Return mathematical equations in LaTeX."

	default:
		return "Return appropriate academic content."
	}
}